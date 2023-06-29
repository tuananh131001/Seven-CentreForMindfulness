import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { AssessmentView } from './src/pages/AssessmentView'
import { LoginPage } from './src/pages/LoginPage'
import { RegisterPage } from './src/pages/RegisterPage'

import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeBaseProvider } from 'native-base'
import { store } from './app/store'
import { Provider } from 'react-redux'
import { HomeView } from './src/pages/HomeView'
import { AudioView } from './src/pages/AudioView'

const Stack = createNativeStackNavigator()
const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
      />
      <Stack.Screen
        name="RegisterPage"
        component={RegisterPage}
      />
    </Stack.Navigator>
  </NavigationContainer>
)

const App = () => {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <AppNavigator />
      </NativeBaseProvider>
    </Provider>
  )
}

export default App
