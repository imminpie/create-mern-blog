import React from 'react';
import { useAuthContext } from 'context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { isAuth } = useAuthContext();

  if (!isAuth) {
    return <Navigate to='/login' replace />;
  }

  return children;
}
