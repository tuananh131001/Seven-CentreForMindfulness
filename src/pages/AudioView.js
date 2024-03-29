import { useState, useEffect, useRef, useCallback } from 'react'
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
import { useFocusEffect } from '@react-navigation/native'
import { audioViewImages } from '../../assets/ImageConst'

const THUMBNAIL = audioViewImages[(audioViewImages.length * Math.random()) | 0]

export const AudioView = ({ route, navigation }) => {
  const { id, title, link } = route.params
  const [isPlayed, setIsPlayed] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [durationAudio, setDurationAudio] = useState(0)
  const [currentTimestamp, setCurrentTimestamp] = useState(0)
  const toast = useToast()
  const sound = useRef(new Audio.Sound())

  useFocusEffect(
    useCallback(() => {
      const startPlayAudio = async () => {
        await getAudio()
        toggleAudioStatus()
      }

      startPlayAudio()

      return () => {
        sound.current.unloadAsync()
        setIsPlayed(false)
      }
    }, []),
  )

  useEffect(
    () =>
      navigation.addListener('beforeRemove', () => {
        if (durationAudio > 0 && currentTimestamp >= durationAudio - 60000) {
          saveUserAttempt(currentTimestamp, durationAudio)
        }
        sound.current.unloadAsync()
      }),
    [navigation, currentTimestamp],
  )

  const saveUserAttempt = async (currentTimestamp, durationAudio) => {
    console.log('c', currentTimestamp, 'd', durationAudio - 60000)

    const docRef = doc(FIREBASE_DB, 'userAttempts', id)
    await updateDoc(docRef, { isCompleted: true })
    AlertToast(toast, 'You have completed this exercise!', 'success')
    console.log('completed')
  }

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
          sound.current.playFromPositionAsync(currentTimestamp)
        }
      }
    } catch (error) {
      AlertToast(toast, error)
    }
  }

  const playFromPostition = async (position) => {
    if (isPlayed === false) return
    try {
      setCurrentTimestamp(position)
      await sound.current.setPositionAsync(position)
      await sound.current.playAsync()
    } catch (error) {
      AlertToast(toast, error)
    }
  }

  const toggleAudioStatus = () => {
    setIsPlayed(!isPlayed)
    isPlayed ? sound.current.pauseAsync() : playSound()
  }

  useEffect(() => {
    if (isPlayed === false) return

    const updateStatus = async () => {
      const status = await sound.current.getStatusAsync()
      setCurrentTimestamp(status.positionMillis)
    }

    const interval = setInterval(updateStatus, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [isPlayed])

  if (isLoading) {
    return (
      <HomeViewLoading
        handleBackButtonClick={async () => {
          navigation.goBack()
        }}
      />
    )
  }

  return (
    <View bg={primaryColor} height="100%">
      <Flex direction="row" width="100%" alignItems="center" mt="10">
        <IconButton
          icon={<MaterialIcons name="arrow-back" size={40} color="white" />}
          variant="ghost"
          onPress={() => navigation.goBack()}
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
                source={THUMBNAIL}
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
              onPress={() => playFromPostition(currentTimestamp - 10000)}
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
              onPress={() => playFromPostition(currentTimestamp + 10000)}
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
                value={currentTimestamp}
                onChange={(value) => setCurrentTimestamp(value)}
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
