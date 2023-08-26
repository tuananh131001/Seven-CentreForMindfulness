import { HorizontalCard } from '../components/HorizontalCard'
import { Button, HStack, Heading, Text, ScrollView, VStack, useToast } from 'native-base'
import { primaryColor, secondaryColor } from '../../assets/ColorConst'
import { Pressable } from 'react-native'
import { collection, doc, getDocs, setDoc } from 'firebase/firestore'
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

export const HomeView = ({ navigation }) => {
  const { t } = useTranslation()
  const toast = useToast()
  const CATEGORIES = ['audios', 'guidedPractices', 'articles'] // TODO: audios is Videos , will change latter
  const [audioList, setAudioList] = useState([])
  const { signedIn } = useContext(SignInContext)
  const [selectedCategory, setSelectedCategory] = useState(CATEGORIES[1])
  const getData = async () => {
    let audioListArr = []
    const category =
      i18n.language === 'vi' && selectedCategory == 'guidedPractices'
        ? 'guidedPracticeVn'
        : selectedCategory

    const querySnapshot = await getDocs(collection(FIREBASE_DB, category))
    querySnapshot.forEach((doc) => {
      audioListArr.push({ id: doc.id, data: doc.data() })
    })
    setAudioList(audioListArr)
  }
  const selectCategory = (category) => {
    setSelectedCategory(category)
  }

  const handlePressCard = async (audio) => {
    if (selectedCategory === 'guidedPractices') {
      navigation.navigate('AudioView', {
        id: audio.id,
        link: audio.data.link,
        title: audio.data.title,
        duration: audio.data.duration,
      })
    } else {
      handleOpenURL(audio.data.link)
    }
    await findAudioOrCreate(audio.id)
  }

  const findAudioOrCreate = async (exerciseId) => {
    await setDoc(doc(FIREBASE_DB, 'userAttempts', exerciseId), {
      uid: signedIn.uid,
      exerciseId: exerciseId,
      isCompleted: false,
      type: selectedCategory,
    })
  }

  const handleOpenURL = (url) => {
    try {
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
          <Heading>👋 Hi, {signedIn?.name}</Heading>
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
