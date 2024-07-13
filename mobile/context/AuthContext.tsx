import React, { createContext, ReactNode } from 'react';


export const AuthContext = createContext<string | undefined>(undefined);


interface AuthProviderProps {
  children: ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  return (
    <AuthContext.Provider value="just Test Value">
      {children}
    </AuthContext.Provider>
  );
};
