import { Box, Button, Center, Text, useToast } from 'native-base'
import { useContext, useEffect, useState } from 'react'
import DateTimePicker from '@react-native-community/datetimepicker'
import * as Notifications from 'expo-notifications'
import { checkNotificationPermissions } from '../utils/checkNotificationPermissions'
import add from 'date-fns/add'
import { clearAllScheduledNotifications, scheduleDailyNotification } from '../services/notification'
import { updateUserFields } from '../services/user'
import { SignInContext } from '../hooks/useAuthContext'
import { getHours, getMinutes } from 'date-fns'
export const NotificationCard = () => {
  const toast = useToast()
  const { signedIn } = useContext(SignInContext)
  const [date, setDate] = useState(new Date(1693022411243.0166))
  const [scheduledNotifications, setScheduledNotifications] = useState([])

  const checkScheduledNotifications = async () => {
    const allScheduledNotifications = await Notifications.getAllScheduledNotificationsAsync()
    setScheduledNotifications(allScheduledNotifications)
    const nextTrigger = add(Date.now(), {
      hours: allScheduledNotifications[0]?.trigger.dateComponents.hour,
    })

    setDate(nextTrigger)
  }

  const onChange = async (event, selectedDate) => {
    const { type } = event
    if (type === 'set') {
      const hours = getHours(selectedDate)
      const minutes = getMinutes(selectedDate)

      await updateUserFields(signedIn.uid, { notificationHour: hours, notificationMinute: minutes })
      await scheduleDailyNotification(toast, hours, minutes)
      await checkScheduledNotifications()
      setDate(selectedDate)
    }
  }

  useEffect(() => {
    checkNotificationPermissions(toast)
    checkScheduledNotifications()
  }, [])

  return (
    <Box>
      {scheduledNotifications.map((notification) => (
        <Box key={notification.identifier}>
          <Text>ID: {notification.identifier}</Text>
          <Text>Body:{notification.content.body}</Text>
          <Text>
            Trigger at: {notification.trigger.dateComponents.hour} hours{' '}
            {notification.trigger.dateComponents.minute} minutes
          </Text>
        </Box>
      ))}
      <Text>selected: {date.toLocaleString()}</Text>
      <Center>
        {' '}
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={'time'}
          is24Hour={true}
          onChange={onChange}
        />
      </Center>

      <Button
        mt={5}
        onPress={() => {
          checkScheduledNotifications()
        }}
      >
        Check Notification
      </Button>

      <Button
        mt={5}
        onPress={async () => {
          await clearAllScheduledNotifications()
          await checkScheduledNotifications()
        }}
        colorScheme="secondary"
      >
        Clear Notification
      </Button>
    </Box>
  )
}
