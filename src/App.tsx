import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import logo from "./assets/Cloud_Runner_Logo.png";
import LoginPage from "./pages/LoginPage/LoginPage";
import JoinPage from "./pages/JoinPage/JoinPage";
import JoinCompletePage from "./pages/JoinPage/JoinCompletePage"; // 추가된 부분
import Match from "./pages/MatchingPage/matchingPage";
import Market from "./pages/MarketPage/MarketPage";
import Board from "./pages/BoardPage/BoardPage";
import MatchingDetail from "./pages/MatchingPage/matchingDetail";
// import MyPage from "./pages/MyPage/MyPage";
import Header from "./components/Header/Header";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header title="" subtitle="" />
        <Routes>
          <Route path="/matching" element={<Match />} />
          <Route path="/matching/detail" element={<MatchingDetail />} />
          <Route path="/market" element={<Market />} />
          <Route path="/board/general" element={<Board />} />
          {/* <Route path="/mypage" element={<MyPage />} /> */}
          <Route path="/loginpage" element={<LoginPage />} />
          <Route path="/joinpage" element={<JoinPage />} />
          <Route path="/joincomplete" element={<JoinCompletePage />} />{" "}
          {/* 추가된 부분 */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
