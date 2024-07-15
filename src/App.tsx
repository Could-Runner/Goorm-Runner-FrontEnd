import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src="img/Cloud_Runner_Logo.png" alt="logo" />
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/match">직관 매칭</Link>
          </li>
          <li>
            <Link to="/store">굿즈 장터</Link>
          </li>
          <li>
            <Link to="/board">게시판</Link>
          </li>
          <li>
            <Link to="/mypage">마이페이지</Link>
          </li>
        </ul>
      </nav>
      <div>
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
      </div>
    </header>
  );
};

const Match: React.FC = () => {
  return <div>직관 매칭</div>;
};

const Store: React.FC = () => {
  return <div>굿즈 장터</div>;
};

const Board: React.FC = () => {
  return <div>게시판</div>;
};

const MyPage: React.FC = () => {
  return <div>마이페이지</div>;
};

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header title="" subtitle="" />
        <Routes>
          <Route path="/Match" element={<Match />} />
          <Route path="/Store" element={<Store />} />
          <Route path="/Board" element={<Board />} />
          <Route path="/MyPage" element={<MyPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
