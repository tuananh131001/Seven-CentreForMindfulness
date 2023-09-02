import { Box, VStack, Center, Heading, Button } from 'native-base'
import { LanguageSwitchButton } from '../components/LanguageSwitchButton'
import { useTranslation } from 'react-i18next'
import { NotificationCard } from '../components/NotificationCard'
import { useState } from 'react'
import { AlertModal } from '../components/AlertModal'

export const SettingsPage = () => {
  const { t } = useTranslation()
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <Center mt="20">
      <Box>
        <VStack space="5">
          <VStack space="5" width="100%" alignItems="center">
            <Heading>{t('SelectLanguage')}</Heading>
            <LanguageSwitchButton />
            <Heading>{t('AdjustNotificationTimer')}</Heading>
            <NotificationCard />
            <Button
              onPress={() => setModalVisible(true)}
              colorScheme="danger"
              accessibilityLabel="Change Language"
              width="100%"
            >
              Delete Account
            </Button>
          </VStack>
        </VStack>
      </Box>
      {modalVisible && <AlertModal modalVisible={modalVisible} setModalVisible={setModalVisible} />}
    </Center>
  )
}
