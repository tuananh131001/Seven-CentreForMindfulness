import { Box, Center, Flex } from 'native-base'
import { LanguageSwitchButton } from '../components/LanguageSwitchButton'

export const LanguageView = ({ navigation }) => {
  return (
    <Center height={'100%'} width={'100%'}>
      <Center>
        <LanguageSwitchButton navigation={navigation} />
      </Center>
    </Center>
  )
}
