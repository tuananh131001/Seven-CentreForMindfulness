import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AssessmentView } from "./src/pages/AssessmentView";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from "native-base";
import { store } from './app/store'
import { Provider } from 'react-redux'

const Stack = createNativeStackNavigator();
const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="AssessmentView"
        component={AssessmentView}
      />
    </Stack.Navigator>
    
  </NavigationContainer>
);

const App = () => {
  return (
    <Provider store={store}>    
      <NativeBaseProvider>
        <AppNavigator />
      </NativeBaseProvider>
    </Provider>

  );
};

export default App;
