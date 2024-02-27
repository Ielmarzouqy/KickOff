import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AllMatches from './screen/AllMatches';
import Background from './screen/Background';
import TeamScreen from './screen/TeamScreen';
// import PlayerScreen from './screen/PlayerScreen';
import AllPlayers from './screen/AllPlayers';
import PlayerDetails from './screen/PlayerDetails';


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
          <Stack.Screen
          name="TeamScreen"
          component={TeamScreen}
          options={{ title: 'TeamScreen' }}
        />

         <Stack.Screen
          name="PlayerDetails"
          component={PlayerDetails}
          options={{ title: 'Detail' }}
        />
        {/* <Stack.Screen
        name='PlayerScreen'
        component = {PlayerScreen}
        options={{title:'PlayerScreen'}}
        /> */}

              <Stack.Screen
        name='AllPlayers'
        component = {AllPlayers}
        options={{title:'AllPlayers'}}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
