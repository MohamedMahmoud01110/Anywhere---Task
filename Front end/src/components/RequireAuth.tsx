import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import type { RootState } from "../store";

interface Props {
  children: React.ReactNode;
}

const RequireAuth: React.FC<Props> = ({ children }) => {
  const loggedIn = useSelector((s: RootState) => s.auth.loggedIn);

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RequireAuth;
