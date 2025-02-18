// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {

  const token = useSelector((state) => state.auth.token); // Get token from Redux

  // If there is no token (user is not authenticated), redirect to login
  if (!token) {
    return <Navigate to="/admin/login" replace />;
  }

  // If there is a token, render the children (protected route content)
  return children;
};

export default ProtectedRoute;
