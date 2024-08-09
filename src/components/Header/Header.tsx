import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../../assets/baseballroutelogo.png";
import AuthContext from "../../pages/LoginPage/AuthContext";

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #fff;
  border-bottom: 1px solid black;
  padding: 10px;
`;

const LogoContainer = styled.div`
  flex: 0 1 12%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled(Link)`
  img {
    height: 80px;
    width: 110px;
  }
`;

const NavContainer = styled.nav`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;

  ul {
    list-style: none;
    display: flex;
    align-items: center;
    margin: 0;
    padding: 0;
  }

  ul li {
    margin: 0 100px; // 뷰포트가 작아져도 auto나 다른 방식으로 수정이 필요
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
    white-space: nowrap;
  }

  ul li a:hover,
  ul li span:hover {
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
    transition: width 0.3s ease-out;
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

const ButtonContainer = styled.div`
  flex: 0 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 50px;
  padding-right: 20px;
`;

const LoginButton = styled(Link)`
  font-size: 16px;
  padding: 0 10px;
  color: black;
  border: none;
  font-weight: bold;
  text-decoration: none;
  white-space: nowrap;
`;

const LogoutButton = styled.button`
  font-size: 16px;
  padding: 0 10px;
  color: black;
  border: none;
  font-weight: bold;
  background: none;
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    color: #60dafb;
  }
`;

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  const { isLoggedIn, username, logout } = useContext(AuthContext);

  return (
    <HeaderContainer>
      <LogoContainer>
        <Logo to="/">
          <img src={logo} alt="logo" />
        </Logo>
      </LogoContainer>
      <NavContainer>
        <ul>
          <li>
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
      </NavContainer>
      <ButtonContainer>
        {isLoggedIn ? (
          <>
            <span>{username}</span>
            <LogoutButton onClick={logout}>로그아웃</LogoutButton>
          </>
        ) : (
          <>
            <LoginButton to="/loginpage">로그인</LoginButton>
            <LoginButton to="/joinselectpage">회원가입</LoginButton>
          </>
        )}
      </ButtonContainer>
    </HeaderContainer>
  );
};

export default Header;
