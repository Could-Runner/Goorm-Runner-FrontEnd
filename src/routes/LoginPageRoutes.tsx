import React from "react";
import { RouteObject } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";

const LoginPageRoutes: RouteObject[] = [
  {
    path: "loginpage",
    element: <LoginPage />,
  }
];

export default LoginPageRoutes;
