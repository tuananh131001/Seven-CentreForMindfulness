import { useState, useEffect } from 'react'
import { View, Flex, Heading } from 'native-base'
import { collection, getDocs } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'

import { UsageTimeAnalytics } from '../components/UsageTimeAnalytics'
import { InteractionAnalytics } from '../components/InteractionAnalytics'

export const ProgressView = () => {
  const [timeData, setTimeData] = useState([])
  var totalTimeSpent = calculateTotalTimeSpent()
  var formattedTime = convertToTimeFormat()

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
    var totalTime = 0

    timeData.map((time) => {
      totalTime += parseInt(time.usageTime)
    })

    return totalTime
  }

  function convertToTimeFormat() {
    var totalMinutes = Math.floor(totalTimeSpent / 60)

    var hours = Math.floor(totalMinutes / 60)
    var minutes = totalMinutes % 60
    var seconds = totalTimeSpent % 60

    return hours + 'h ' + minutes + 'm ' + seconds + 's '
  }

  return (
    <View bg="white" height="100%">
      <Flex direction="row" width="100%" alignItems="center" mx="5" safeArea>
        <Heading>Your Analytics</Heading>
      </Flex>
      <Flex
        direction="column"
        width="100%"
        alignItems="center"
        justifyContent="space-between"
        px="5"
      >
        <UsageTimeAnalytics formattedTime={formattedTime} />
        <InteractionAnalytics />
      </Flex>
    </View>
  )
}
