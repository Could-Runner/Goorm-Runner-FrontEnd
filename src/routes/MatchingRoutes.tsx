import React from "react";
import { RouteObject } from "react-router-dom";
import Match from "../pages/MatchingPage/matchingPage";
import MatchingDetail from "../pages/MatchingPage/matchingDetail";
import MatchingWrite from "../pages/MatchingPage/MatchingWrite";

const matchingRoutes: RouteObject[] = [
  {
    path: "matching",
    children: [
      {
        index: true,
        element: <Match />,
      },
      {
        path: "recruit", // 경로 지정시
        element: <MatchingWrite />,
      },
      {
        path: ":id",
        element: <MatchingDetail />,
      },
    ],
  },
];

export default matchingRoutes;
