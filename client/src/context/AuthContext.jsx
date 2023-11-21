import React, { createContext, useContext } from 'react';
import useStore from 'state/index.js';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const isAuth = useStore((state) => state.token);
  return <AuthContext.Provider value={{ isAuth }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  return useContext(AuthContext);
}
