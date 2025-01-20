import React from "react";
import { Navigate } from "react-router";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const auth = useSelector((state) => state.auth);

  if (!auth.isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
