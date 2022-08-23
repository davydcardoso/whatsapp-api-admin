import React from "react";

import { AuthRoutes } from "./AuthRoutes";
import { PublicRoutes } from "./PublicRoutes";

export const Routes: React.FC = () => {
  const user = null;

  return !user ? <PublicRoutes /> : <AuthRoutes />;
};
