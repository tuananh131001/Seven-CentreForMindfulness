import { View, Text } from 'react-native'
import {
  Box,
  HStack,
  VStack,
  Pressable,
  Image,
  Flex,
  Container,
  Center,
  Spacer,
  Button,
  Heading,
} from 'native-base'
import { ChoiceButton } from '../components/ChoiceButton'
import { primaryColor, primaryTextColor } from '../../assets/ColorConst'
const ICONNAMES = [
  'leaf',
  'moon-outline',
  'body-outline',
  'sunny-outline',
  'happy-outline',
  'rocket-outline',
  'water-outline',
]
const BUTTONTEXT = [
  'Develop Gratitude',
  'Better Sleep',
  'Improve Performance',
  'Reduce Stress',
  'Increase Happiness',
  'Build Self Esteem',
  'Reduce Anxiety',
]

export const AssessmentView = () => {
  return (
    <Flex bg={primaryColor} height="100%" width="100%" justifyContent="center">
      <VStack space={2} alignItems="center" justifyContent="space-between">
        <Heading color={primaryTextColor} fontWeight="light">
          What brings you to Seven?
        </Heading>
        <Text style={{ fontSize: 17, color:"#DBD9D0" } }>We'll personalize recommendations based on your goals.</Text>
        <VStack width="100%" space={2} alignItems="center">
          {ICONNAMES.map((iconName, index) => (
            <ChoiceButton iconName={iconName} buttonText={BUTTONTEXT[index]} key={index} />
          ))}
        </VStack>

        <Button borderRadius="90" bgColor="white" width="90%" mb={-200} mt={120}>
          <Text>Continue</Text>
        </Button>
      </VStack>
    </Flex>
  )
}
