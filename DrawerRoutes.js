import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import telaJogo from './telaJogo';
import InicioScreen from './InicioScreen';
import DevsScreen from './DevsScreen';

const Drawer = createDrawerNavigator();

export default function DrawerRoutes(props) {
  const params = props?.route?.params || {};

  return (
    <Drawer.Navigator   screenOptions={{
    headerShown: false,
    drawerActiveBackgroundColor: '#22c55e',
    drawerActiveTintColor: '#fff',        
    drawerInactiveTintColor: '#333',       
  }}>
      
      <Drawer.Screen 
        name="Jogo Atual" 
        component={telaJogo} 
        initialParams={params}
      />

      <Drawer.Screen 
        name="Novo Jogo" 
        component={InicioScreen} 
      />

      <Drawer.Screen 
        name="Desenvolvedores" 
        component={DevsScreen} 
      />

    </Drawer.Navigator>
  );
}