// src/components/Header/Header.tsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/Cloud_Runner_Logo.png";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 10px;
  margin-right: 50px;
  margin-left: 0px;
`;

const LoginButton = styled(Link)`
  font-size: 16px;
  padding: 0px 10px 0px 20px;
  color: black;
  border: none;
  text-decoration: none;
  font-weight: bold;
`;

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: black 1px solid;
  width: 100%;
`;

const Logo = styled(Link)`
  img {
    height: 70px;
    width: 90px;
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
    position: relative;
    cursor: pointer;
  }

  ul li a,
  ul li span {
    text-decoration: none;
    color: #333;
    font-weight: bold;
    position: relative;
  }

  ul li a:hover {
    color: #60dafb;
  }

  ul li a::after,
  ul li span::after {
    content: "";
    position: absolute;
    bottom: -5px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 4px;
    background: #f1c40f;
    transition: all 0.3s ease-out;
  }

  ul li a:hover::after,
  ul li span:hover::after {
    width: 100%;
  }

  .dropdown {
    display: none;
    position: absolute;
    top: 110%;
    left: 0;
    background-color: #fff;
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
    <PageContainer>
      <ButtonContainer>
        <LoginButton to="/loginpage">로그인</LoginButton>
        <LoginButton to="/joinselectpage">회원가입</LoginButton>
      </ButtonContainer>

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
                <Link to="/matching">모집글 조회</Link>
                <Link to="/matching/recruit">모집하기</Link>
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
          </ul>
        </Nav>
        <div>
          <Title>{title}</Title>
          {subtitle && <Subtitle>{subtitle}</Subtitle>}
        </div>
      </HeaderContainer>
    </PageContainer>
  );
};

export default Header;
