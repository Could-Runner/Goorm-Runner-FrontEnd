import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Mainpage from "./pages/mainpage/mainpage";
import logo from "./assets/Cloud_Runner_Logo.png";
import LoginPage from "./pages/LoginPage/LoginPage";
import Match from "./pages/MatchPage/MatchPage";
import Market from "./pages/MarketPage/MarketPage";
import MatchingPage from "./pages/MatchingPage/matchingPage";
import MatchingDetail from "./pages/MatchingPage/matchingDetail";
// import Board from "./pages/BoardPage/BoardPage";
// import MyPage from "./pages/MyPage/MyPage";
import Header from "./components/Header/Header"

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/store" element={<Market />} />
          <Route path="/matching" element={<MatchingPage />} />
          <Route path="/matching/details" element={<MatchingDetail />} />
        </Routes>
      </div>
    </Router>
    
  );
};

export default App;
