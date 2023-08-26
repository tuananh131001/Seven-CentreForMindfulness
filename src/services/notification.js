import * as Notifications from 'expo-notifications'
import { checkNotificationPermissions } from '../utils/checkNotificationPermissions'

export const scheduleDailyNotification = async (toast, hour, minute) => {
  const hasPushNotificationPermissionGranted = await checkNotificationPermissions(toast)
  if (hasPushNotificationPermissionGranted) {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync()
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Daily Notification',
          body: 'Time to do your exercise! 👋',
        },
        trigger: {
          hour: hour,
          minute: minute,
          repeats: true,
        },
      })
    } catch (error) {
      console.log(error)
    }
  }
}

export const clearAllScheduledNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync()
}
