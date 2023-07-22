import { HStack, VStack, IconButton, View, Flex, Text, Slider } from 'native-base'
import {
  primaryColor,
  secondaryColor,
  audioPrimaryColor,
  audioAccentColor,
} from '../../assets/ColorConst'
import { MaterialIcons } from '@expo/vector-icons'

export const AudioControlsCard = ({
  sound,
  duration,
  playSound,
  currentTimestamp,
  isPlayed,
  setIsPlayed,
  activeTime,
  startUsageTimer,
  pauseUsageTimer,
}) => {
  const toggleAudioStatus = () => {
    setIsPlayed(!isPlayed)
    isPlayed ? sound.unloadAsync() : playSound()
    isPlayed ? pauseUsageTimer() : startUsageTimer()
  }
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000)
    var seconds = ((millis % 60000) / 1000).toFixed(0)
    return minutes + ':' + (seconds < 10 ? '0' : '') + seconds
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
            value={currentTimestamp}
            maxValue={duration}
            defaultValue={0}
            marginX={2.5}
          >
            <Slider.Track bg={audioAccentColor}>
              <Slider.FilledTrack bg={primaryColor} />
            </Slider.Track>
            <Slider.Thumb bg={primaryColor} />
          </Slider>
        </View>
        <Text>{millisToMinutesAndSeconds(duration)}</Text>
      </Flex>
      <Text>{activeTime}</Text>
    </VStack>
  )
}
