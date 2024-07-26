import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  margin-top: 100px;
  margin-bottom: 100px;
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
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const BottomButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
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
  const [introduction, setIntroduction] = useState(
    " 롯데경기라면 어디든지 달려갑니다!"
  );

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedIntroduction = localStorage.getItem("introduction");
    const savedSelectedTeam = localStorage.getItem("selectedTeam");
    const savedSelectedStadium = localStorage.getItem("selectedStadium");

    if (savedUsername) setUsername(savedUsername);
    if (savedIntroduction) setIntroduction(savedIntroduction);
    if (savedSelectedTeam) setSelectedTeam(savedSelectedTeam);
    if (savedSelectedStadium) setSelectedStadium(savedSelectedStadium);
  }, []);

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
    alert("변경이 완료되었습니다.");
  };

  return (
    <Container>
      <SectionTitle>회원정보</SectionTitle>
      <Section>
        <ProfileInfo>
          <ProfileImage src="https://via.placeholder.com/100" alt="Profile" />
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
              <Label>매너점수</Label> 100점
            </Info>
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
              <option value="팀1">팀1</option>
              <option value="팀2">팀2</option>
              <option value="팀3">팀3</option>
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
              <option value="구장1">구장1</option>
              <option value="구장2">구장2</option>
              <option value="구장3">구장3</option>
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
        <Button onClick={isEditing ? handleSaveClick : handleEditClick}>
          {isEditing ? "변경완료" : "변경하기"}
        </Button>
      </BottomButtonContainer>
    </Container>
  );
};

export default Profile;
