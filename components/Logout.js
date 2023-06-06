import React, { useContext, useEffect } from 'react';
import { DrawerItem } from '@react-navigation/drawer';
import { AuthContext } from './AuthContext';

const Logout = () => {
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    logout();
  }, []);

  return null;
};

export default Logout;