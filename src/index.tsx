import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { AuthProvider } from "./pages/LoginPage/AuthContext";

import matchingRoutes from "./routes/MatchingRoutes";
import boardRoutes from "./routes/BoardRoutes";
import Mainpage from "./pages/mainpage/mainpage";
import MarketPageRoutes from "./routes/MarketPageRoutes";
import LoginPageRoutes from "./routes/LoginPageRoutes";
import JoinPageRoutes from "./routes/JoinPageRoutes";
import MyPageRoutes from "./routes/MyPageRoutes";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Mainpage /> },
      ...matchingRoutes,
      ...boardRoutes,
      ...MarketPageRoutes,
      ...JoinPageRoutes,
      ...LoginPageRoutes,
      ...MyPageRoutes,
    ],
  },
]);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

reportWebVitals();
