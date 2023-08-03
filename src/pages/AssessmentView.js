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

const optionsToScore = {
  "Deveplop Gratitude": 1,
  "Better Sleep": 2,
  "Improve Performance": 3,
  "Reduce Stress": 4,
  "Increase Happiness": 5,
  "Build Self Esteem": 6,
  "Reduce Anxiety": 7,
};

export const AssessmentView = ({ navigation }) => {
  const { t } = useTranslation()
  const { signedIn, dispatchSignedIn } = useContext(SignInContext)
  const calculateScore = (selected) => {
    let score = 0;
    for (const str of selected) {
      if (Object.prototype.hasOwnProperty.call(optionsToScore, str)) {
        score += optionsToScore[str];
      }
    }
    return score;
  }
  const BUTTONTEXT = [
    t('DeveplopGratitude'),
    t('BetterSleep'),
    t('ImprovePerformance'),
    t('ReduceStress'),
    t('IncreaseHappiness'),
    t('BuildSelfEsteem'),
    t('ReduceAnxiety'),
  ]
  const [selected, setSelected] = useState([])

  const handleContinueButton = async () => {
    const score = calculateScore(selected);
    if (selected.length > 0) {
      updateUserFields(signedIn.uid, { isCompletedTest: true })
      updateUserFields(signedIn.uid, { assessmentScore: score })
      dispatchSignedIn({ type: 'SET_TEST_STATUS', payload: { isCompletedTest: true } })
      navigation.navigate('HomeStack')
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
