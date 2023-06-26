import { Box, Badge, VStack, HStack, Heading, Image, Button, Text, Spacer, Flex } from 'native-base'
import { choiceButtonColor } from '../../assets/ColorConst'
import {
    primaryColor,
    secondaryColor,
    primaryTextColor,
    secondaryTextColor,
    subTextColor,
    boldTextColor,
    placeholderTextColor,
    signInButtonColor,
  } from '../../assets/ColorConst'
  import { Icon } from 'native-base';
  import { Ionicons} from '@expo/vector-icons';

export const ChoiceButton = ({iconName, buttonText}) => {
    return (
        <Box bg={choiceButtonColor} borderRadius="90" width="90%" px="5" py="2" borderWidth={2} borderColor="#726049">
            <Flex direction="row" alignItems="center" justifyContent="flex-start" space="5">
            <Icon as={Ionicons} name={iconName} size={8} color="white" style={{alignSelf: 'flex-start'}} />
            <Spacer/>
        <Text fontSize="xl" color={primaryTextColor} fontWeight="bold">
            {buttonText}
        </Text>
        <Spacer/>
        </Flex>
      </Box>

    )
}