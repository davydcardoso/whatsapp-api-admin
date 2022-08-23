import React from "react";
import { Routes as SwitchRoutes, Route } from "react-router-dom";

const ExampleRoutes: React.FC = () => {
  return <h1>Auth Routes</h1>;
};

export const AuthRoutes: React.FC = () => {
  return (
    <SwitchRoutes>
      <Route path="/" element={<ExampleRoutes />} />
    </SwitchRoutes>
  );
};
