import { Text } from 'react-native'
import { VStack, Flex, Button, Heading, HStack } from 'native-base'
import { ChoiceButton } from '../components/ChoiceButton'
import { primaryColor, primaryTextColor } from '../../assets/ColorConst'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
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
  return (
    <Flex bg={primaryColor} height="100%" width="100%" justifyContent="center">
      <VStack space={2} justifyContent={'space-between'} height={'100%'}>
        <Flex justifyContent={'flex-end'} height={'75%'}>
          <VStack px={5} marginBottom={5}>
            <Heading color={primaryTextColor}>{t('AssessmentViewTitle')}</Heading>
            <Text style={{ fontSize: 17, color: '#DBD9D0', margin: 5 }}>
              {t('AssessmentViewDescription')}
            </Text>
          </VStack>

          <VStack width="100%" space={2} alignItems="center">
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

        <HStack justifyContent={'center'} width={'100%'} marginBottom={5}>
          <Button
            borderRadius="90"
            bgColor="white"
            width="90%"
            onPress={() => navigation.navigate('HomeStack')}
          >
            <Text>{t('Continue')}</Text>
          </Button>
        </HStack>
      </VStack>
    </Flex>
  )
}
