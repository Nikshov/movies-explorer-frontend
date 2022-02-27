import { Navigate } from 'react-router-dom';
import React from 'react';

export function Auth({ children, redirectTo, loggedIn }) {
  return loggedIn ? children : <Navigate to={redirectTo} />;
}
