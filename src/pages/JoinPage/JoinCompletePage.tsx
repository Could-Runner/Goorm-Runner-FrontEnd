import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;
  margin-bottom: 100px;
  padding: 20px;
  padding-bottom: 35px;
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
  display: inline-block;
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
  text-decoration: none;

  &:hover {
    filter: brightness(0.9);
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
