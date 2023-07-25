import { FIREBASE_AUTH } from '../../firebaseConfig'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { AlertToast } from '../components/Toast'

export const logInWithEmailAndPassword = async (data, toast) => {
  try {
    const { email, password } = data
    return await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
  } catch (err) {
    AlertToast(toast, err.message)
  }
}

export const logout = () => {
  signOut(FIREBASE_AUTH)
}
