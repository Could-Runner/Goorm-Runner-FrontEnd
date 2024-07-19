import React, { useState } from "react";
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
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 40px;
  margin: 0 0 8px;
  padding: 5px 39px 5px 11px;
  border: solid 1px #dadada;
  background: #fff;
  box-sizing: border-box;
`;

const Button = styled.button`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  display: block;
  width: 100%;
  height: 49px;
  margin: 16px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;
  background-color: #03c75a;
  ${({ disabled }) =>
    disabled &&
    `
    background-color: #efefef;
    cursor: not-allowed;
  `}
`;

const LoginPage: React.FC = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const isDisabled = !id || !password;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 로그인 로직을 추가하세요
    console.log("ID:", id);
    console.log("Password:", password);
  };

  return (
    <Container>
      <Message>Welcome! 로그인해주세요!</Message>
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
        <Button type="submit" disabled={isDisabled}>
          로그인
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
