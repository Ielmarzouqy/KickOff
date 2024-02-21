import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllMatches from './screen/AllMatches';
import Background from './screen/Background';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Home"
          component={Background}
          options={{ title: 'Welcome' }}
        /> */}
        <Stack.Screen
          name="AllMatches"
          component={AllMatches}
          options={{ title: 'All Matches' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
