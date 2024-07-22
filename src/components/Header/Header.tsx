import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import main_logo from "../../assets/Cloud_Runner_Logo.png";

const Header: React.FC = () => {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src={main_logo} alt="logo" />
      </Link>
      <nav>
        <ul>
          <li>
            <Link to="/matching">직관 매칭</Link>
          </li>
          <li>
            <Link to="/store">굿즈 장터</Link>
          </li>
          <li>
            <Link to="/board">게시판</Link>
          </li>
        </ul>
      </nav>
      <Link to="/mypage" className="mypage">마이페이지</Link>
    </header>
  );
};

export default Header;