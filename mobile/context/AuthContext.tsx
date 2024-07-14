import React, { createContext, ReactNode, useState,useEffect } from 'react';
import axios from 'axios'
import {BASE_URL} from '../library/app'

interface AuthContextType {
  value: string;
  isAuthenticated: boolean;
  register: (username: string, email: string, password: string, confirm_password: string) => Promise<void>;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);


interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [authValue, setAuthValue] = useState('just Test Value');
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

    useEffect(() => {
      const fetchCsrfToken = async (retries = 3) => {
        try {
          const res = await axios.get(`${BASE_URL}/get-csrf-token`);
          setCsrfToken(res.data.csrf_token);
          console.log('CSRF token fetched:', res.data.csrf_token);
        } catch (e) {
          console.log('Error fetching CSRF token', e);
          if (retries > 0) {
            console.log(`Retrying... (${retries} attempts left)`);
            setTimeout(() => fetchCsrfToken(retries - 1), 1000);
          }
        } finally {
          setIsLoading(false);
        }
      };
      fetchCsrfToken();
    }, []);

    const register = async (username: string, email: string, password: string, confirm_password: string) => {
        setError(null);
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
              const errorMessage = handleAxiosError(error);
              setError(errorMessage);
              throw error;
        }
    };


  const login = async (username: string, password: string) => {
      setError(null);
      if (!csrfToken) {
          console.log('CSRF token is not set.');
          throw new Error('CSRF token is missing');
          }
      try {
          console.log(`Logging in user: ${username}`);
          const res = await axios.post(`${BASE_URL}/login`, {
          username, password
          }, {
              headers: {
                  'X-CSRFToken': csrfToken
              }
          });
      console.log(`Login response:`, res.data);
      setAuthValue(`Logged in as ${username}`);
      setIsAuthenticated(true)
      return res.data;
      } catch (error) {
          console.error('Error while registering', handleAxiosError(error));
          throw error;
      };
  const logout = async () => {
    try {
      await axios.post(`${BASE_URL}/logout`, {}, {
        headers: {
          'X-CSRFToken': csrfToken
        }
      });
      setAuthValue('');
      setIsAuthenticated(false);
    } catch (error) {
        const errorMessage = handleAxiosError(error);
        setError(errorMessage);
        throw error;
    }
  };

  const contextValue: AuthContextType = {
        value: authValue,
        isAuthenticated,
        isLoading,
        error,
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
