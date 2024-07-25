import React, { useState } from "react";
import styled from "styled-components";

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

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const Button = styled.button`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  width: 48%;
  height: 49px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 0;
  background-color: #03c75a;

  &:hover {
    background-color: #028a4d;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  margin-bottom: 8px;
  padding: 5px 11px;
  border: 1px solid #dadada;
  background: #fff;
  box-sizing: border-box;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

const FindAccount: React.FC = () => {
  const [isFindingId, setIsFindingId] = useState(false);
  const [isFindingPw, setIsFindingPw] = useState(false);
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [id, setId] = useState("");
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleBirthdateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBirthdate(e.target.value);
  };

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handleFindIdClick = () => {
    setIsFindingId(true);
    setIsFindingPw(false);
  };

  const handleFindPwClick = () => {
    setIsFindingId(false);
    setIsFindingPw(true);
  };

  const handleFindIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 아이디 찾기 로직 추가
    console.log("Finding ID with:", name, birthdate);
  };

  const handleFindPwSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 비밀번호 찾기 로직 추가
    console.log("Finding Password with ID:", id);
  };

  return (
    <Container>
      <ButtonGroup>
        <Button onClick={handleFindIdClick}>아이디 찾기</Button>
        <Button onClick={handleFindPwClick}>비밀번호 찾기</Button>
      </ButtonGroup>
      {isFindingId && (
        <form onSubmit={handleFindIdSubmit}>
          <FormGroup>
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="이름을 입력해주세요"
              value={name}
              onChange={handleNameChange}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="birthdate">생년월일</Label>
            <Input
              id="birthdate"
              name="birthdate"
              type="text"
              placeholder="생년월일을 입력해주세요 (예:19990330)"
              value={birthdate}
              onChange={handleBirthdateChange}
            />
          </FormGroup>
          <Button type="submit">찾기</Button>
        </form>
      )}
      {isFindingPw && (
        <form onSubmit={handleFindPwSubmit}>
          <FormGroup>
            <Label htmlFor="id">아이디</Label>
            <Input
              id="id"
              name="id"
              type="text"
              placeholder="아이디를 입력해주세요"
              value={id}
              onChange={handleIdChange}
            />
          </FormGroup>
          <Button type="submit">찾기</Button>
        </form>
      )}
    </Container>
  );
};

export default FindAccount;
