import { HorizontalCard } from '../components/HorizontalCard'
import { Button, HStack, Heading, Text, ScrollView, VStack, useToast } from 'native-base'
import { primaryColor, secondaryColor } from '../../assets/ColorConst'
import { Pressable } from 'react-native'
import { collection, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'
import { useEffect, useState, useContext, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { SignInContext } from '../hooks/useAuthContext'
import { AlertToast } from '../components/Toast'
import * as Linking from 'expo-linking'
import i18n from '../utils/i18n'
import { useFocusEffect } from '@react-navigation/native'
import { checkNotificationPermissions } from '../utils/checkNotificationPermissions'
import { scheduleDailyNotification } from '../services/notification'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { HomeViewLoading } from '../components/HomeViewLoading'

const CACHE_EXPIRY_TIME = 60 * 60 * 1000 // 1 hour in milliseconds
const CATEGORIES = ['audios', 'guidedPractices', 'articles'] // TODO: audios is Videos , will change latter
const DEFAULT_SELECTED_CATEGORY = CATEGORIES[1]

export const HomeView = ({ navigation }) => {
  const { t } = useTranslation()
  const toast = useToast()
  const [audioList, setAudioList] = useState([])
  const { signedIn } = useContext(SignInContext)
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_SELECTED_CATEGORY)
  const [isloading, setLoading] = useState(true)

  const getFirestoreTableKey = (selectedCategory) => {
    if (i18n.language === 'vi') {
      if (selectedCategory === 'guidedPractices') {
        return 'guidedPracticeVn'
      } else if (selectedCategory === 'audios') {
        return 'videoVn'
      } else {
        return 'articlesVn'
      }
    } else {
      return selectedCategory
    }
  }

  const getHomeViewData = async (choosenCategory) => {
    let audioListArr = []
    const category = getFirestoreTableKey(choosenCategory)
    const cacheKey = `audioList_${category}`
    const cachedData = await AsyncStorage.getItem(cacheKey)

    try {
      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData)

        console.log('Get data from cache', cacheKey)
        Date.now() - timestamp < CACHE_EXPIRY_TIME
          ? setAudioList(data)
          : await getDataFromFirebase(category, audioListArr, cacheKey)
      } else if (!audioList) {
        await getDataFromFirebase(category, audioListArr, cacheKey)
      }
    } catch (error) {
      AlertToast(toast, error)
    }
  }

  const getDataFromFirebase = async (category, audioListArr, cacheKey) => {
    console.log('Get data from Firebase')

    const querySnapshot = await getDocs(collection(FIREBASE_DB, category))

    querySnapshot.forEach((doc) => {
      audioListArr.push({ id: doc.id, data: doc.data() })
    })

    setAudioList(audioListArr)

    await AsyncStorage.setItem(
      cacheKey,
      JSON.stringify({ data: audioListArr, timestamp: Date.now() }),
    )
  }

  const handlePressCard = async (audio) => {
    await findAudioOrCreate(audio.id)
    if (selectedCategory === 'guidedPractices') {
      navigation.navigate('AudioView', {
        id: audio.id,
        link: audio.data.link,
        title: audio.data.title,
        duration: audio.data.duration,
      })
    } else {
      handleOpenURL(audio.data.link, audio.id)
    }
  }

  const findAudioOrCreate = async (exerciseId) => {
    await setDoc(doc(FIREBASE_DB, 'userAttempts', exerciseId), {
      uid: signedIn.uid,
      exerciseId: exerciseId,
      isCompleted: false,
      type: selectedCategory,
    })
  }

  const handleOpenURL = async (url, attemptId) => {
    try {
      const docRef = doc(FIREBASE_DB, 'userAttempts', attemptId)
      await updateDoc(docRef, { isCompleted: true })
      console.log('Attempt', attemptId, ' is completed')
      Linking.openURL(url)
    } catch (error) {
      AlertToast(toast, error)
    }
  }

  useFocusEffect(
    useCallback(() => {
      setSelectedCategory(DEFAULT_SELECTED_CATEGORY)
      getHomeViewData(selectedCategory)
      setLoading(false)
      return () => {
        setAudioList([]) // cleanup function
      }
    }, []),
  )

  useEffect(() => {
    checkNotificationPermissions(toast)
    scheduleDailyNotification(toast, signedIn?.notificationHour, signedIn?.notificationMinute)
  }, [signedIn?.notificationHour, signedIn?.notificationMinute])

  if (isloading) {
    return <HomeViewLoading></HomeViewLoading>
  }

  return (
    <ScrollView minHeight="100%" px="5">
      <VStack space="10">
        <HStack width="100%" alignItems="center" justifyContent="space-between" mt="16">
          <Heading>
            {t('username')} {signedIn?.name}
          </Heading>
        </HStack>

        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <HStack space="2">
            {CATEGORIES.map((category) => (
              <Button
                key={category}
                bg={category == selectedCategory ? primaryColor : secondaryColor}
                onPress={async () => {
                  setSelectedCategory(category)
                  await getHomeViewData(category)
                }}
                px="5"
                borderRadius="15"
              >
                <Text color={category == selectedCategory ? 'white' : primaryColor} bold>
                  {t(category)}
                </Text>
              </Button>
            ))}
          </HStack>
        </ScrollView>
        <VStack space="5" mb="5">
          {audioList.map((audio) => (
            <Pressable
              key={audio.id}
              onPress={() => {
                handlePressCard(audio)
              }}
            >
              <HorizontalCard
                title={audio.data.title}
                thumbnail={audio.data.thumbnail}
                duration={audio.data.duration}
              />
            </Pressable>
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  )
}
