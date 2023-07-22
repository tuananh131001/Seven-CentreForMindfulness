import { AlertToast } from '../components/Toast'
import * as Notifications from 'expo-notifications'

export const checkNotificationPermissions = async (toast) => {
  const { status } = await Notifications.getPermissionsAsync()
  if (status !== 'granted') {
    AlertToast(toast, 'Notification permissions not granted.')
    return
  }
}
