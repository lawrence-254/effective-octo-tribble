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
        } catch (e) {
          console.log('Error fetching CSRF token', e);
        }
      };
      fetchCsrfToken();
    }, []);

    const register = async (username: string, email: string, password: string, confirm_password: string) => {
        if (!csrfToken) {
            console.log('CSRF token is not set.');
            return;
        }

        try {
            console.log(`Registering user: ${username}`);
            const res = await axios.post(`${BASE_URL}/v1/register`, {
                username, email, password, confirm_password
            }, {
                headers: {
                    'X-CSRFToken': csrfToken
                }
            });

            console.log(`Response from server:`, res.data);
            setAuthValue(`Registered ${username}`);
        } catch (e) {
            console.log('Error while registering', e.response ? e.response.data : e.message);
            throw e;
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
