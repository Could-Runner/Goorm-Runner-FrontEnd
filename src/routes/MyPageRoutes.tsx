import React from "react";
import { RouteObject } from "react-router-dom";
import Profile from "../pages/MyPage/Profile";

const MyPageRoutes: RouteObject[] = [
  {
    path: "mypage",
    children: [
      {
        path: "profile", //경로 지정시
        element: <Profile />,
      },
    ],
  },
];

export default MyPageRoutes;
