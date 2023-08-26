import { Box, VStack, Center, Heading } from 'native-base'
import { LanguageSwitchButton } from '../components/LanguageSwitchButton'
import { useTranslation } from 'react-i18next'
import { NotificationCard } from '../components/NotificationCard'

export const SettingsPage = () => {
  const { t } = useTranslation()

  return (
    <Center mt="20">
      <Box>
        <VStack space="5">
          <VStack space="5" width="100%" alignItems="center">
            <Heading>{t('SelectLanguage')}</Heading>
            <LanguageSwitchButton />
            <Heading>{t('AdjustNotificationTimer')}</Heading>
            <NotificationCard />
          </VStack>
        </VStack>
      </Box>
    </Center>
  )
}
