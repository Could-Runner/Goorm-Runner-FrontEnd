import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  margin-top: 100px;
  margin-bottom: 100px;
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

const LoginButton = styled(Link)`
  display: block;
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  width: 100%;
  height: 49px;
  margin: 16px 0 7px;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;
  background-color: #03c75a;
  text-decoration: none;

  &:hover {
    background-color: #028a4d;
  }
`;

const JoinCompletePage: React.FC = () => {
  return (
    <Container>
      <Message>
        회원가입이 완료되었습니다. <br /> <br />
        로그인하시겠습니까?
      </Message>
      <LoginButton to="/loginpage">로그인</LoginButton>
    </Container>
  );
};

export default JoinCompletePage;
