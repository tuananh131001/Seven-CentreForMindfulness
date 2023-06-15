import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AssessmentView } from "./src/pages/AssessmentView";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NativeBaseProvider } from "native-base";

const Stack = createNativeStackNavigator();
const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name="Examples"
        component={AssessmentView}
        options={{
          title: "",
        }}
      />
    </Stack.Navigator>
    
  </NavigationContainer>
);

const App = () => {
  return (
    <NativeBaseProvider>
      <AppNavigator />
    </NativeBaseProvider>
  );
};

// eslint-disable-next-line import/no-default-export
export default App;
