import React from "react";
import { RouteObject } from "react-router-dom";
import Match from "../pages/MatchingPage/MatchingPage";
import MatchingDetail from "../pages/MatchingPage/MatchingDetail";
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
        path: ":recruitmentId",
        element: <MatchingDetail />,
      },
    ],
  },
];

export default matchingRoutes;
