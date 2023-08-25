import { Box, VStack, Center, Flex, Heading, Text, useToast } from 'native-base'
import * as Notifications from 'expo-notifications'
import { useEffect, useState } from 'react'
import { checkNotificationPermissions } from '../utils/checkNotificationPermissions'
import { LanguageSwitchButton } from '../components/LanguageSwitchButton'
import { useTranslation } from 'react-i18next'

export const SettingsPage = () => {
  const toast = useToast()
  const { t } = useTranslation()

  useEffect(() => {
    checkNotificationPermissions(toast)
    checkScheduledNotifications()
  }, [])

  const [scheduledNotifications, setScheduledNotifications] = useState([])
  const checkScheduledNotifications = async () => {
    const allScheduledNotifications = await Notifications.getAllScheduledNotificationsAsync()
    setScheduledNotifications(allScheduledNotifications)
  }

  return (
    <Center mt="20">
      <Box>
        <VStack space="5">
          {scheduledNotifications.map((notification) => (
            <Box key={notification.identifier}>
              <Text>ID: {notification.identifier}</Text>
              <Text>Body:{notification.content.body}</Text>
              <Text>Trigger in next: {Math.floor(notification.trigger.seconds / 3600)} hours</Text>
            </Box>
          ))}
          <VStack space="5" width="100%" alignItems="center">
            <Heading>{t('SelectLanguage')}</Heading>
            <LanguageSwitchButton />
          </VStack>
        </VStack>
      </Box>
    </Center>
  )
}
