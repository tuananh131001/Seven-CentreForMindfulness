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
import { Audio } from 'expo-av'
import {
  audioAccentColor,
  audioPrimaryColor,
  primaryColor,
  secondaryColor,
} from '../../assets/ColorConst'
import { MaterialIcons } from '@expo/vector-icons'
import { AlertToast } from '../components/Toast'
import { doc, updateDoc } from 'firebase/firestore'
import { FIREBASE_DB } from '../../firebaseConfig'
import { millisToMinutesAndSeconds } from '../utils/helpers'
import { HomeViewLoading } from '../components/HomeViewLoading'

export const AudioView = ({ route, navigation }) => {
  const { id, title, link } = route.params
  const [isPlayed, setIsPlayed] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [durationAudio, setDurationAudio] = useState(0)
  const [currentAudioTimestamp, setAudioTimestamp] = useState(0)
  const [, setActiveTime] = useState(0)
  const [attemptId, setAttemptId] = useState(null)
  const [usageTimerRun, setUsageTimerRun] = useState(false)
  const toast = useToast()
  const sound = useRef(new Audio.Sound())

  useEffect(() => {
    const startPlayAudio = async () => {
      await getAudio()
      toggleAudioStatus()
    }
    startPlayAudio()
  }, [])

  const getAudio = async () => {
    setLoading(true)
    const checkLoading = await sound.current.getStatusAsync()
    if (checkLoading.isLoaded === false) {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true })

      try {
        await sound.current.loadAsync({ uri: link })
      } catch (error) {
        AlertToast(toast, error)
      }
      let updated_status = await sound.current.getStatusAsync()
      setDurationAudio(updated_status.durationMillis)
      setAttemptId(id)
      setLoading(false)
    } else {
      setLoading(false)
    }
  }

  const playSound = async () => {
    try {
      const result = await sound.current.getStatusAsync()
      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playFromPositionAsync(currentAudioTimestamp)
        }
      }
    } catch (error) {
      AlertToast(toast, error)
    }
  }

  const playFromPostition = async (position) => {
    if (isPlayed === false) return
    try {
      await sound.current.setPositionAsync(position)
      await sound.current.playAsync()
      setAudioTimestamp(position)
    } catch (error) {
      AlertToast(toast, error)
    }
  }

  const toggleAudioStatus = () => {
    setIsPlayed(!isPlayed)
    isPlayed ? sound.current.pauseAsync() : playSound()
    isPlayed ? setUsageTimerRun(false) : setUsageTimerRun(true)
  }

  const handleBackButtonClick = async () => {
    navigation.goBack()

    if (sound !== undefined) {
      sound.current.unloadAsync()
      setUsageTimerRun(false)

      // 60000 = 1 minute
      if (currentAudioTimestamp > durationAudio - 60000) {
        const docRef = doc(FIREBASE_DB, 'userAttempts', attemptId)
        await updateDoc(docRef, { isCompleted: true })
        console.log('Attempt', attemptId, ' is completed')
      }
    }
  }

  useEffect(() => {
    if (usageTimerRun === false) return

    let interval = setInterval(async () => {
      const result = await sound.current.getStatusAsync()
      setAudioTimestamp(result.positionMillis)
      setActiveTime((prev) => prev + 1)
    }, 1000)

    return () => clearInterval(interval)
  }, [usageTimerRun])

  if (isLoading) {
    return <HomeViewLoading handleBackButtonClick={() => navigation.goBack()} />
  }

  return (
    <View bg={primaryColor} height="100%">
      <Flex direction="row" width="100%" alignItems="center" mt="10">
        <IconButton
          icon={<MaterialIcons name="arrow-back" size={40} color="white" />}
          variant="ghost"
          onPress={handleBackButtonClick}
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
        pt="5"
      >
        <Flex direction="column" alignItems="center">
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
            <Heading fontWeight="medium" textAlign="center">
              {title}
            </Heading>
            <Text fontWeight="thin">Inner Peace</Text>
          </VStack>
        </Flex>
        <VStack space="5" alignItems="center">
          <HStack space="5">
            <IconButton
              icon={<MaterialIcons name="fast-rewind" size={30} color={audioAccentColor} />}
              variant="ghost"
              onPress={() => playFromPostition(currentAudioTimestamp - 10000)}
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
              onPress={() => playFromPostition(currentAudioTimestamp + 10000)}
              variant="ghost"
            />
          </HStack>
          <Flex direction="row" justifyContent="space-between" alignItems="center">
            <Text>{millisToMinutesAndSeconds(currentAudioTimestamp)}</Text>
            <View>
              <Slider
                width="250"
                size="md"
                minValue={0}
                value={currentAudioTimestamp}
                onChange={(value) => setAudioTimestamp(value)}
                onChangeEnd={(value) => playFromPostition(value)}
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
        </VStack>
      </Flex>
    </View>
  )
}
