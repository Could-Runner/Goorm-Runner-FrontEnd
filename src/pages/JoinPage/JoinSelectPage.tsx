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

const Button = styled.button`
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
  border-radius: 4px;
  background-color: #03c75a;

  &:hover {
    background-color: #028a4d;
  }
`;

const KakaoButton = styled(Button)`
  background-color: #ffeb00;
  color: #3c1e1e;

  &:hover {
    background-color: #e8d408;
  }
`;

const JoinSelectPage: React.FC = () => {
  return (
    <Container>
      <Message>
        안녕하세요!
        <br />
        회원가입 할 방법을 선택해주세요
      </Message>
      <Link to="/joinpage">
        <Button>아이디 회원가입</Button>
      </Link>
      <KakaoButton
      // onClick={() => {
      //   // 카카오 회원가입 로직 추가
      //   window.location.href =
      //     "https://kauth.kakao.com/oauth/authorize?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI&response_type=code";
      // }}
      >
        카카오 회원가입
      </KakaoButton>
    </Container>
  );
};

export default JoinSelectPage;
