import { Flex, Heading, ScrollView, Link, Text, VStack, HStack } from 'native-base'

import { SeverityAnalytics } from '../components/SeverityAnalytics'
import { InteractionAnalytics } from '../components/InteractionAnalytics'
import { useTranslation } from 'react-i18next'
import { updateUserFields } from '../services/user'
import { boldTextColor } from '../../assets/ColorConst'
import { useState, useContext, useCallback } from 'react'
import { SignInContext } from '../hooks/useAuthContext'

import { FIREBASE_DB } from '../../firebaseConfig'
import { collection, query, where, getDocs } from 'firebase/firestore'

import { useFocusEffect } from '@react-navigation/native'
import { HomeViewLoading } from '../components/HomeViewLoading'

export const ProgressView = ({ navigation }) => {
  const { t } = useTranslation()
  const { signedIn, dispatchSignedIn } = useContext(SignInContext)
  const [completedAudios, setCompletedAudios] = useState(0)
  const [completedVideos, setCompletedVideos] = useState(0)
  const [completedArticles, setCompletedArticles] = useState(0)
  const [finalScore, setFinalScore] = useState(0)
  const [isLoading, setLoading] = useState(false)

  const handleRedoTest = async () => {
    await updateUserFields(signedIn.uid, { isCompletedTest: false })
    await dispatchSignedIn({ type: 'SET_COMPLETED_TEST' })
    navigation.navigate('AssessmentView')
  }

  const getUserAttempts = async () => {
    let audiosScore = 0,
      videosScore = 0,
      articlesScore = 0

    const collectionRef = collection(FIREBASE_DB, 'userAttempts')

    const q = query(
      collectionRef,
      where('uid', '==', signedIn.uid),
      where('isCompleted', '==', true),
    )

    const docsSnap = await getDocs(q)

    docsSnap.forEach((doc) => {
      let attempt = doc.data().type
      if (attempt === 'guidedPractices' || attempt === 'guidedPracticeVn') {
        audiosScore += 1
      } else if (attempt === 'audios') {
        videosScore += 1
      } else {
        articlesScore += 1
      }
    })

    // Calculate score after user attempts by minus 0.25 for each attempt
    let attemptsScore = audiosScore + videosScore + articlesScore
    console.log('attemptsScore', attemptsScore)
    let score = Math.round(signedIn.assessmentScore - attemptsScore * 0.25)
    score > 0 ? setFinalScore(score) : setFinalScore(0)

    setCompletedAudios(audiosScore)
    setCompletedVideos(videosScore)
    setCompletedArticles(articlesScore)
  }

  useFocusEffect(
    useCallback(() => {
      const calculatePoints = async () => {
        setLoading(true)
        await getUserAttempts()
        setLoading(false)
      }

      calculatePoints()
      return () => {
        setCompletedAudios(0)
        setCompletedVideos(0)
        setCompletedArticles(0)
        setFinalScore(0)
      }
    }, []),
  )

  if (isLoading) {
    return <HomeViewLoading handleBackButtonClick={() => navigation.goBack()} />
  }

  return (
    <ScrollView bg="white" minHeight="100%" pb="10">
      <Flex direction="row" width="100%" alignItems="center" mx="5" mt="16">
        <Heading py="5">{t('Analytics')}</Heading>
      </Flex>
      <VStack space="5" width="100%" alignItems="center" px="5">
        <SeverityAnalytics assessmentScore={finalScore} />
        <InteractionAnalytics
          currentStreak={signedIn.currentStreak}
          longestStreak={signedIn.longestStreak}
          completedAudios={completedAudios}
          completedVideos={completedVideos}
          completedArticles={completedArticles}
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
