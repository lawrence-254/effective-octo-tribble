import React, { createContext, ReactNode, useState,useEffect } from 'react';
import axios from 'axios'
import {BASE_URL} from '../library/app'

interface AuthContextType {
  value: string;
  register: (username: string, email: string, password: string, confirm_password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authValue, setAuthValue] = useState('just Test Value');
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

    useEffect(() => {
      const fetchCsrfToken = async () => {
        try {
          const res = await axios.get(`${BASE_URL}/get-csrf-token`);
          setCsrfToken(res.data.csrf_token);
          console.log(res.data.csrf_token)
        } catch (e) {
          console.log('Error fetching CSRF token', e);
        }
      };
      fetchCsrfToken();
    }, []);

    const register = async (username: string, email: string, password: string, confirm_password: string) => {
        if (!csrfToken) {
            console.log('CSRF token is not set.');
            throw new Error('CSRF token is missing');
        }

        try {
            console.log(`Registering user: ${username}`);
            const res = await axios.post(`${BASE_URL}/register`, {
                username, email, password, confirm_password
            }, {
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });

            console.log(`Response from server:`, res.data);
            setAuthValue(`Registered ${username}`);
            return res.data;
        } catch (error) {
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    console.error('Server responded with error:', error.response.data);
                    throw new Error(`Registration failed: ${error.response.data.message || error.response.statusText}`);
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
        }
    };


  const login = (email: string, password: string) => {
      console.log(`Logging in user with username: ${username}`);
      setAuthValue(`Logged in with ${username}`);
    };

  const contextValue: AuthContextType = {
    value: authValue,
    register,
    login,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
