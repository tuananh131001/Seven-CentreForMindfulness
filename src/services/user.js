import { FIREBASE_AUTH, FIREBASE_DB } from '../../firebaseConfig'
import {
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { addDoc, collection, query, getDocs, where, updateDoc, doc } from 'firebase/firestore'
import { AlertToast } from '../components/Toast'
import * as SecureStore from 'expo-secure-store'
import { differenceInCalendarDays, parseISO } from 'date-fns'

const DEFAULT_AVATAR = 'https://i.imgur.com/LZmjxxi.png'
const DEFAULT_NOTIFICATION_HOUR = 20
const DEFAULT_NOTIFICATION_MINUTE = 0

export const registerWithEmailAndPassword = async (data, toast, dispatch) => {
  const { name, email, password, age, gender } = data

  try {
    const res = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
    const user = res.user
    await addDoc(collection(FIREBASE_DB, 'users'), {
      uid: user.uid,
      name,
      email,
      gender,
      isCompletedTest: false,
      isAgreedTerms: false,
      age,
      avatar: DEFAULT_AVATAR,
      notificationHour: DEFAULT_NOTIFICATION_HOUR,
      notificationMinute: DEFAULT_NOTIFICATION_MINUTE,
    })
    SecureStore.setItemAsync('uid', user.uid).then
    if (user) {
      dispatch({ type: 'SIGN_IN', payload: { uid: user.uid } })
    }
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
      await dispatch({ type: 'SIGN_IN', payload: { uid: data.user.uid } })
      // getUserProfileByUID(data.user.uid, dispatch)
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
  if (querySnapshot.empty) {
    console.log('Invalid user UID')
    return
  }
  const userDoc = querySnapshot.docs[0]

  dispatch({ type: 'SET_USER', payload: userDoc.data() })

  const streakData = {
    lastUsageDate: userDoc.data().lastUsageDate ?? null,
    streak: userDoc.data().currentStreak ?? null,
    longestStreak: userDoc.data().longestStreak ?? null,
  }

  calculateNewUserStreak(uid, streakData, dispatch)
}

export const updateUserProfileByUID = async (uid, updatedData, toast, dispatch) => {
  const q = query(collection(FIREBASE_DB, 'users'), where('uid', '==', uid))

  try {
    const querySnapshot = await getDocs(q)

    if (querySnapshot.empty) {
      console.error('User not found with the given UID')
      return
    }

    const userDocRef = doc(FIREBASE_DB, 'users', querySnapshot.docs[0].id)
    await updateDoc(userDocRef, updatedData)

    AlertToast(toast, 'User profile updated successfully!', 'success')
    dispatch({ type: 'SET_USER', payload: updatedData })
  } catch (error) {
    AlertToast(toast, error.message)
  }
}

export const calculateNewUserStreak = async (uid, streakData, dispatch) => {
  const { lastUsageDate, streak, longestStreak } = streakData
  try {
    const currentTimestamp = Date.now()
    const currentDateUTC = parseISO(new Date(currentTimestamp).toISOString().split('T')[0])
    const lastUsageDateUTC = parseISO(new Date(lastUsageDate).toISOString().split('T')[0])

    if (streak != null) {
      const daysDifferenceUTC = differenceInCalendarDays(currentDateUTC, lastUsageDateUTC)
      const newStreak = daysDifferenceUTC === 1 ? streak + 1 : daysDifferenceUTC > 1 ? 1 : streak
      const newLongestStreak = newStreak > longestStreak ? newStreak : longestStreak
      const newUserStreak = {
        currentStreak: newStreak,
        lastUsageDate: currentTimestamp,
        longestStreak: newLongestStreak,
      }
      dispatch({ type: 'SET_USER_STREAK', payload: newUserStreak })
      updateUserFields(uid, newUserStreak)
    } else {
      const newUserStreak = { lastUsageDate: currentTimestamp, currentStreak: 1, longestStreak: 1 }
      dispatch({ type: 'SET_USER_STREAK', payload: newUserStreak })
      updateUserFields(uid, newUserStreak)
    }
  } catch (error) {
    console.error('Error updating daily usage streak: ', error)
  }
}

export const updateUserFields = async (uid, data) => {
  const q = query(collection(FIREBASE_DB, 'users'), where('uid', '==', uid))
  const querySnapshot = await getDocs(q)
  if (!querySnapshot.empty) {
    const docRef = doc(FIREBASE_DB, 'users', querySnapshot.docs[0].id)
    updateDoc(docRef, data)
      .then(() => {
        console.log('Update user information successfully!')
      })
      .catch((error) => {
        console.error('Error updating document: ', error)
      })
  } else {
    console.log('No matching documents found.')
  }
}

export const sendPasswordResetEmailToUser = async (email, toast, modalVisible, setModalVisible) => {
  await sendPasswordResetEmail(FIREBASE_AUTH, email)
    .then(() => {
      AlertToast(toast, 'Password reset email sent successfully!', 'success')
      setModalVisible(false)
    })
    .catch(() => {
      AlertToast(toast, 'This user email is not valid or not supported')
      // alert('This user email is not valid or not supported')
      setModalVisible(true)
    })
}
