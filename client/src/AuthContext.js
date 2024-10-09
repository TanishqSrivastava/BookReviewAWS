// src/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { Auth } from 'aws-amplify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check if user is already authenticated
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const authUser = await Auth.currentAuthenticatedUser();
      setUser(authUser);
    } catch {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, checkUser }}>
      {children}
    </AuthContext.Provider>
  );
};
