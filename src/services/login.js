import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { AlertToast } from '../components/Toast'

export const logInWithEmailAndPassword = async (data, toast) => {
  try {
    const { email, password } = data
    const res = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
    console.log(res.user)
  } catch (err) {
    AlertToast(toast, err.message)
  }
}
