import { Flex, Heading, ScrollView, Link, Text, VStack, HStack } from 'native-base'

import { UsageTimeAnalytics } from '../components/UsageTimeAnalytics'
import { InteractionAnalytics } from '../components/InteractionAnalytics'
import { useTranslation } from 'react-i18next'
import { updateUserFields } from '../services/user'
import { boldTextColor } from '../../assets/ColorConst'
import { useState, useContext, useCallback } from 'react'
import { SignInContext } from '../hooks/useAuthContext'

import { FIREBASE_DB } from '../../firebaseConfig'
import { collection, query, where, getDocs } from 'firebase/firestore'

import { useFocusEffect } from '@react-navigation/native'

export const ProgressView = ({ navigation }) => {
  const { t } = useTranslation()
  const { signedIn, dispatchSignedIn } = useContext(SignInContext)
  const [completedAudios, setCompletedAudios] = useState([])
  const [completedVideos, setCompletedVideos] = useState([])
  const [completedArticles, setCompletedArticles] = useState([])

  const handleRedoTest = async () => {
    await updateUserFields(signedIn.uid, { isCompletedTest: false })
    await dispatchSignedIn({ type: 'SET_COMPLETED_TEST' })
    navigation.navigate('AssessmentView')
  }

  const getUserAttempts = async () => {
    let attemptsArray = []
    let audiosType = []
    let videosType = []
    let articlesType = []

    const collectionRef = collection(FIREBASE_DB, 'userAttempts')

    const q = query(
      collectionRef,
      where('uid', '==', signedIn.uid),
      where('isCompleted', '==', true),
    )

    const docsSnap = await getDocs(q)

    docsSnap.forEach((doc) => {
      attemptsArray.push(doc.data().type)
    })

    attemptsArray.forEach((attempt) => {
      if (attempt === 'guidedPractices' || attempt === 'guidedPracticeVn') {
        audiosType.push(attempt)
      } else if (attempt === 'audios') {
        videosType.push(attempt)
      } else {
        articlesType.push(attempt)
      }
    })
    setCompletedAudios(audiosType)
    setCompletedVideos(videosType)
    setCompletedArticles(articlesType)
  }

  useFocusEffect(
    useCallback(() => {
      getUserAttempts()

      return () => {
        setAttempts([])
      }
    }, []),
  )

  return (
    <ScrollView bg="white" minHeight="100%" pb="10">
      <Flex direction="row" width="100%" alignItems="center" mx="5" mt="16">
        <Heading py="5">{t('Analytics')}</Heading>
      </Flex>
      <VStack space="5" width="100%" alignItems="center" px="5">
        <UsageTimeAnalytics assessmentScore={signedIn.assessmentScore} />
        <InteractionAnalytics
          currentStreak={signedIn.currentStreak}
          longestStreak={signedIn.longestStreak}
          completedAudios={completedAudios.length}
          completedVideos={completedVideos.length}
          completedArticles={completedArticles.length}
        />
        <HStack width="100%" mb="5" space="1" justifyContent="center">
          <Text fontSize="md" fontWeight="300" color="coolGray.600">
            {t('FeelingBetter')}
          </Text>

          <Link isUnderlined="false" onPress={handleRedoTest}>
            <Text fontSize="md" fontWeight="700" color={boldTextColor}>
              {t('TakeTest')}
            </Text>
          </Link>
        </HStack>
      </VStack>
    </ScrollView>
  )
}
