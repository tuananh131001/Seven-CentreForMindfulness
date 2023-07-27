import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, query, getDocs, where } from 'firebase/firestore'
import { AlertToast } from '../components/Toast'
import * as SecureStore from 'expo-secure-store'

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

export const logInWithEmailAndPassword = async (data, toast, dispatch) => {
  try {
    const { email, password } = data
    data = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
    SecureStore.setItemAsync('uid', data.user.uid).then
    if (data) {
      dispatch({ type: 'SIGN_IN', payload: { uid: data.user.uid } })
    }
  } catch (err) {
    AlertToast(toast, err.message)
  }
}

export const logout = (dispatch) => {
  SecureStore.deleteItemAsync('uid')
  dispatch({ type: 'SIGN_OUT' })
  signOut(FIREBASE_AUTH)
}

export const getUserProfileByUID = async (uid, dispatch) => {
  const q = query(collection(FIREBASE_DB, 'users'), where('uid', '==', uid))

  const querySnapshot = await getDocs(q)
  querySnapshot.forEach((doc) => {
    dispatch({ type: 'SET_USER', payload: doc.data() })
  })
}
