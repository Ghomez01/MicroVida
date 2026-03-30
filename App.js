import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InicioScreen from './InicioScreen.js';
import DevsScreen from './DevsScreen.js';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio"
        screenOptions={{
    headerStyle: {
      backgroundColor: '#0b3528', 
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  }}
      >
        
        <Stack.Screen name="Inicio" component={InicioScreen} />
        {/* <Stack.Screen name="Desenvolvedores" component={DevsScreen} /> */}

      </Stack.Navigator>
    </NavigationContainer>
  );
}