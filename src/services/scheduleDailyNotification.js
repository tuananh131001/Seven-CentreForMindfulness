import * as Notifications from 'expo-notifications'

export const scheduleDailyNotification = async () => {
  const allScheduledNotifications = await Notifications.getAllScheduledNotificationsAsync()

  if (allScheduledNotifications.length == 0) {
    const trigger = new Date()
    trigger.setHours(20)
    trigger.setMinutes(0)
    trigger.setSeconds(0)

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Daily Notification',
        body: 'Time to do your exercise! 👋',
      },
      trigger,
    })
  } else if (allScheduledNotifications.length == 1) {
    return
  } else {
    await Notifications.cancelAllScheduledNotificationsAsync()
  }
}
