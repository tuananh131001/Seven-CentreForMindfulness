import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeBaseProvider } from 'native-base'
import { store } from './app/store'
import { HomeView } from './src/pages/HomeView'
import { LoginPage } from './src/pages/LoginPage'
import { Ionicons } from '@expo/vector-icons'

import { Provider } from 'react-redux'
import { I18nextProvider, useTranslation } from 'react-i18next'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { RegisterPage } from './src/pages/RegisterPage'
import { ProfilePage } from './src/pages/ProfilePage'
import { AudioView } from './src/pages/AudioView'

import { AssessmentView } from './src/pages/AssessmentView'
import { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

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
  </Tab.Navigator>
)

const PrivateStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="AssessmentView" component={AssessmentView} />
    <Stack.Screen name="HomeStack" component={HomeStack} />
    <Stack.Screen name="ProfilePage" component={ProfilePage} />
    <Stack.Screen name="AudioView" component={AudioView} />
  </Stack.Navigator>
)

const AppNavigator = () => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)

  const handleUser = (user) => {
    setUser(user)
    if (initializing) setInitializing(false)
  }

  useEffect(() => {
    onAuthStateChanged(getAuth(), handleUser)
  }, [])

  if (initializing) return null

  return <NavigationContainer>{user ? <PrivateStack /> : <PublicStack />}</NavigationContainer>
}

const App = () => {
  const { i18n } = useTranslation()

  return (
    <Provider store={store}>
      <I18nextProvider i18n={i18n}>
        <NativeBaseProvider>
          <AppNavigator />
        </NativeBaseProvider>
      </I18nextProvider>
    </Provider>
  )
}

export default App
