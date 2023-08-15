import { useState, useContext } from 'react'
import { ScrollView, Heading, Text, VStack, Checkbox, HStack, Button } from 'native-base'
import { useTranslation } from 'react-i18next'

import { SignInContext } from '../hooks/useAuthContext'
import { updateUserFields } from '../services/user'

export const TermsAndConditionsView = ({ navigation }) => {
  const { t } = useTranslation()
  const { signedIn, dispatchSignedIn } = useContext(SignInContext)
  const [agreed, setAgreed] = useState(false)

  const handleCheckbox = () => {
    setAgreed(!agreed)
    console.log('checked!')
  }

  const handleContinueButton = () => {
   if (agreed !== true) return;
   console.log('continued')
   updateUserFields(signedIn.uid, { isAgreedTerms: true })
   dispatchSignedIn({ type: 'SET_AGREED_TERMS_STATUS', payload: { isAgreedTerms: true } })
   navigation.navigate('HomeStack')

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
        <Button
          width="100%"
          borderRadius="90"
          bg="black"
          opacity={agreed ? 1 : 0.25}
          disabled={agreed ? false : true}
          onPress={handleContinueButton}
        >
          <Text color="white">{t('Continue')}</Text>
        </Button>
      </VStack>
    </ScrollView>
  )
}
