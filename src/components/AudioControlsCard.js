import * as React from 'react'
import { HStack, VStack, IconButton, View, Flex, Text } from 'native-base'
import {
  primaryColor,
  secondaryColor,
  audioPrimaryColor,
  audioAccentColor,
} from '../../assets/ColorConst'
import { MaterialIcons } from '@expo/vector-icons'
import Slider from '@react-native-community/slider'

export const AudioControlsCard = () => {
  const [isPaused, setIsPaused] = React.useState(false)

  const toggleAudioStatus = () => {
    setIsPaused(!isPaused)
  }

  return (
    <VStack space="5" alignItems="center">
      <HStack space="5">
        <IconButton
          icon={<MaterialIcons name="fast-rewind" size={30} color={audioAccentColor} />}
          variant="ghost"
        />
        <IconButton
          icon={
            <MaterialIcons
              name={isPaused ? 'play-arrow' : 'pause'}
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
        <Text>0:00</Text>
        <View>
          <Slider
            style={{ width: 250, marginHorizontal: 10 }}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor={primaryColor}
            minimumTrackTintColor={primaryColor}
            maximumTrackTintColor={audioAccentColor}
          />
        </View>
        <Text>20:00</Text>
      </Flex>
    </VStack>
  )
}
