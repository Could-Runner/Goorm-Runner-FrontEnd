import React from "react";
import { RouteObject } from "react-router-dom";
import BuyPage from "../pages/MarketPage/BuyPage";
import DetailPage from "../pages/MarketPage/DetailPage";
import EditPage from "../pages/MarketPage/EditPage";
import SellPage from "../pages/MarketPage/SellPage";

const MarketPageRoutes: RouteObject[] = [
  {
    path: "market",
    children: [
      {
        path: "buy", //경로 지정시
        element: <BuyPage />,
      },
      {
        path: "buy/:id",
        element: <DetailPage />,
      },
      {
        path: "sell",
        element: <SellPage />,
      },
      {
        path: "edit/:id",
        element: <EditPage />,
      },
    ],
  },
];

export default MarketPageRoutes;
