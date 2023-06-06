import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Drawer from './components/Drawer';
import LoginScreen from './components/LoginScreen';
import ProfesseurScreen from './components/ProfesseurScreen';
const Stack = createStackNavigator();

export default function App() {
  const [token, setToken] = useState(null);
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen name="Drawer" component={Drawer}   options={{ headerShown: false }} /> 
         
      </Stack.Navigator>
    </NavigationContainer>
    


  
    
  );

  

  
}





























