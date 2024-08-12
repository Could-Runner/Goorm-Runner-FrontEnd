import React, { useState, useEffect, useContext, useRef } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import AuthContext from "../../pages/LoginPage/AuthContext";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Section = styled.div`
  margin-bottom: 20px;
  padding: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #ddd;
`;

const SectionTitle = styled.h2`
  margin-bottom: 10px;
  font-size: 20px;
  color: #333;
`;

const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-right: 40px;
  margin-left: 30px;
`;

const ChangeImageButton = styled.button`
  display: block;
  margin: 10px auto 0;
  padding: 5px 10px;
  font-size: 12px;
  color: #fff;
  background-color: #03c75a;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const Info = styled.div`
  margin-bottom: 10px;
  font-size: 16px;
`;

const Label = styled.span`
  font-weight: bold;
`;

const NickName = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Text = styled.div`
  font-size: 16px;
  margin-bottom: 10px;
`;

const OptionalInfo = styled.div`
  margin-top: 10px;
  font-size: 16px;
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  margin-bottom: 10px;
  padding: 5px 11px;
  border: 1px solid #dadada;
  background: #fff;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #03c75a;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    filter: brightness(0.9);
  }
`;

const DeleteButton = styled(Button)`
  background-color: #ff4d4d;
  &:hover {
    filter: brightness(0.9);
  }
`;

const BottomButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Input = styled.input`
  width: 150%;
  height: 40px;
  margin-bottom: 10px;
  padding: 5px 11px;
  border: 1px solid #dadada;
  background: #fff;
  box-sizing: border-box;
  border-radius: 4px;
  font-size: 16px;
`;

const Profile: React.FC = () => {
  const [selectedTeam, setSelectedTeam] = useState("");
  const [selectedStadium, setSelectedStadium] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState("롯데조아용");
  const [introduction, setIntroduction] =
    useState("롯데경기라면 어디든지 달려갑니다!");
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/100"
  );
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useContext(AuthContext);
  const hasShownPopup = useRef(false);

  useEffect(() => {
    // 로그인 여부 확인
    if (
      !isLoggedIn &&
      location.pathname !== "/loginpage" &&
      !hasShownPopup.current
    ) {
      hasShownPopup.current = true;
      alert("회원가입 또는 로그인을 해주세요.");
      navigate("/loginpage"); // 로그인 페이지로 리디렉션
    }

    const savedUsername = localStorage.getItem("username");
    const savedIntroduction = localStorage.getItem("introduction");
    const savedSelectedTeam = localStorage.getItem("selectedTeam");
    const savedSelectedStadium = localStorage.getItem("selectedStadium");
    const savedProfileImage = localStorage.getItem("profileImage");

    if (savedUsername) setUsername(savedUsername);
    if (savedIntroduction) setIntroduction(savedIntroduction);
    if (savedSelectedTeam) setSelectedTeam(savedSelectedTeam);
    if (savedSelectedStadium) setSelectedStadium(savedSelectedStadium);
    if (savedProfileImage) setProfileImage(savedProfileImage);
  }, [isLoggedIn, navigate, location.pathname]);

  const handleTeamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedTeam(e.target.value);
  };

  const handleStadiumChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStadium(e.target.value);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    localStorage.setItem("username", username);
    localStorage.setItem("introduction", introduction);
    localStorage.setItem("selectedTeam", selectedTeam);
    localStorage.setItem("selectedStadium", selectedStadium);
    localStorage.setItem("profileImage", profileImage);
    alert("변경이 완료되었습니다.");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteAccount = () => {
    if (window.confirm("정말로 탈퇴하시겠습니까?")) {
      // Perform account deletion logic here
      alert("성공적으로 탈퇴되었습니다.");
      // Redirect to a different page if necessary
      navigate("/loginpage");
    }
  };

  return (
    <Container>
      <SectionTitle>회원정보</SectionTitle>
      <Section>
        <ProfileInfo>
          <div>
            <ProfileImage src={profileImage} alt="Profile" />
            {isEditing && (
              <>
                <ChangeImageButton
                  onClick={() => document.getElementById("fileInput")?.click()}
                >
                  변경
                </ChangeImageButton>
                <input
                  type="file"
                  id="fileInput"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </>
            )}
          </div>
          <div>
            {isEditing ? (
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            ) : (
              <NickName>{username}</NickName>
            )}

            <Info>
              <Label>자기소개 :</Label>
              {isEditing ? (
                <Input
                  type="text"
                  value={introduction}
                  onChange={(e) => setIntroduction(e.target.value)}
                />
              ) : (
                introduction
              )}
            </Info>
            <Info>
              <Label>이름 :</Label> 홍길동
            </Info>
            <Info>
              <Label>성별 :</Label> 남성
            </Info>
            <Info>
              <Label>생년월일 :</Label> 1999-03-30
            </Info>
            <Info>
              <Label>휴대폰번호 :</Label> 010-1234-5678
            </Info>
          </div>
        </ProfileInfo>
      </Section>
      <SectionTitle>직관매칭 정보</SectionTitle>
      <Section>
        <OptionalInfo>
          <Label>응원팀</Label>
          {isEditing ? (
            <Select value={selectedTeam} onChange={handleTeamChange}>
              <option value="">없음</option>
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
            </Select>
          ) : (
            <Text>{selectedTeam || "-- 없음 --"}</Text>
          )}
        </OptionalInfo>
        <OptionalInfo>
          <Label>선호구장</Label>
          {isEditing ? (
            <Select value={selectedStadium} onChange={handleStadiumChange}>
              <option value="">없음</option>
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
            </Select>
          ) : (
            <Text>{selectedStadium || "-- 없음 --"}</Text>
          )}
        </OptionalInfo>
      </Section>
      <SectionTitle>카카오 연동 정보</SectionTitle>
      <Section>
        <div>
          <Info>123@kakao.com</Info>
          <Info>
            <Label>연동일자</Label> 2024.07.26
          </Info>
        </div>
      </Section>
      <BottomButtonContainer>
        {isEditing && (
          <DeleteButton onClick={handleDeleteAccount}>탈퇴하기</DeleteButton>
        )}
        <Button onClick={isEditing ? handleSaveClick : handleEditClick}>
          {isEditing ? "변경완료" : "변경하기"}
        </Button>
      </BottomButtonContainer>
    </Container>
  );
};

export default Profile;
