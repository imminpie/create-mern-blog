import React from 'react';
import { useAuthContext } from 'context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { token } = useAuthContext();

  if (!token) {
    return <Navigate to='/login' replace />;
  }

  return children;
}
