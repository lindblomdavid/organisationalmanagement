// components/ProtectedRoute/ProtectedRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ isLoggedIn, redirectTo, ...props }) => {
  if (isLoggedIn) {
    return <Route {...props} />;
  } else {
    return <Navigate to={redirectTo} />;
  }
};

export default ProtectedRoute;
