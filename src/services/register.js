import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection } from 'firebase/firestore'
import { AlertToast } from '../components/Toast'

const DEFAULT_AVATAR = 'https://i.imgur.com/LZmjxxi.png'

export const registerWithEmailAndPassword = async (data, toast) => {
  const { name, email, password, age, gender } = data

  try {
    const res = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
    const user = res.user
    await addDoc(collection(FIREBASE_DB, 'users'), {
      uid: user.uid,
      name,
      email,
      gender,
      age,
      avatar: DEFAULT_AVATAR,
    })
  } catch (err) {
    AlertToast(toast, err.message)
  }
}
