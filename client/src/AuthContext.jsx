// src/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import Amplify from '@aws-amplify/core';
import Auth from '@aws-amplify/auth';
import awsconfig from './awsconfig';

Amplify.configure(awsconfig);

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      setUser(authUser);
    } catch (error) {
      console.log('No user signed in', error);
      setUser(null);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};
