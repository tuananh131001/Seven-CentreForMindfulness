import * as React from 'react'
import { Flex, IconButton } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons'
import { audioPrimaryColor, audioAccentColor } from '../../assets/ColorConst'

export const AudioNavigationCard = () => {
  const [isFavorite, setIsFavorite] = React.useState(false)
  const [isShuffle, setIsShuffle] = React.useState(false)

  const toggleFavoriteStatus = () => {
    setIsFavorite(!isFavorite)
  }

  const toggleShuffleStatus = () => {
    setIsShuffle(!isShuffle)
  }

  return (
    <Flex
      direction="row"
      borderTopRadius="20"
      position="absolute"
      zIndex="10"
      bottom="0"
      alignItems="center"
      justifyContent="space-between"
      bg={audioPrimaryColor}
      height="15%"
      width="100%"
      px="5"
    >
      <IconButton
        icon={
          <MaterialIcons
            name={isFavorite ? 'favorite' : 'favorite-border'}
            size={40}
            color={audioAccentColor}
          />
        }
        variant="ghost"
        onPress={toggleFavoriteStatus}
      />
      <IconButton
        icon={<MaterialIcons name="playlist-play" size={40} color={audioAccentColor} />}
        variant="ghost"
      />
      <IconButton
        icon={
          <MaterialIcons
            name={isShuffle ? 'shuffle-on' : 'shuffle'}
            size={40}
            color={audioAccentColor}
          />
        }
        variant="ghost"
        onPress={toggleShuffleStatus}
      />
    </Flex>
  )
}
