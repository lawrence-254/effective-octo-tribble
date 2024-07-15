import React, { createContext, ReactNode, useState } from 'react';
import axios from 'axios'
import {BASE_URL} from '../library/app'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface AuthContextType {
  value: string;
  isAuthenticated: boolean;
  register: (username: string, email: string, password: string, confirm_password: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authValue, setAuthValue] = useState('just Test Value');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.error('Server responded with error:', error.response.data);
        throw new Error(`Operation failed: ${error.response.data.message || error.response.statusText}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        throw new Error('No response from server. Please check your connection.');
      } else {
        console.error('Error setting up request:', error.message);
        throw new Error('An error occurred while setting up the request.');
      }
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred');
    }
  };

  const register = async (username: string, email: string, password: string, confirm_password: string) => {
    try {
      console.log(`Registering user: ${username}`);
      const res = await axios.post(`${BASE_URL}/register`, {
        username, email, password, confirm_password
      });

      console.log(`Response from server:`, res.data);
      setAuthValue(`Registered ${username}`);
      return res.data;
    } catch (error) {
      console.error('Error while registering', handleAxiosError(error));
      throw error;
    }
  };

const login = async (username: string, password: string) => {
  try {
    console.log(`Attempting login for user: ${username}`);

    const response = await axios.post(`${BASE_URL}/login`, { username, password });

    console.log('Login response:', response.data);

    if (response.data && response.data.access_token) {
      await AsyncStorage.setItem('accessToken', response.data.access_token);

      if (response.data.refresh_token) {
        await AsyncStorage.setItem('refreshToken', response.data.refresh_token);
      }

      // Store user information
      await AsyncStorage.setItem('userId', response.data.user_id.toString());
      await AsyncStorage.setItem('username', username);

      // Update authentication state
      setAuthValue(`Logged in as ${username}`);
      setIsAuthenticated(true);

      // Return user data (excluding sensitive information like tokens)
      return {
        userId: response.data.user_id,
        username: username,
        // Add any other non-sensitive user data here
      };
    } else {
      throw new Error('Login failed: No access token received');
    }
  } catch (error) {
    console.error('Login failed', handleAxiosError(error));
    setIsAuthenticated(false);
    setAuthValue(null);
    throw error;
  }
};

  const logout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {});
      setAuthValue('');
      setIsAuthenticated(false);
    } catch (error) {
      handleAxiosError(error);
    }
  };

  const contextValue: AuthContextType = {
    value: authValue,
    isAuthenticated,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};