import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import matchingRoutes from './routes/MatchingRoutes';
import boardRoutes from './routes/BoardRoutes';
import Mainpage from "./pages/mainpage/mainpage";

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
    element: <App />, // App 컴포넌트를 루트로 설정
    children: [
      { path: "/", element: <Mainpage /> },
      ...matchingRoutes,
      ...boardRoutes
    ]
  }
]);


root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();