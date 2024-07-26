import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

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

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 5px 11px;
  border: 1px solid #dadada;
  background: #fff;
  box-sizing: border-box;
  border-radius: 4px;
`;

const Button = styled.button<{ disabled: boolean }>`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  width: 100%;
  height: 49px;
  margin: 16px 0 7px;
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
      background-color: #efefef;
    }
  `}
`;

const GenderButton = styled.button<{ selected: boolean }>`
  width: 48%;
  height: 40px;
  margin: 0 1%;
  border: 1px solid #dadada;
  border-radius: 4px;
  background-color: ${({ selected }) => (selected ? "#03c75a" : "#fff")};
  color: ${({ selected }) => (selected ? "#fff" : "#333")};
  cursor: pointer;

  &:hover {
    background-color: #028a4d;
    color: #fff;
  }
`;

const LoginLink = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #333;

  a {
    color: #03c75a;
    text-decoration: none;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Popup = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const PopupTitle = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  text-align: center;
`;

const PopupFormGroup = styled.div`
  margin-bottom: 20px;
`;

const PopupSelect = styled.select`
  width: 100%;
  height: 40px;
  padding: 5px 11px;
  border: 1px solid #dadada;
  background: #fff;
  box-sizing: border-box;
  border-radius: 4px;
`;

const PopupButton = styled.button`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  width: 100%;
  height: 49px;
  margin: 16px 0 7px;
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

const MessageText = styled.p`
  color: red;
  font-size: 14px;
`;

const JoinPage: React.FC = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [phone, setPhone] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [favoriteTeam, setFavoriteTeam] = useState("");
  const [preferredStadium, setPreferredStadium] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [verificationMessage, setVerificationMessage] = useState("");
  const navigate = useNavigate();

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleGenderChange = (selectedGender: string) => {
    setGender(selectedGender);
  };

  const handleDateOfBirthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateOfBirth(e.target.value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handleVerificationCodeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setVerificationCode(e.target.value);
  };

  const handleFavoriteTeamChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFavoriteTeam(e.target.value);
  };

  const handlePreferredStadiumChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setPreferredStadium(e.target.value);
  };

  const sendVerificationCode = () => {
    // 인증 코드를 발송하는 로직을 추가합니다.
    console.log("Sending verification code to:", phone);
    setPhoneMessage("인증코드가 발송되었습니다.");
    // 예: 서버에 요청을 보내서 인증 코드를 발송
  };

  const verifyCode = () => {
    // 인증 코드를 확인하는 로직을 추가합니다.
    console.log("Verifying code:", verificationCode);
    if (verificationCode === "123456") {
      // 서버 검증 로직을 대체해야 함
      setIsPhoneVerified(true);
      setVerificationMessage("인증되었습니다.");
    } else {
      setVerificationMessage("인증코드가 일치하지 않습니다.");
    }
  };

  const isDisabled =
    !id ||
    !password ||
    password !== confirmPassword ||
    !name ||
    !gender ||
    !dateOfBirth ||
    !isPhoneVerified;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDisabled) {
      setShowPopup(true);
    }
  };

  const handlePopupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 회원가입 완료 로직 추가
    console.log("Id:", id);
    console.log("Password:", password);
    console.log("Favorite Team:", favoriteTeam);
    console.log("Preferred Stadium:", preferredStadium);
    setShowPopup(false);
    navigate("/joincomplete");
  };

  return (
    <Container>
      <Message>회원가입</Message>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="id">아이디</Label>
          <Input
            id="id"
            name="id"
            type="text"
            placeholder="5~20자의 영문 소문자, 숫자 사용"
            value={id}
            onChange={handleIdChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">비밀번호</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="8~12자의 영문 소문자            , 숫자 조합"
            value={password}
            onChange={handlePasswordChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="confirmPassword">비밀번호 확인</Label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            placeholder="비밀번호를 확인해주세요"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </FormGroup>
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
          <Label htmlFor="gender">성별</Label>
          <div>
            <GenderButton
              type="button"
              selected={gender === "남자"}
              onClick={() => handleGenderChange("남자")}
            >
              남자
            </GenderButton>
            <GenderButton
              type="button"
              selected={gender === "여자"}
              onClick={() => handleGenderChange("여자")}
            >
              여자
            </GenderButton>
          </div>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="dateOfBirth">생년월일</Label>
          <Input
            id="dateOfBirth"
            name="dateOfBirth"
            type="text"
            placeholder="생년월일 8자리를 입력해주세요 (예:19990330)"
            value={dateOfBirth}
            onChange={handleDateOfBirthChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="phone">전화번호</Label>
          <Input
            id="phone"
            name="phone"
            type="text"
            placeholder="전화번호를 입력해주세요"
            value={phone}
            onChange={handlePhoneChange}
          />
          <Button
            type="button"
            disabled={!phone}
            onClick={sendVerificationCode}
          >
            인증코드 발송
          </Button>
          {phoneMessage && <MessageText>{phoneMessage}</MessageText>}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="verificationCode">인증코드</Label>
          <Input
            id="verificationCode"
            name="verificationCode"
            type="text"
            placeholder="인증코드를 입력해주세요"
            value={verificationCode}
            onChange={handleVerificationCodeChange}
          />
          <Button
            type="button"
            disabled={!verificationCode}
            onClick={verifyCode}
          >
            인증
          </Button>
          {verificationMessage && (
            <MessageText>{verificationMessage}</MessageText>
          )}
        </FormGroup>
        <Button type="submit" disabled={isDisabled}>
          회원가입
        </Button>
      </form>
      {showPopup && (
        <PopupContainer>
          <Popup>
            <PopupTitle>추가 정보 입력</PopupTitle>
            <form onSubmit={handlePopupSubmit}>
              <PopupFormGroup>
                <Label htmlFor="favoriteTeam">응원팀</Label>
                <PopupSelect
                  id="favoriteTeam"
                  value={favoriteTeam}
                  onChange={handleFavoriteTeamChange}
                >
                  <option value="">응원팀을 선택하세요</option>
                  <option value="팀1">팀1</option>
                  <option value="팀2">팀2</option>
                  <option value="팀3">팀3</option>
                  {/* 다른 팀들도 추가 */}
                </PopupSelect>
              </PopupFormGroup>
              <PopupFormGroup>
                <Label htmlFor="preferredStadium">선호구장</Label>
                <PopupSelect
                  id="preferredStadium"
                  value={preferredStadium}
                  onChange={handlePreferredStadiumChange}
                >
                  <option value="">선호구장을 선택하세요</option>
                  <option value="구장1">구장1</option>
                  <option value="구장2">구장2</option>
                  <option value="구장3">구장3</option>
                  {/* 다른 구장도 추가 */}
                </PopupSelect>
              </PopupFormGroup>
              <PopupButton type="submit">제출</PopupButton>
            </form>
          </Popup>
        </PopupContainer>
      )}
      <LoginLink>
        이미 아이디가 있나요? <Link to="/loginpage">로그인</Link>
      </LoginLink>
    </Container>
  );
};

export default JoinPage;
