import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import Match from "./pages/MatchingPage/matchingPage";
import Market from "./pages/MarketPage/MarketPage";
import GeneralBoard from "./pages/BoardPage/GeneralBoard";
import TipBoard from "./pages/BoardPage/TipBoard";
import MatchingDetail from "./pages/MatchingPage/matchingDetail";
// import MyPage from "./pages/MyPage/MyPage";
import Header from "./components/Header/Header";
import FoodDetail from "./pages/BoardPage/BoardDetail/FoodDetail";
import Mainpage from "./pages/mainpage/mainpage";
import GeneralDetail from "./pages/BoardPage/BoardDetail/GeneralDetail";
import TipDetail from "./pages/BoardPage/BoardDetail/TipDetail";
import PostWriter from "./pages/BoardPage/PostWriter";
import FoodBoard from "./pages/BoardPage/FoodBoard";


const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header title="" subtitle="" />
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/matching" element={<Match />} />
          <Route path="/matching/detail" element={<MatchingDetail />} />
          <Route path="/market" element={<Market />} />
          <Route path="/board/general" element={<GeneralBoard />} />
          <Route path="/board/general/:id" element={<GeneralDetail />} />
          <Route path="/board/tips" element={<TipBoard />} />
          <Route path="/board/tips/:id" element={<TipDetail />} />
          <Route path="/board/food" element={<FoodBoard />} />
          <Route path="/board/food/:id" element={<FoodDetail />} />
          <Route path="/postform" element={<PostWriter />} />
          {/* <Route path="/mypage" element={<MyPage />} /> */}
          <Route path="/loginpage" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
