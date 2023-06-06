import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Home from './Home';
import SignupForm from './SignupForm';
import LoginScreen from './LoginScreen';
import Contact from './Rechercher';
import ProfesseurScreen from './ProfesseurScreen';
import { useNavigation } from '@react-navigation/native';


const DrawerNav = createDrawerNavigator();

const Drawer = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const navigation = useNavigation();

  const handleLogout = () => {
    setAuthenticated(false);
    setToken(null);
    navigation.navigate('Login', { screen: 'Login' });
  };
  
  const handleLoginDrawer = (token) => {
    setAuthenticated(true);
    setToken(token);
  };
  


  return (
    <DrawerNav.Navigator>
      <DrawerNav.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      {authenticated ? (
        <>
          <DrawerNav.Screen
            name="Recherche"
            component={Contact}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="md-search" size={size} color={color} />
              ),
            }}
          />
          <DrawerNav.Screen
            name="Professor"
            component={ProfesseurScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <MaterialIcons name="person" size={size} color={color} />
              ),
            }}
            initialParams={{ setToken: setToken }}
          />
          <DrawerNav.Screen
  name="Logout"
  component={LoginScreen}
  options={{
    drawerIcon: ({ color, size }) => (
      <Ionicons name="exit" size={size} color={color} />
    ),
  }}
  listeners={{
    tabPress: (e) => {
      e.preventDefault();
      handleLogout();
    },
  }}
/>
        </>
      ) : (
        <>
          <DrawerNav.Screen
            name="Inscription"
            component={SignupForm}
            options={{
              drawerIcon: ({ color, size }) => (
                <Ionicons name="md-person-add" size={size} color={color} />
              ),
            }}
          />
          <DrawerNav.Screen
            name="Login"
            component={LoginScreen}
            options={{
              drawerIcon: ({ color, size }) => (
                <MaterialIcons name="person" size={size} color={color} />
              ),
            }}
            initialParams={{ setToken: setToken, setAuthenticated: setAuthenticated }}
          />
        </>
      )}
    </DrawerNav.Navigator>
  );
};

export default Drawer;
