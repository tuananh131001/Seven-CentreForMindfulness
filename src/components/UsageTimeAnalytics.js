import { Flex, VStack, Heading, Text } from 'native-base'

import { progressPrimaryColor, progressSecondaryColor } from '../../assets/ColorConst'
import { useTranslation } from 'react-i18next'

export const UsageTimeAnalytics = ({ assessmentScore }) => {
  const { t } = useTranslation()

  const toggleSeverityColor = () => {
    let colorString = ''

    if (assessmentScore <= 7) {
      colorString = 'lime.500'
    } else if (assessmentScore > 7 && assessmentScore <= 14) {
      colorString = 'yellow.400'
    } else if (assessmentScore > 14 && assessmentScore <= 21) {
      colorString = 'orange.400'
    } else {
      colorString = 'red.500'
    }

    return colorString
  }

  const toggleSeverityText = () => {
    let textString = ''

    if (assessmentScore <= 7) {
      textString = 'LOW SEVERITY!'
    } else if (assessmentScore > 7 && assessmentScore <= 14) {
      textString = 'MEDIUM SEVERITY!'
    } else if (assessmentScore > 7 && assessmentScore <= 21) {
      textString = 'HIGH SEVERITY!'
    } else {
      textString = 'CRITICAL SEVERITY!'
    }

    return textString
  }

  return (
    <Flex
      bg={progressPrimaryColor}
      direction="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      padding="5"
      borderRadius="20"
    >
      <VStack width="100%" space="5" alignItems="center">
        <Heading size="4xl" color={toggleSeverityColor()}>
          {assessmentScore}/28
        </Heading>
        <Heading size="xl" color={toggleSeverityColor()}>
          {toggleSeverityText()}
        </Heading>
      </VStack>
      <Flex width="100%" my="5" borderColor={progressSecondaryColor} borderWidth="1"></Flex>
      <Text color={progressSecondaryColor}>{t('AssessmentScore')}</Text>
    </Flex>
  )
}
