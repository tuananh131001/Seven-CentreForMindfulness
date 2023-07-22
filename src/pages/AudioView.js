import { useState, useEffect, useRef } from 'react'
import {
  Flex,
  View,
  IconButton,
  useToast,
  VStack,
  HStack,
  Heading,
  Text,
  Slider,
  Image,
  Box,
} from 'native-base'
import { AppState } from 'react-native'
import { Audio } from 'expo-av'
import {
  audioAccentColor,
  audioPrimaryColor,
  primaryColor,
  secondaryColor,
} from '../../assets/ColorConst'
import { MaterialIcons } from '@expo/vector-icons'
import { AudioNavigationCard } from '../components/AudioNavigationCard'
import { AlertToast } from '../components/Toast'
import { collection, addDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'

export const AudioView = ({ route, navigation }) => {
  const { title, link } = route.params

  const [isPlayed, setIsPlayed] = useState(false)
  const [durationAudio, setDurationAudio] = useState(0)
  const [currentTimestamp, setCurrentTimestamp] = useState(0)
  const [sound, setSound] = useState()
  const [activeTime, setActiveTime] = useState(0)
  const [usageTimerRun, setUsageTimerRun] = useState(false)
  const toast = useToast()
  const appState = useRef(AppState.currentState)
  const soundObject = new Audio.Sound()

  async function playSound() {
    await Audio.setAudioModeAsync({ playsInSilentModeIOS: true })
    try {
      await soundObject.loadAsync({ uri: link })
      setSound(soundObject)
      soundObject.getStatusAsync().then((result) => {
        setDurationAudio(result.durationMillis)
      })
      await soundObject.playAsync()
    } catch (error) {
      AlertToast(toast, error)
    }
  }

  const toggleAudioStatus = () => {
    setIsPlayed(!isPlayed)
    isPlayed ? sound.unloadAsync() : playSound()
    isPlayed ? setUsageTimerRun(false) : setUsageTimerRun(true)
  }

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000)
    var seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
  }

  const handleBackButtonClick = () => {
    navigation.goBack()

    if (sound !== undefined) {
      sound.unloadAsync()
      setUsageTimerRun(false)
      const docRef = collection(FIREBASE_DB, 'usageTime')
      addDoc(docRef, { usageTime: activeTime })
    }
  }

  useEffect(() => {
    if (usageTimerRun === false) return

    let interval = setInterval(() => {
      setActiveTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [usageTimerRun])

  useEffect(() => {
    sound &&
      sound.getStatusAsync().then((result) => {
        setCurrentTimestamp(result.positionMillis)
      })
  }, [activeTime])

  useEffect(() => {
    const subscription = AppState.addEventListener('change', (nextAppState) => {
      if (appState.current.match(/active/) && nextAppState === 'background') {
        sound.unloadAsync()
        setUsageTimerRun(false)
      } else if (appState.current.match(/background/) && nextAppState === 'active') {
        playSound()
        setUsageTimerRun(true)
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
        <VStack>
          <Box borderRadius="full" borderColor={audioPrimaryColor} borderWidth="4">
            <Box borderRadius="full" bg={audioPrimaryColor} margin="3">
              <Image
                source={{
                  uri: 'https://blush.design/api/download?shareUri=8rihonJGqaYdyiU_&c=Hair_0%7E0f0f0f_Skin_0%7Ef6cbc3&w=800&h=800&fm=png',
                }}
                alt="Self-reflection"
                size="175"
                margin="5"
                resizeMode="contain"
              />
            </Box>
          </Box>
          <VStack margin="5" alignItems="center" space="2">
            <Heading fontWeight="medium">{title}</Heading>
            <Text fontWeight="thin">Inner Peace</Text>
          </VStack>
        </VStack>
        <VStack space="5" alignItems="center">
          <HStack space="5">
            <IconButton
              icon={<MaterialIcons name="fast-rewind" size={30} color={audioAccentColor} />}
              variant="ghost"
            />
            <IconButton
              icon={
                <MaterialIcons
                  name={isPlayed ? 'pause' : 'play-arrow'}
                  size={60}
                  onPress={toggleAudioStatus}
                  color={secondaryColor}
                />
              }
              variant="solid"
              backgroundColor={audioPrimaryColor}
              borderRadius="full"
            />
            <IconButton
              icon={<MaterialIcons name="fast-forward" size={30} color={audioAccentColor} />}
              variant="ghost"
            />
          </HStack>
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <Text>{millisToMinutesAndSeconds(currentTimestamp)}</Text>
            <View>
              <Slider
                width="250"
                size="md"
                minValue={0}
                value={currentTimestamp || 0}
                maxValue={durationAudio}
                defaultValue={0}
                marginX={2.5}
              >
                <Slider.Track bg={audioAccentColor}>
                  <Slider.FilledTrack bg={primaryColor} />
                </Slider.Track>
                <Slider.Thumb bg={primaryColor} />
              </Slider>
            </View>
            <Text>{millisToMinutesAndSeconds(durationAudio)}</Text>
          </Flex>
          <Text>{activeTime}</Text>
        </VStack>
      </Flex>
      <AudioNavigationCard />
    </View>
  )
}
