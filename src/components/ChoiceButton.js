import { Box, HStack, Text, Spacer, Flex } from 'native-base'
import { choiceButtonColor } from '../../assets/ColorConst'
import { primaryTextColor } from '../../assets/ColorConst'
import { Icon } from 'native-base'
import { Ionicons } from '@expo/vector-icons'
import { TouchableHighlight } from 'react-native'
import { assessChoiceButtonBorder } from '../../assets/ColorConst'

export const ChoiceButton = ({ iconName, buttonText, selected, setSelected, buttonIndex }) => {
  const handlePress = () => {
    if (selected.includes(buttonIndex)) {
      setSelected(selected.filter((item) => item !== buttonIndex))
    } else {
      setSelected([...selected, buttonIndex])
    }
  }

  return (
    <TouchableHighlight onPress={handlePress} underlayColor={'#transparent'}>
      <Box
        bg={selected.includes(buttonIndex) ? 'white' : choiceButtonColor}
        borderRadius="90"
        width="90%"
        px="5"
        py="2"
        borderWidth={2}
        borderColor={selected.includes(buttonIndex) ? 'black' : { assessChoiceButtonBorder }}
      >
        <Flex direction="row" alignItems="center" justifyContent="flex-start" space="5">
          <HStack>
            <Icon
              as={Ionicons}
              name={iconName}
              size={8}
              color={selected.includes(buttonIndex) ? 'black' : 'white'}
              style={{ alignSelf: 'flex-start' }}
            />
            <Text
              fontSize="xl"
              color={selected.includes(buttonIndex) ? 'black' : primaryTextColor}
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
