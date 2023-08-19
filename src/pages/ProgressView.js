import { useState, useEffect } from 'react'
import { Flex, Heading, ScrollView, Link, Text, HStack } from 'native-base'
import { collection, getDocs } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'

import { UsageTimeAnalytics } from '../components/UsageTimeAnalytics'
import { InteractionAnalytics } from '../components/InteractionAnalytics'
import { useTranslation } from 'react-i18next'
import { updateUserFields } from '../services/user'
import { boldTextColor } from '../../assets/ColorConst'
import { useContext } from 'react'
import { SignInContext } from '../hooks/useAuthContext'

import { secondsToHours, secondsToMinutes } from 'date-fns'

export const ProgressView = ({ navigation }) => {
  const { t } = useTranslation()
  const { signedIn, dispatchSignedIn } = useContext(SignInContext)

  const [timeData, setTimeData] = useState([])

  const handleRedoTest = async () => {
    await updateUserFields(signedIn.uid, { isCompletedTest: false })
    await dispatchSignedIn({ type: 'SET_COMPLETED_TEST' })
    navigation.navigate('AssessmentView')
  }

  useEffect(() => {
    const getData = async () => {
      let timeArray = []
      const docRef = collection(FIREBASE_DB, 'usageTime')

      const querySnapshot = await getDocs(docRef)
      querySnapshot.forEach((doc) => {
        timeArray.push(doc.data())
      })
      setTimeData(timeArray)
    }
    getData()
  }, [])

  function calculateTotalTimeSpent() {
    let totalTime = 0

    timeData.map((time) => {
      totalTime += parseInt(time.usageTime)
    })

    return totalTime
  }

  function convertToTimeFormat() {
    let hours = secondsToHours(calculateTotalTimeSpent())
    let minutes = secondsToMinutes(calculateTotalTimeSpent())
    let seconds = calculateTotalTimeSpent() % 60

    return hours + 'h ' + minutes + 'm ' + seconds + 's '
  }

  return (
    <ScrollView bg="white" minHeight="100%" pb="10">
      <Flex direction="row" width="100%" alignItems="center" mx="5" mt="16">
        <Heading py="5">{t('Analytics')}</Heading>
      </Flex>
      <Flex
        direction="column"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        px="5"
      >
        <UsageTimeAnalytics convertToTimeFormat={convertToTimeFormat} />
        <InteractionAnalytics />
        <HStack alignSelf={'flex-start'} mb={4} space={1}>
          <Text fontSize="md" fontWeight="300" color="coolGray.600">
            {t('FeelingBetter')}
          </Text>

          <Link isUnderlined={false} onPress={handleRedoTest}>
            <Text fontSize="md" fontWeight="700" color={boldTextColor}>
              {t('TakeTest')}
            </Text>
          </Link>
        </HStack>
      </Flex>
    </ScrollView>
  )
}
