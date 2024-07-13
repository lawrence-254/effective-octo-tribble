import React, { createContext, ReactNode, useState } from 'react';
import axios from 'axios'
import {BASE_URL} from '../library/app'

interface AuthContextType {
  value: string;
  register: (username: string, email: string, password: string) => void;
  login: (username: string, password: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authValue, setAuthValue] = useState('just Test Value');

  const register = (username: string, email: string, password: string) => {
      axios.post(`${BASE_URL}/register`, {
          username, email, password
          }).then(res => {
              let resData = res.data
              console.log(`Registering user: ${resData}`);
              setAuthValue(`Registered ${username}`);
          }).catch(e =>{
              console.log(`Error while registering ${e}`)
          });
  };
  const login = (email: string, password: string) => {
      console.log(`Logging in user with username: ${username}`);      // Implement your login logic here
      setAuthValue(`Logged in with ${username}`);
    };

  const contextValue: AuthContextType = {
    value: authValue,
    register,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
