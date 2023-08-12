import { VStack, HStack, Flex, Heading, Text } from 'native-base'

import { progressPrimaryColor, progressSecondaryColor } from '../../assets/ColorConst'
import { useTranslation } from 'react-i18next'

export const InteractionAnalytics = () => {
  const { t } = useTranslation();
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
          <Heading>7d</Heading>
          <Text color={progressSecondaryColor}>{t('CurrentStreak')}</Text>
        </Flex>
        <Flex
          bg={progressPrimaryColor}
          width="45%"
          direction="column"
          padding="5"
          borderRadius="20"
        >
          <Heading>10d</Heading>
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
          <Heading>15</Heading>
          <Text color={progressSecondaryColor}>{t('AudioCompleted')}</Text>
        </Flex>
        <Flex
          bg={progressPrimaryColor}
          width="45%"
          direction="column"
          padding="5"
          borderRadius="20"
        >
          <Heading>5</Heading>
          <Text color={progressSecondaryColor}>{t('ActivityCompleted')}</Text>
        </Flex>
      </HStack>
    </VStack>
  )
}
