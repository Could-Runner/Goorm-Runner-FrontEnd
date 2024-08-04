import React from "react";
import { BrowserRouter as Router, Route, Routes, createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import FindAccount from "./pages/LoginPage/FindAccount";
import JoinPage from "./pages/JoinPage/JoinPage";
import JoinCompletePage from "./pages/JoinPage/JoinCompletePage";
import JoinSelectPage from "./pages/JoinPage/JoinSelectPage";
import Match from "./pages/MatchingPage/MatchingPage";
import MarketSell from "./pages/MarketPage/SellPage";
import MarketBuy from "./pages/MarketPage/BuyPage";
import MarketDetail from "./pages/MarketPage/DetailPage";
import MarketEdit from "./pages/MarketPage/EditPage";

import GeneralBoard from "./pages/BoardPage/GeneralBoard";
import TipBoard from "./pages/BoardPage/TipBoard";
// import MyPage from "./pages/MyPage/MyPage";
import MatchingDetail from "./pages/MatchingPage/MatchingDetail";
import Profile from "./pages/MyPage/Profile";
import Header from "./components/Header/Header";
import FoodDetail from "./pages/BoardPage/BoardDetail/FoodDetail";
import Mainpage from "./pages/mainpage/mainpage";
import GeneralDetail from "./pages/BoardPage/BoardDetail/GeneralDetail";
import TipDetail from "./pages/BoardPage/BoardDetail/TipDetail";
import PostWriter from "./pages/BoardPage/PostWriter";
import FoodBoard from "./pages/BoardPage/FoodBoard";
import TipsEditor from "./pages/BoardPage/BoardEdit/TipsEditor";
import GeneralEditor from "./pages/BoardPage/BoardEdit/GeneralEditor";
import FoodEditor from "./pages/BoardPage/BoardEdit/FoodEditor";
import MatchingWrite from "./pages/MatchingPage/MatchingWrite";


import matchingRoutes from './routes/MatchingRoutes';
import boardRoutes from './routes/BoardRoutes';

export const router = createBrowserRouter([
  { path: "/", element: <Mainpage /> },
  ...matchingRoutes,
  ...boardRoutes
]);


const App: React.FC = () => {
  return (
    <div>
      <Header title="" subtitle="" />
      <Outlet />
    </div>
      
  )
}

// const App: React.FC = () => {
//   return (
//     <Router>
//       <div className="App">
//         <Header title="" subtitle="" />
//         <Routes>
//           <Route path="/" element={<Mainpage />} />
//           <Route path="/matching" element={<Match />} />
//           <Route path="/matching/:id" element={<MatchingDetail />} />
//           <Route path="/matching/recruit" element={<MatchingWrite />} />
//           <Route path="/market/sell" element={<MarketSell />} />
//           <Route path="/market/buy" element={<MarketBuy />} />
//           <Route path="/market/buy/:id" element={<MarketDetail />} />
//           <Route path="/market/edit/:id" element={<MarketEdit />} />
//           <Route path="/board/general" element={<GeneralBoard />} />
//           <Route path="/board/general/:id" element={<GeneralDetail />} />
//           <Route path="/board/general/edit/:id" element={<GeneralEditor />} />
//           <Route path="/board/tips" element={<TipBoard />} />
//           <Route path="/board/tips/:id" element={<TipDetail />} />
//           <Route path="/board/tips/edit/:id" element={<TipsEditor />} />
//           <Route path="/board/food" element={<FoodBoard />} />
//           <Route path="/board/food/:id" element={<FoodDetail />} />
//           <Route path="/board/food/edit/:id" element={<FoodEditor />} />
//           <Route path="/postform" element={<PostWriter />} />
//           <Route path="/board/tips" element={<TipBoard />} />
//           {/* <Route path="/mypage" element={<MyPage />} /> */}
//           <Route path="/loginpage" element={<LoginPage />} />
//           <Route path="/findaccount" element={<FindAccount />} />
//           <Route path="/joinpage" element={<JoinPage />} />
//           <Route path="/joincomplete" element={<JoinCompletePage />} />{" "}
//           <Route path="/joinselectpage" element={<JoinSelectPage />} />
//           <Route path="mypage/profile" element={<Profile />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// };

export default App;
