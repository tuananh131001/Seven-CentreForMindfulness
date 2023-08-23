import { Flex, VStack, Heading, Text } from 'native-base'

import {
  progressPrimaryColor,
  progressSecondaryColor,
  progressLimeColor,
  progressYellowColor,
  progressOrangeColor,
  progressRedColor,
} from '../../assets/ColorConst'
import { useTranslation } from 'react-i18next'

export const UsageTimeAnalytics = ({ assessmentScore }) => {
  const { t } = useTranslation()

  const returnSeverityColor = () => {
    let colorString = ''

    if (assessmentScore <= 7) {
      colorString = progressLimeColor
    } else if (assessmentScore > 7 && assessmentScore <= 14) {
      colorString = progressYellowColor
    } else if (assessmentScore > 14 && assessmentScore <= 21) {
      colorString = progressOrangeColor
    } else {
      colorString = progressRedColor
    }

    return colorString
  }

  const returnSeverityText = () => {
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
        <Heading size="4xl" color={returnSeverityColor()}>
          {assessmentScore}/28
        </Heading>
        <Heading size="xl" color={returnSeverityColor()}>
          {returnSeverityText()}
        </Heading>
      </VStack>
      <Flex width="100%" my="5" borderColor={progressSecondaryColor} borderWidth="1"></Flex>
      <Text color={progressSecondaryColor}>{t('AssessmentScore')}</Text>
    </Flex>
  )
}
