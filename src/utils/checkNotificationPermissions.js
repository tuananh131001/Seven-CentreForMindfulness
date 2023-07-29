import { AlertToast } from '../components/Toast'
import * as Notifications from 'expo-notifications'

export const checkNotificationPermissions = async (toast) => {
  const settings = await Notifications.getPermissionsAsync()
  if (settings.status !== 'granted') {
    AlertToast(toast, 'Notification permissions not granted.')
    return
  } else {
    return (
      settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    )
  }
}
