import * as Notifications from 'expo-notifications'
import { checkNotificationPermissions } from '../utils/checkNotificationPermissions'
import i18n from '../utils/i18n'

export const scheduleDailyNotification = async (toast, hour, minute) => {
  const pushNotification = async (hasPushNotificationPermissionGranted, title, body) => {
    if (hasPushNotificationPermissionGranted) {
      try {
        await Notifications.cancelAllScheduledNotificationsAsync()
        await Notifications.scheduleNotificationAsync({
          content: {
            title: title,
            body: body,
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
  const hasPushNotificationPermissionGranted = await checkNotificationPermissions(toast)
  if (i18n.language === 'vi') {
    await pushNotification(
      hasPushNotificationPermissionGranted,
      'Thông báo hằng ngày',
      'Tới giờ luyện tập rồi! 👋',
    )
  } else {
    await pushNotification(
      hasPushNotificationPermissionGranted,
      'Daily Notification',
      'Time to do your exercise! 👋',
    )
  }
}

export const clearAllScheduledNotifications = async () => {
  await Notifications.cancelAllScheduledNotificationsAsync()
}
