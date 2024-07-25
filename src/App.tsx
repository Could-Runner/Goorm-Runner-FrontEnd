import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import FindAccount from "./pages/LoginPage/FindAccount";
import JoinPage from "./pages/JoinPage/JoinPage";
import JoinCompletePage from "./pages/JoinPage/JoinCompletePage";
import JoinSelectPage from "./pages/JoinPage/JoinSelectPage";
import Match from "./pages/MatchingPage/matchingPage";
import Market from "./pages/MarketPage/MarketPage";
import FoodBoard from "./pages/BoardPage/FoodBoard";
import GeneralBoard from "./pages/BoardPage/GeneralBoard";
import TipBoard from "./pages/BoardPage/TipBoard";

import MatchingDetail from "./pages/MatchingPage/matchingDetail";
// import MyPage from "./pages/MyPage/MyPage";
import Header from "./components/Header/Header";
import PostWriter from "./pages/BoardPage/PostWriter";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header title="" subtitle="" />
        <Routes>
          <Route path="/matching" element={<Match />} />
          <Route path="/matching/detail" element={<MatchingDetail />} />
          <Route path="/market" element={<Market />} />
          <Route path="/board/general" element={<GeneralBoard />} />
          <Route path="/board/food" element={<FoodBoard />} />
          <Route path="/postform" element={<PostWriter />} />
          <Route path="/board/tips" element={<TipBoard />} />
          {/* <Route path="/mypage" element={<MyPage />} /> */}
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/findaccount" element={<FindAccount />} />
          <Route path="/joinpage" element={<JoinPage />} />
          <Route path="/joincomplete" element={<JoinCompletePage />} />{" "}
          <Route path="/joinselectpage" element={<JoinSelectPage />} />
          {/* 추가된 부분 */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
