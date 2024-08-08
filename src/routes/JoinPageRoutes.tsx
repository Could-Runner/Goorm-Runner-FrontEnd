import React from "react";
import { RouteObject } from "react-router-dom";
import JoinPage from "../pages/JoinPage/JoinPage";
import JoinCompletePage from "../pages/JoinPage/JoinCompletePage";
import JoinSelectPage from "../pages/JoinPage/JoinSelectPage";

const JoinPageRoutes: RouteObject[] = [
  {
    path: "/joinpage",
    element: <JoinPage />,
  },
  {
    path: "/joincomplete",
    element: <JoinCompletePage />,
  },
  {
    path: "/joinselectpage",
    element: <JoinSelectPage />,
  },
];

export default JoinPageRoutes;
