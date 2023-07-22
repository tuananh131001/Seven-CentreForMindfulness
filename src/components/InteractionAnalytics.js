import { useState } from 'react'
import { VStack, HStack, Flex, Heading, Text } from 'native-base'

import { progressPrimaryColor, progressSecondaryColor } from '../../assets/ColorConst'

export const InteractionAnalytics = () => {
  return (
    <VStack space="10" width="100%">
      <HStack space="5" width="100%" justifyContent="space-between">
        <Flex
          bg={progressPrimaryColor}
          width="45%"
          direction="column"
          padding="5"
          borderRadius="20"
        >
          <Heading>7d</Heading>
          <Text color={progressSecondaryColor}>current streak</Text>
        </Flex>
        <Flex
          bg={progressPrimaryColor}
          width="45%"
          direction="column"
          padding="5"
          borderRadius="20"
        >
          <Heading>10d</Heading>
          <Text color={progressSecondaryColor}>longest streak</Text>
        </Flex>
      </HStack>
      <HStack space="5" width="100%" justifyContent="space-between">
        <Flex
          bg={progressPrimaryColor}
          width="45%"
          direction="column"
          padding="5"
          borderRadius="20"
        >
          <Heading>15</Heading>
          <Text color={progressSecondaryColor}>audios completed</Text>
        </Flex>
        <Flex
          bg={progressPrimaryColor}
          width="45%"
          direction="column"
          padding="5"
          borderRadius="20"
        >
          <Heading>5</Heading>
          <Text color={progressSecondaryColor}>activities completed</Text>
        </Flex>
      </HStack>
    </VStack>
  )
}
