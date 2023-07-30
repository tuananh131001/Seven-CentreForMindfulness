import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig'
import { createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import { addDoc, collection, query, getDocs, where, updateDoc, doc } from 'firebase/firestore'
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

export const updateUserProfileByUID = async (uid, updatedData, toast, dispatch) => {
  const q = query(collection(FIREBASE_DB, 'users'), where('uid', '==', uid))

  try {
    const querySnapshot = await getDocs(q)

    // Check if the user document exists
    if (querySnapshot.empty) {
      console.error('User not found with the given UID')
      return
    }

    // Since there should be only one user document with the given UID, we can directly update it
    const userDocRef = doc(FIREBASE_DB, 'users', querySnapshot.docs[0].id)
    await updateDoc(userDocRef, updatedData)

    AlertToast(toast, 'User profile updated successfully!', 'success')
    dispatch({ type: 'SET_USER', payload: updatedData })
  } catch (error) {
    AlertToast(toast, error.message)
  }
}
