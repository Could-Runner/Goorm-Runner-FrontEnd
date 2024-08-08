import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Kakaologin from "../../assets/kakao_login_large_wide.png";
import AuthContext from "../../pages/LoginPage/AuthContext";
import axios from "axios";

const Container = styled.div`
  margin-top: 100px;
  padding: 20px;
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #dadada;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Message = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 8px;
  padding: 5px 39px 5px 11px;
  border: 1px solid #dadada;
  background: #fff;
  box-sizing: border-box;
`;

const Button = styled.button<{ disabled?: boolean }>`
  font-size: 18.5px;
  font-weight: 500;
  line-height: 49px;
  width: 90%;
  height: 54px;
  margin: 1px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 7px;
  background-color: #03c75a;

  &:hover {
    filter: brightness(0.9);
  }

  ${({ disabled }) =>
    disabled &&
    `
    background-color: #efefef;
    cursor: not-allowed;
    &:hover {
      background-color: #efefef;
    }
  `}
`;

const KakaoButton = styled.img`
  width: 90%;

  &:hover {
    filter: brightness(0.9);
    border-radius: 7px;
    cursor: pointer;
  }
`;

const SignUpLink = styled.div`
  margin-top: 30px;
  font-size: 14px;
  color: #666;

  a {
    color: #03c75a;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const RememberMeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  font-size: 14px;
`;

const FindLink = styled.a`
  font-size: 14px;
  color: #03c75a;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const LoginPage: React.FC = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const savedId = localStorage.getItem("rememberedId");
    if (savedId) {
      setId(savedId);
      setRememberMe(true);
    }
  }, []);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleRememberMeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRememberMe(e.target.checked);
    if (!e.target.checked) {
      localStorage.removeItem("rememberedId");
    }
  };

  const isDisabled = !id || !password;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem("rememberedId", id);
    }

    try {
      const response = await axios.post(
        "http://api.baseball-route.site:8080/api/auth/login",
        {
          loginId: id,
          password: password,
        }
      );

      // 로그인 성공 시
      if (response.status === 200) {
        login(id); // 인증 컨텍스트에 로그인 정보 저장
        navigate("/"); // 홈 페이지로 이동
      } else {
        alert("로그인에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      alert(
        "아이디 또는 비밀번호를 잘못 입력했습니다. 입력하신 내용을 다시 확인해주세요."
      );
    }
  };

  const handleKakaoLogin = () => {
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code";
  };

  return (
    <Container>
      <Message>계정으로 로그인하기</Message>
      <form onSubmit={handleSubmit}>
        <Input
          id="id"
          name="id"
          placeholder="아이디를 입력해주세요"
          value={id}
          onChange={handleIdChange}
        />
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={handlePasswordChange}
        />
        <RememberMeContainer>
          <div>
            <input
              type="checkbox"
              id="rememberMe"
              checked={rememberMe}
              onChange={handleRememberMeChange}
            />
            <label htmlFor="rememberMe">ID 기억하기</label>
          </div>
          <FindLink href="/findaccount">ID/PW 찾기</FindLink>
        </RememberMeContainer>
        <Button type="submit" disabled={isDisabled}>
          로그인
        </Button>
      </form>
      <KakaoButton
        src={Kakaologin}
        alt="카카오 로그인"
        onClick={handleKakaoLogin}
      />
      <SignUpLink>
        아직 회원이 아니신가요? <a href="/joinpage">회원가입</a>
      </SignUpLink>
    </Container>
  );
};

export default LoginPage;
