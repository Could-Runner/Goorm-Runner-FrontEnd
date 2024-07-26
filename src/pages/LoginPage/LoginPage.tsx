import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 100px;
  padding: 20px;
  max-width: 400px; /* 최대 너비를 400px로 설정 */
  margin-left: auto; /* 가운데 정렬 */
  margin-right: auto; /* 가운데 정렬 */
  border: 1px solid #dadada; /* 시각적 구분을 위한 테두리 추가 */
  border-radius: 8px; /* 둥근 모서리 추가 */
  background-color: #fff; /* 배경색 설정 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  text-align: center; /* 텍스트 가운데 정렬 */
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
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  width: 100%;
  height: 49px;
  margin: 1px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;
  background-color: #03c75a;

  &:hover {
    background-color: #028a4d;
  }

  ${({ disabled }) =>
    disabled &&
    `
    background-color: #efefef;
    cursor: not-allowed;
    &:hover {
      background-color: #efefef; /* 호버시에도 동일한 배경색 유지 */
    }
  `}
`;

const KakaoButton = styled(Button)`
  background-color: #ffeb00;
  color: #3c1e1e;

  &:hover {
    background-color: #e8d408;
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
  margin-bottom: 20px;
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rememberMe) {
      localStorage.setItem("rememberedId", id);
    }
    // 여기서 로그인 로직을 추가하세요
    console.log("ID:", id);
    console.log("Password:", password);
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
      <KakaoButton>카카오 계정으로 로그인</KakaoButton>
      <SignUpLink>
        아직 회원이 아니신가요? <a href="/joinpage">회원가입</a>
      </SignUpLink>
    </Container>
  );
};

export default LoginPage;
