import * as React from 'react'
import { Flex, View, IconButton, useToast } from 'native-base'
import { Audio } from 'expo-av'
import { FIREBASE_APP } from '../../firebaseConfig'
import { primaryColor, secondaryColor } from '../../assets/ColorConst'
import { AudioThumbnailCard } from '../components/AudioThumbnailCard'
import { AudioControlsCard } from '../components/AudioControlsCard'
import { MaterialIcons } from '@expo/vector-icons'
import { AudioNavigationCard } from '../components/AudioNavigationCard'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'
import { AlertToast } from '../components/Toast'

export const AudioView = ({ route, navigation }) => {
  const [isPaused, setIsPaused] = React.useState(false)
  const { fileName } = route.params
  const [sound, setSound] = React.useState()
  const toast = useToast()

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

  return (
    <View bg={primaryColor} height="100%">
      <Flex direction="row" width="100%" mt="60" alignItems={'center'}>
        <IconButton
          icon={<MaterialIcons name="arrow-back" size={40} color="black" />}
          variant="ghost"
          pl="2"
          onPress={() => navigation.goBack()}
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
        <AudioThumbnailCard />
        <AudioControlsCard
          sound={sound}
          isPaused={isPaused}
          setIsPaused={setIsPaused}
          playSound={playSound}
        />
      </Flex>
      <AudioNavigationCard />
    </View>
  )
}
