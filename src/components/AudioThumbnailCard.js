import * as React from 'react'
import { VStack, Box, Image, Heading, Text } from 'native-base'
import { audioPrimaryColor } from '../../assets/ColorConst'

export const AudioThumbnailCard = () => {
  return (
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
        <Heading fontWeight="medium">Zen Meditation</Heading>
        <Text fontWeight="thin">Inner Peace</Text>
      </VStack>
    </VStack>
  )
}
