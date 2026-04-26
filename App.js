import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import InicioScreen from './InicioScreen';
import EscolhaScreen from './EscolhaScreen';
import EscolhaTutorial from './EscolhaTutorial';
import TutorialScreen from './tutorial';
import DrawerRoutes from './DrawerRoutes'; 

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Inicio" component={InicioScreen} />
        <Stack.Screen name="Escolha-Tutorial" component={EscolhaTutorial} />
        <Stack.Screen name="Escolha" component={EscolhaScreen} />
        <Stack.Screen name="Tutorial" component={TutorialScreen} />
        <Stack.Screen name="Jogo" component={DrawerRoutes} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}