import { VStack, Flex, Button, Heading, Text, HStack } from 'native-base'
import { ChoiceButton } from '../components/ChoiceButton'
import { primaryColor, primaryTextColor } from '../../assets/ColorConst'
import { useState, useContext } from 'react'
import { SignInContext } from '../hooks/useAuthContext'
import { useTranslation } from 'react-i18next'
import { updateUserFields } from '../services/user'

const ICONNAMES = [
  'leaf',
  'moon-outline',
  'body-outline',
  'sunny-outline',
  'happy-outline',
  'rocket-outline',
  'water-outline',
]

const OPTION_LIST = ['option1', 'option2', 'option3', 'option4', 'option5', 'option6', 'option7']

export const AssessmentView = ({ navigation }) => {
  const { t } = useTranslation()
  const { signedIn, dispatchSignedIn } = useContext(SignInContext)
  const [selected, setSelected] = useState([])
  const BUTTONTEXT = OPTION_LIST.map((option) => t(option))

  const handleContinueButton = async () => {
    if (selected.length > 0) {
      let score = selected.reduce(
        (accumulator, currentValue) => accumulator + (currentValue + 1),
        0,
      )
      updateUserFields(signedIn.uid, { isCompletedTest: true, assessmentScore: score })
      dispatchSignedIn({ type: 'SET_TEST_STATUS', payload: { isCompletedTest: true } })
      navigation.navigate('HomeStack', { screen: 'Home' })
    } else {
      alert('Please select at least one option before proceeding')
    }
  }

  return (
    <Flex bg={primaryColor} height="100%" width="100%" justifyContent="center">
      <VStack space="2" justifyContent="space-between" height="100%">
        <Flex height="80%">
          <VStack padding="5" mt="10">
            <Heading color={primaryTextColor}>{t('AssessmentViewTitle')}</Heading>
            <Text fontSize="sm" color={primaryTextColor}>
              {t('AssessmentViewDescription')}
            </Text>
          </VStack>

          <VStack width="100%" space="2" alignItems="center">
            {ICONNAMES.map((iconName, index) => (
              <ChoiceButton
                selected={selected}
                setSelected={setSelected}
                buttonIndex={index}
                iconName={iconName}
                buttonText={BUTTONTEXT[index]}
                key={iconName}
              />
            ))}
          </VStack>
        </Flex>

        <HStack justifyContent="center" padding="5">
          <Button borderRadius="90" bg="white" width="100%" onPress={handleContinueButton}>
            <Text>{t('Continue')}</Text>
          </Button>
        </HStack>
      </VStack>
    </Flex>
  )
}
