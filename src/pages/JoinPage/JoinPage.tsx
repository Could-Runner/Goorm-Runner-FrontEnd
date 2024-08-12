import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

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
    &:hover {
      filter: brightness(0.9);
    }
  }
`;

const InButton = styled.button<{ disabled: boolean }>`
  font-size: 14px;
  // font-weight: 700;
  line-height: 40px;
  width: 100%;
  height: 40px;
  margin: 10px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 6px; /* 모서리를 둥글게 설정 */
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

const JoinButton = styled.button<{ disabled: boolean }>`
  font-size: 16px;
  font-weight: 700;
  line-height: 4px;
  width: 100%;
  height: 49px;
  margin: 10px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 6px; /* 모서리를 둥글게 설정 */
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

const LoginLink = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #333;

  a {
    color: #03c75a;
    text-decoration: none;
    // font-weight: bold;

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
  font-size: 16px;
  font-weight: 700;
  line-height: 49px;
  width: 100%;
  height: 49px;
  margin: 10px 0 7px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 6px; /* 모서리를 둥글게 설정 */
  background-color: #03c75a;

  &:hover {
    filter: brightness(0.9);
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
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [favoriteTeam, setFavoriteTeam] = useState("");
  const [preferredStadium, setPreferredStadium] = useState("");
  const [emailMessage, setEmailMessage] = useState("");
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

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
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

  const sendVerificationCode = async () => {
    try {
      const response = await axios.post(
        "http://api.baseball-route.site:8080/api/auth/sendCode",
        {
          email,
        }
      );

      if (response.data.success) {
        setEmailMessage("인증코드가 발송되었습니다.");
      } else {
        setEmailMessage(
          response.data.message ||
            "인증코드 발송에 실패했습니다. 다시 시도해주세요."
        );
      }
    } catch (error) {
      console.error("인증코드 발송 실패:", error);
      setEmailMessage("인증코드 발송에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const verifyCode = async () => {
    try {
      const response = await axios.post(
        "http://api.baseball-route.site:8080/api/auth/verifyCode",
        {
          email,
          code: verificationCode,
        }
      );
      if (response.data.success) {
        setIsEmailVerified(true);
        setVerificationMessage("인증되었습니다.");
      } else {
        setVerificationMessage("인증코드가 일치하지 않습니다.");
      }
    } catch (error) {
      console.error("인증 실패:", error);
      setVerificationMessage("인증에 실패했습니다. 다시 시도해주세요.");
    }
  };

  const isDisabled =
    !id ||
    !password ||
    password !== confirmPassword ||
    !name ||
    !gender ||
    !dateOfBirth ||
    !isEmailVerified;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isDisabled) {
      try {
        const response = await axios.post(
          "http://api.baseball-route.site:8080/api/auth/signup",
          {
            loginId: id,
            nickname: name,
            password: password,
            role: "USER",
            sex: gender === "남자" ? "male" : "female",
            birth: dateOfBirth.replace(/^(\d{4})(\d{2})(\d{2})$/, "$1-$2-$3"),
          }
        );
        console.log("회원가입 성공:", response.data);
        setShowPopup(true);
        navigate("/joinComplete");
      } catch (error) {
        console.error("회원가입 실패:", error);
        alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      }
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
            placeholder="8~12자의 영문 소문자, 숫자 조합"
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
          <Label htmlFor="email">이메일</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="이메일을 입력해주세요 (예:example@example.com)"
            value={email}
            onChange={handleEmailChange}
          />
          <InButton
            type="button"
            disabled={!email}
            onClick={sendVerificationCode}
          >
            인증코드 발송
          </InButton>
          {emailMessage && <MessageText>{emailMessage}</MessageText>}
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
          <InButton
            type="button"
            disabled={!verificationCode}
            onClick={verifyCode}
          >
            인증
          </InButton>
          {verificationMessage && (
            <MessageText>{verificationMessage}</MessageText>
          )}
        </FormGroup>
        <JoinButton type="submit" disabled={isDisabled}>
          회원가입
        </JoinButton>
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
                  <option value="KIA타이거즈">KIA타이거즈</option>
                  <option value="LG트윈스">LG트윈스</option>
                  <option value="삼성라이온즈">삼성라이온즈</option>
                  <option value="SSG랜더스">SSG랜더스</option>
                  <option value="롯데자이언츠">롯데자이언츠</option>
                  <option value="두산베어스">두산베어스</option>
                  <option value="NC다이노스">NC다이노스</option>
                  <option value="한화이글스">한화이글스</option>
                  <option value="KT위즈">KT위즈</option>
                  <option value="키움히어로즈">키움히어로즈</option>
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
                  <option value="광주 챔피언스필드">광주 챔피언스필드</option>
                  <option value="대구 라이온즈파크">대구 라이온즈파크</option>
                  <option value="인천 SSG랜더스필드">인천 SSG랜더스필드</option>
                  <option value="사직 야구장">사직 야구장</option>
                  <option value="창원 NC파크">창원 NC파크</option>
                  <option value="대전 한화생명이글스파크">
                    대전 한화생명이글스파크
                  </option>
                  <option value="수원 KT위즈파크">수원 KT위즈파크</option>
                  <option value="고척 스카이돔">고척 스카이돔</option>
                  <option value="서울종합운동장 야구장">
                    서울종합운동장 야구장
                  </option>

                  {/* 다른 구장도 추가 */}
                </PopupSelect>
              </PopupFormGroup>
              <PopupButton type="submit">제출하기</PopupButton>
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
