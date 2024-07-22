// src/components/Header/Header.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/Cloud_Runner_Logo.png";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: black 1px solid; /* 테두리 추가 */
`;

const Logo = styled(Link)`
  img {
    height: 90px;
    width: 110px;
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  ul li {
    margin-left: 100px;
    margin-right: 100px;
    font-size: 21px;
    position: relative; /* 드롭다운을 위한 상대 위치 설정 */
    cursor: pointer; /* 커서를 포인터로 변경 */
  }

  ul li a,
  ul li span {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    position: relative; /* ::after 요소를 위한 상대 위치 설정 */
  }

  ul li:not(.login) a:hover,
  ul li:not(.login) span:hover {
    color: #60dafb;
  }

  ul li:not(.login) a::after,
  ul li:not(.login) span::after {
    content: "";
    position: absolute;
    bottom: -5px; /* 하단 바를 약간 아래로 위치 */
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 4px;
    background: #f1c40f;
    transition: all 0.3s ease-out;
  }

  ul li:not(.login) a:hover::after,
  ul li:not(.login) span:hover::after {
    width: 100%;
  }

  .dropdown {
    display: none;
    position: absolute;
    top: 110%;
    left: 0;
    background-color: #fff;
    border: 1px solid #ddd;
    min-width: 200px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }

  ul li:hover .dropdown {
    display: block;
  }

  .dropdown a {
    padding: 10px 20px;
    display: block;
    color: #333;
    text-decoration: none;
    text-align: center;
  }

  .dropdown a:hover {
    background-color: #f1f1f1;
  }

  .login {
    margin-left: 20px; /* 좌측 마진을 줄여서 간격 조정 */
    margin-right: 20px; /* 우측 마진을 줄여서 간격 조정 */
  }

  .login-button {
    font-size: 16px; /* 작은 크기로 변경 */
    padding: 5px 15px;
    color: #fff;
    background-color: #4285f4;
    border: none;
    border-radius: 5px;
    text-decoration: none;
  }

  .login-button:hover {
    background-color: #357ae8; /* 호버 효과 */
  }
`;

const Title = styled.h1`
  margin: 0;
  font-size: 24px;
`;

const Subtitle = styled.h2`
  margin: 0;
  font-size: 18px;
  color: #666;
`;

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <HeaderContainer>
      <Logo to="/">
        <img src={logo} alt="logo" />
      </Logo>
      <Nav>
        <ul>
          <li
            onMouseEnter={handleDropdownToggle}
            onMouseLeave={handleDropdownToggle}
          >
            <span>직관 매칭</span>
            <div className="dropdown">
              <Link to="/matching">티켓팅 전</Link>
              <Link to="/match/after">티켓팅 후</Link>
              <Link to="/match/recruit">모집하기</Link>
            </div>
          </li>
          <li>
            <span>굿즈 장터</span>
            <div className="dropdown">
              <Link to="/market/sell">판매하기</Link>
              <Link to="/market/buy">구입하기</Link>
            </div>
          </li>
          <li>
            <span>게시판</span>
            <div className="dropdown">
              <Link to="/board/general">자유게시판</Link>
              <Link to="/board/tips">꿀팁게시판</Link>
              <Link to="/board/food">맛집게시판</Link>
            </div>
          </li>
          <li>
            <span>마이페이지</span>
            <div className="dropdown">
              <Link to="/mypage/profile">내 정보</Link>
            </div>
          </li>
          <li className="login">
            <Link to="/loginpage" className="login-button">
              로그인
            </Link>
          </li>
        </ul>
      </Nav>
      <div>
        <Title>{title}</Title>
        {subtitle && <Subtitle>{subtitle}</Subtitle>}
      </div>
    </HeaderContainer>
  );
};

export default Header;