import { Box, HStack, Text, Spacer, Flex } from 'native-base'
import { choiceButtonColor } from '../../assets/ColorConst'
import { primaryTextColor } from '../../assets/ColorConst'
import { Icon } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { TouchableHighlight } from 'react-native'

export const ChoiceButton = ({ iconName, buttonText, selected, setSelected }) => {
  const handlePress = () => {
    if (selected.includes(buttonText)) {
      setSelected(selected.filter((item) => item !== buttonText))
      console.log('unpressed')
    } else {
      setSelected([...selected, buttonText])
      console.log('pressed')
    }
  }

  return (
    <TouchableHighlight onPress={handlePress} underlayColor={'#transparent'}>
      <Box
        bg={selected.includes(buttonText) ? 'white' : choiceButtonColor}
        borderRadius="90"
        width="90%"
        px="5"
        py="2"
        borderWidth={2}
        borderColor={selected.includes(buttonText) ? 'black' : '#726049'}
      >
        <Flex direction="row" alignItems="center" justifyContent="flex-start" space="5">
          <HStack>
            <Icon
              as={Ionicons}
              name={iconName}
              size={8}
              color={selected.includes(buttonText) ? 'black' : 'white'}
              style={{ alignSelf: 'flex-start' }}
            />
            <Text
              fontSize="xl"
              color={selected.includes(buttonText) ? 'black' : primaryTextColor}
              fontWeight="10"
              px={5}
            >
              {buttonText}
            </Text>
            <Spacer />
          </HStack>
        </Flex>
      </Box>
    </TouchableHighlight>
  )
}
