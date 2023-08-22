import { VStack, HStack, Flex, Heading, Text } from 'native-base'

import { progressPrimaryColor, progressSecondaryColor } from '../../assets/ColorConst'
import { useTranslation } from 'react-i18next'

import { FontAwesome, Feather, MaterialIcons, Octicons, Entypo } from '@expo/vector-icons'

export const InteractionAnalytics = ({ currentStreak, longestStreak }) => {
  const { t } = useTranslation()
  return (
    <VStack space="10" width="100%" my="5">
      <HStack space="5" width="100%" justifyContent="space-between">
        <Flex
          bg={progressPrimaryColor}
          width="45%"
          direction="column"
          padding="5"
          borderRadius="20"
        >
          <HStack width="100%" space="2.5" alignItems="center" mb="5">
            <Feather name="target" size={30} color="red" />
            <Heading size="xl">{currentStreak}d</Heading>
          </HStack>
          <Text color={progressSecondaryColor}>{t('CurrentStreak')}</Text>
        </Flex>
        <Flex
          bg={progressPrimaryColor}
          width="45%"
          direction="column"
          padding="5"
          borderRadius="20"
        >
          <HStack width="100%" space="2.5" alignItems="center" mb="5">
            <FontAwesome name="star" size={30} color="gold" />
            <Heading size="xl">{longestStreak}d</Heading>
          </HStack>
          <Text color={progressSecondaryColor}>{t('LongestStreak')}</Text>
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
          <HStack width="100%" space="2.5" alignItems="center" mb="5">
            <MaterialIcons name="multitrack-audio" size={30} color="blue" />
            <Heading size="xl">10</Heading>
          </HStack>
          <Text color={progressSecondaryColor}>{t('AudioCompleted')}</Text>
        </Flex>
        <Flex
          bg={progressPrimaryColor}
          width="45%"
          direction="column"
          padding="5"
          borderRadius="20"
        >
          <HStack width="100%" space="2.5" alignItems="center" mb="5">
            <Octicons name="video" size={30} color="green" />
            <Heading size="xl">5</Heading>
          </HStack>
          <Text color={progressSecondaryColor}>{t('VideoCompleted')}</Text>
        </Flex>
      </HStack>
      <HStack space="5" width="100%" justifyContent="center">
        <Flex
          bg={progressPrimaryColor}
          width="45%"
          direction="column"
          padding="5"
          borderRadius="20"
        >
          <HStack width="100%" space="2.5" alignItems="center" mb="5">
            <Entypo name="open-book" size={30} color="orange" />
            <Heading size="xl">3</Heading>
          </HStack>
          <Text color={progressSecondaryColor}>{t('ArticleCompleted')}</Text>
        </Flex>
      </HStack>
    </VStack>
  )
}
