import { useState, useEffect, useRef } from 'react'
import { Flex, View, IconButton, useToast } from 'native-base'
import { AppState } from 'react-native'
import { Audio } from 'expo-av'
import { FIREBASE_APP } from '../../firebaseConfig'
import { primaryColor, secondaryColor } from '../../assets/ColorConst'
import { AudioThumbnailCard } from '../components/AudioThumbnailCard'
import { AudioControlsCard } from '../components/AudioControlsCard'
import { MaterialIcons } from '@expo/vector-icons'
import { AudioNavigationCard } from '../components/AudioNavigationCard'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { AlertToast } from '../components/Toast'
import { collection, addDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'

export const AudioView = ({ route, navigation }) => {
  const [isPlayed, setIsPlayed] = useState(false)
  const { fileName, title, duration } = route.params
  const [sound, setSound] = useState()
  const toast = useToast()
  const [activeTime, setActiveTime] = useState(0)
  const [usageTimerRun, setUsageTimerRun] = useState(false)

  const appState = useRef(AppState.currentState)

  async function playSound() {
    const storage = getStorage(FIREBASE_APP)
    const url = await getDownloadURL(ref(storage, fileName))
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
    const soundObject = new Audio.Sound()
    try {
      await soundObject.loadAsync({ uri: url })
      setSound(soundObject)
      await soundObject.playAsync()
    } catch (error) {
      AlertToast(toast, error)
    }
  }

  const startUsageTimer = () => {
    setUsageTimerRun(true)
  }

  const pauseUsageTimer = () => {
    setUsageTimerRun(false)
  }

  const handleBackButtonClick = () => {
    navigation.goBack()

    if (sound !== undefined) {
      sound.unloadAsync()
      pauseUsageTimer()
      addUsageTimeData()
    }
  }

  const addUsageTimeData = async () => {
    const docRef = collection(FIREBASE_DB, 'usageTime')

    await addDoc(docRef, { usageTime: activeTime })
  }

  useEffect(() => {
    var interval

    if (usageTimerRun === true) {
      interval = setInterval(() => {
        setActiveTime((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [usageTimerRun])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/active/) && nextAppState === 'background') {
        sound.unloadAsync()
        pauseUsageTimer()
      } else if (appState.current.match(/background/) && nextAppState === 'active') {
        playSound()
        startUsageTimer()
      }
      appState.current = nextAppState
    })

    return () => {
      subscription.remove()
    }
  }, [sound])

  return (
    <View bg={primaryColor} height="100%">
      <Flex direction="row" width="100%" safeArea alignItems="center">
        <IconButton
          icon={<MaterialIcons name="arrow-back" size={40} color="black" />}
          variant="ghost"
          pl="2"
          onPress={handleBackButtonClick}
        />
        <IconButton
          icon={<MaterialIcons name="save-alt" size={40} color="black" />}
          variant="ghost"
          ml="auto"
        />
      </Flex>

      <Flex
        direction="column"
        borderTopRadius="20"
        zIndex="10"
        bg={secondaryColor}
        height="85%"
        alignItems="center"
        mt="auto"
        pt="10"
      >
        <AudioThumbnailCard title={JSON.stringify(title).replaceAll('"', '')} />
        <AudioControlsCard
          sound={sound}
          duration={JSON.stringify(duration).replaceAll('"', '')}
          isPlayed={isPlayed}
          setIsPlayed={setIsPlayed}
          playSound={playSound}
          activeTime={activeTime}
          startUsageTimer={startUsageTimer}
          pauseUsageTimer={pauseUsageTimer}
        />
      </Flex>
      <AudioNavigationCard />
    </View>
  )
}
