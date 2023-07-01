import * as React from 'react'
import { HStack, Box, Flex, View, IconButton, Heading } from 'native-base'
import { audioPrimaryColor, primaryColor, secondaryColor } from '../../assets/ColorConst'
import { AudioThumbnailCard } from '../components/AudioThumbnailCard'
import { AudioControlsCard } from '../components/AudioControlsCard'
import { MaterialIcons } from '@expo/vector-icons'
import { AudioNavigationCard } from '../components/AudioNavigationCard'

export const AudioView = ({ route, navigation }) => {
  const { itemId, otherParam } = route.params
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
        <AudioControlsCard />
      </Flex>
      <AudioNavigationCard />
    </View>
  )
}
