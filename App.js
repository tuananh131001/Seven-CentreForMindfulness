import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeBaseProvider, useToast } from 'native-base'
import { HomeView } from './src/pages/HomeView'
import { LoginPage } from './src/pages/LoginPage'
import { EditProfilePage } from './src/pages/EditProfilePage'
import { Ionicons } from '@expo/vector-icons'
import * as Notifications from 'expo-notifications'
import * as SecureStore from 'expo-secure-store'

import { I18nextProvider, useTranslation } from 'react-i18next'
import { onAuthStateChanged } from 'firebase/auth'
import { RegisterPage } from './src/pages/RegisterPage'
import { ProfilePage } from './src/pages/ProfilePage'
import { AudioView } from './src/pages/AudioView'
import { ProgressView } from './src/pages/ProgressView'

import { AssessmentView } from './src/pages/AssessmentView'
import { useEffect, useContext, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { scheduleDailyNotification } from './src/services/scheduleDailyNotification'
import { SettingsPage } from './src/pages/SettingPages'
import { checkNotificationPermissions } from './src/utils/checkNotificationPermissions'
import { SignInContext, SignInContextProvider } from './src/hooks/useAuthContext'
import { FIREBASE_AUTH } from './firebaseConfig'
import { getUserProfileByUID } from './src/services/user'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const PublicStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginPage" component={LoginPage} />
    <Stack.Screen name="RegisterPage" component={RegisterPage} />
  </Stack.Navigator>
)
const HomeStack = () => (
  <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
    <Tab.Screen
      name="Home"
      component={HomeView}
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="home" color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfilePage}
      options={{
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="person-circle-sharp" color={color} size={size} />
        ),
      }}
    />
    <Tab.Screen
      name="Progress"
      component={ProgressView}
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="bar-chart" color={color} size={size} />,
      }}
    />
    <Tab.Screen
      name="Setting"
      component={SettingsPage}
      options={{
        tabBarIcon: ({ color, size }) => <Ionicons name="settings" color={color} size={size} />,
      }}
    />
  </Tab.Navigator>
)

const PrivateStack = ({ isCompletedAssessment }) =>
  isCompletedAssessment === true ? (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeStack" component={HomeStack} />
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
      <Stack.Screen name="AudioView" component={AudioView} />
      <Stack.Screen name="EditProfilePage" component={EditProfilePage} />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AssessmentView" component={AssessmentView} />
      <Stack.Screen name="HomeStack" component={HomeStack} />
      <Stack.Screen name="ProfilePage" component={ProfilePage} />
      <Stack.Screen name="AudioView" component={AudioView} />
      <Stack.Screen name="EditProfilePage" component={EditProfilePage} />
    </Stack.Navigator>
  )

const AppNavigator = () => {
  const { signedIn, dispatchSignedIn } = useContext(SignInContext)
  const [user, setUser] = useState(null)
  const [isCompletedAssessment, setIsCompletedAssessment] = useState(false)
  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (user) => {
      if (user) {
        setUser(user)
      } else {
        setIsCompletedAssessment(false)
        setUser(null)
      }
    })
  }, [])

  useEffect(() => {
    SecureStore.getItemAsync('uid').then((response) => {
      dispatchSignedIn({ type: 'SIGN_IN', payload: { uid: response } })
    })
  }, [])


  useEffect(() => {
    if (signedIn?.uid) {
      getUserProfileByUID(signedIn.uid, dispatchSignedIn)
      setIsCompletedAssessment(signedIn.isCompletedTest)
    }
  }, [signedIn?.uid, signedIn?.isCompletedTest])

  return (
    <NavigationContainer>
      {user != null ? (
        <PrivateStack isCompletedAssessment={isCompletedAssessment} />
      ) : (
        <PublicStack />
      )}
    </NavigationContainer>
  )
}

const App = () => {
  const toast = useToast()
  useEffect(() => {
    try {
      checkNotificationPermissions(toast)
      scheduleDailyNotification(toast)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const { i18n } = useTranslation()
  return (
    <SignInContextProvider>
      <I18nextProvider i18n={i18n}>
        <NativeBaseProvider>
          <AppNavigator />
        </NativeBaseProvider>
      </I18nextProvider>
    </SignInContextProvider>
  )
}

export default App
