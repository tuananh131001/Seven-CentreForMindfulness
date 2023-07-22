import { Box, Center, Text, useToast } from 'native-base'
import * as Notifications from 'expo-notifications'
import { useEffect, useState } from 'react'
import { checkNotificationPermissions } from '../utils/checkNotificationPermissions'

export const SettingsPage = () => {
  const toast = useToast()

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
    <Center>
      <Box safeArea>
        {scheduledNotifications.map((notification) => (
          <Box key={notification.identifier} safeArea={5}>
            <Text>ID: {notification.identifier}</Text>
            <Text>Body:{notification.content.body}</Text>
            <Text>Trigger in next: {Math.floor(notification.trigger.seconds / 3600)} hours</Text>
          </Box>
        ))}
      </Box>
    </Center>
  )
}
