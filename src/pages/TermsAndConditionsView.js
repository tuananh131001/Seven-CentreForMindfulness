import { useState } from 'react'
import { ScrollView, Flex, Heading, Text, VStack, Checkbox, HStack, Button } from 'native-base'
import { useTranslation } from 'react-i18next'

export const TermsAndConditionsView = ({ navigation }) => {
  const { t } = useTranslation()
  const [agreed, setAgreed] = useState(false)

  const handleCheckbox = () => {
    setAgreed(!agreed)
    console.log('checked!')
  }

  const handleContinueButton = () => {
    if (agreed === true) {
      console.log('continued')
      navigation.navigate('AssessmentView')
    } else {
      console.log('you shall not pass')
    }
  }

  return (
    <ScrollView minHeight="100%" width="100%" px="5">
      <VStack width="100%" space="2.5" mb="10" mt="16">
        <Heading size="md">{t('TermsTitle1')}</Heading>
        <Text>{t('TermsContent1')}</Text>
      </VStack>
      <VStack width="100%" space="2.5" mb="10">
        <Heading size="md">{t('TermsTitle2')}</Heading>
        <Text>{t('TermsContent2')}</Text>
      </VStack>
      <VStack width="100%" space="2.5" mb="10">
        <Heading size="md">{t('TermsTitle3')}</Heading>
        <VStack width="100%" space="2.5" mb="2.5">
          <Heading size="sm">{t('TermsSubtitle3.1')}</Heading>
          <Text>{t('TermsContent3.1')}</Text>
        </VStack>
        <VStack width="100%" space="2.5">
          <Heading size="sm">{t('TermsSubtitle3.2')}</Heading>
          <Text>{t('TermsContent3.2')}</Text>
        </VStack>
      </VStack>
      <VStack width="100%" space="2.5" mb="10">
        <HStack width="100%" space="2.5" alignItems="center" justifyContent="center" px="5">
          <Checkbox
            accessibilityLabel="I agree with the Terms & Conditions"
            onChange={handleCheckbox}
          />
          <Text fontSize="12" italic bold>
            {t('TermsAgree')}
          </Text>
        </HStack>
        <Button borderRadius="90" bg="black" width="100%" onPress={handleContinueButton}>
          <Text color="white">{t('Continue')}</Text>
        </Button>
      </VStack>
    </ScrollView>
  )
}
