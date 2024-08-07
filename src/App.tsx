import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
// import LoginPage from "./pages/LoginPage/LoginPage";
// import { AuthProvider } from "./pages/LoginPage/AuthContext";
// import FindAccount from "./pages/LoginPage/FindAccount";
// import JoinPage from "./pages/JoinPage/JoinPage";
// import JoinCompletePage from "./pages/JoinPage/JoinCompletePage";
// import JoinSelectPage from "./pages/JoinPage/JoinSelectPage";
// import Match from "./pages/MatchingPage/MatchingPage";
// import MarketSell from "./pages/MarketPage/SellPage";
// import MarketBuy from "./pages/MarketPage/BuyPage";
// import MarketDetail from "./pages/MarketPage/DetailPage";
// import MarketEdit from "./pages/MarketPage/EditPage";
// import GeneralBoard from "./pages/BoardPage/GeneralBoard";
// import TipBoard from "./pages/BoardPage/TipBoard";
// import MyPage from "./pages/MyPage/MyPage";
// import MatchingDetail from "./pages/MatchingPage/MatchingDetail";
// import Profile from "./pages/MyPage/Profile";
import Header from "./components/Header/Header";
// import FoodDetail from "./pages/BoardPage/BoardDetail/FoodDetail";
// import Mainpage from "./pages/mainpage/mainpage";
// import GeneralDetail from "./pages/BoardPage/BoardDetail/GeneralDetail";
// import TipDetail from "./pages/BoardPage/BoardDetail/TipDetail";
// import PostWriter from "./pages/BoardPage/PostWriter";
// import FoodBoard from "./pages/BoardPage/FoodBoard";
// import TipsEditor from "./pages/BoardPage/BoardEdit/TipsEditor";
// import GeneralEditor from "./pages/BoardPage/BoardEdit/GeneralEditor";
// import FoodEditor from "./pages/BoardPage/BoardEdit/FoodEditor";
// import MatchingWrite from "./pages/MatchingPage/MatchingWrite";

const App: React.FC = () => {
  return (
    <div>
      <Header title="" subtitle="" />
      <Outlet />
    </div>
  );
};
export default App;
