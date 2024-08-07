import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import matchingRoutes from "./routes/MatchingRoutes";
import boardRoutes from "./routes/BoardRoutes";
import Mainpage from "./pages/mainpage/mainpage";
import marketPageRoutes from "./routes/MarketPageRoutes";
import joinPageRoutes from "./routes/JoinPageRoutes";
import loginPageRoutes from "./routes/LoginPageRoutes";
import myPageRoutes from "./routes/MyPageRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Mainpage /> },
      ...matchingRoutes,
      ...boardRoutes,
      ...marketPageRoutes,
      ...joinPageRoutes,
      ...loginPageRoutes,
      ...myPageRoutes
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
