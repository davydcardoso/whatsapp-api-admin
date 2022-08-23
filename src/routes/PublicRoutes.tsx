import React from "react";
import { Routes as SwitchRoutes, Route } from "react-router-dom";

import { Home } from "../pages/public/Home";
import { CreateAccount } from "../pages/public/CreateAccount";

export const PublicRoutes: React.FC = () => {
  return (
    <SwitchRoutes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<CreateAccount />} />
    </SwitchRoutes>
  );
};
