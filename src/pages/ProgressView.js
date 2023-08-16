import { useState, useEffect } from 'react'
import { Flex, Heading, ScrollView } from 'native-base'
import { collection, getDocs } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'

import { UsageTimeAnalytics } from '../components/UsageTimeAnalytics'
import { InteractionAnalytics } from '../components/InteractionAnalytics'
import { useTranslation } from 'react-i18next'

import { secondsToHours, secondsToMinutes } from 'date-fns'

export const ProgressView = () => {
  const { t } = useTranslation()
  const [timeData, setTimeData] = useState([])

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
      </Flex>
    </ScrollView>
  )
}
