import { VStack, Flex, Button, Heading, Text, HStack } from 'native-base'
import { ChoiceButton } from '../components/ChoiceButton'
import { primaryColor, primaryTextColor } from '../../assets/ColorConst'
import { useState } from 'react'

import { useTranslation } from 'react-i18next'
import * as SecureStore from 'expo-secure-store'

const ICONNAMES = [
  'leaf',
  'moon-outline',
  'body-outline',
  'sunny-outline',
  'happy-outline',
  'rocket-outline',
  'water-outline',
]

export const AssessmentView = ({ navigation }) => {
  const { t } = useTranslation()
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
    SecureStore.setItemAsync('assessmentStatus', 'completed').then()
    navigation.navigate('HomeStack')
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
          <Button
            borderRadius="90"
            bg="white"
            width="100%"
            onPress={handleContinueButton}
          >
            <Text>{t('Continue')}</Text>
          </Button>
        </HStack>
      </VStack>
    </Flex>
  )
}
