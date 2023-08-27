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

const CACHE_EXPIRY_TIME = 60 * 60 * 1000 // 1 hour in milliseconds

export const HomeView = ({ navigation }) => {
  const { t } = useTranslation()
  const toast = useToast()
  const CATEGORIES = ['audios', 'guidedPractices', 'articles'] // TODO: audios is Videos , will change latter
  const [audioList, setAudioList] = useState([])
  const { signedIn } = useContext(SignInContext)
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[1])

  const getData = async () => {
    let audioListArr = []
    try {
      const category =
        i18n.language === 'vi' && selectedCategory === 'guidedPractices'
          ? 'guidedPracticeVn'
          : selectedCategory
      const cacheKey = `audioList_${category}`
      const cachedData = await AsyncStorage.getItem(cacheKey)

      if (cachedData) {
        const { data, timestamp } = JSON.parse(cachedData)

        if (Date.now() - timestamp < CACHE_EXPIRY_TIME) setAudioList(data)
      } else {
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
    } catch (error) {
      AlertToast(toast, error)
    }
  }

  const selectCategory = (category) => {
    setSelectedCategory(category)
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
      getData()

      return () => {
        setAudioList([]) // cleanup function
        setSelectedCategory(CATEGORIES[1])
      }
    }, []),
  )

  useEffect(() => {
    checkNotificationPermissions(toast)
    scheduleDailyNotification(toast, signedIn?.notificationHour, signedIn?.notificationMinute)
  }, [signedIn?.notificationHour, signedIn?.notificationMinute])

  useEffect(() => {
    getData()
  }, [selectedCategory])

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
                onPress={() => selectCategory(category)}
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
