import { Text } from 'react-native'
import { VStack, Flex, Button, Heading, HStack } from 'native-base'
import { ChoiceButton } from '../components/ChoiceButton'
import { primaryColor, primaryTextColor } from '../../assets/ColorConst'
import { useState } from 'react'
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

export const AssessmentView = ({ navigation }) => {
  const [selected, setSelected] = useState([])
  return (
    <Flex bg={primaryColor} height="100%" width="100%" justifyContent="center">
      <VStack space={2} justifyContent={'space-between'} height={'100%'}>
        <Flex justifyContent={'flex-end'} height={'75%'}>
          <VStack px={5} marginBottom={5}>
            <Heading color={primaryTextColor}>What brings you to Seven?</Heading>
            <Text style={{ fontSize: 17, color: '#DBD9D0', margin: 5 }}>
              We will personalize recommendations based on your goals.
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
            <Text>Continue</Text>
          </Button>
        </HStack>
      </VStack>
    </Flex>
  )
}
