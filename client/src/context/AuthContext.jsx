import React, { createContext, useContext } from 'react';
import useUserStore from 'state/index.js';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const { token } = useUserStore();
  return <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
