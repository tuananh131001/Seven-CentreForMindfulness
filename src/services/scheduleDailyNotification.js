import * as Notifications from 'expo-notifications'
import { checkNotificationPermissions } from '../utils/checkNotificationPermissions'

export const scheduleDailyNotification = async (toast) => {
  const hasPushNotificationPermissionGranted = await checkNotificationPermissions(toast)
  const allScheduledNotifications = await Notifications.getAllScheduledNotificationsAsync()
  if (hasPushNotificationPermissionGranted) {
    if (allScheduledNotifications.length == 0) {
      const trigger = new Date()
      trigger.setHours(20)
      try {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: 'Daily Notification',
            body: 'Time to do your exercise! 👋',
          },
          trigger,
        })
      } catch (error) {
        console.log(error)
      }
    } else if (allScheduledNotifications.length == 1) {
      return
    } else {
      await Notifications.cancelAllScheduledNotificationsAsync()
    }
  }
}
