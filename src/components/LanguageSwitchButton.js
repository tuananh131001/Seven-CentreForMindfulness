import { HStack, Box, Button } from 'native-base'
import i18n from '../utils/i18n'

export const LanguageSwitchButton = ({navigation}) => {
  const toggleLanguage = (lang) => {
    i18n.changeLanguage(lang)
  }

  return (
    <Box alignSelf="center">
      <HStack space={5}>
        <Button
          onPress={() => toggleLanguage('vi')}
          colorScheme="danger"
          accessibilityLabel="Change Language"
        >
          🇻🇳 Tiếng Việt
          </Button>
        <Button
          onPress={() => toggleLanguage('en')}
          colorScheme="info"
          accessibilityLabel="Change Language"
        >🇬🇧 English
        </Button>
      </HStack>
    </Box>
  )
}
