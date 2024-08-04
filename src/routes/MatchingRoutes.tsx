import React from "react";
import { RouteObject } from "react-router-dom";
import Match from "../pages/MatchingPage/MatchingPage";
import MatchingDetail from "../pages/MatchingPage/MatchingDetail";
import MatchingWrite from "../pages/MatchingPage/MatchingWrite";

const matchingRoutes: RouteObject[] = [
    { 
        path: "/matching", 
        element: <Match />,
        children:[
            {
                path: "recruit",
                element: <MatchingWrite />
            },
            {
                path: ":id",
                element: <MatchingDetail />
            }
        ]
    }
];

export default matchingRoutes;