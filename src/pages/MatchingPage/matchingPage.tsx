import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { IoLocationSharp } from "react-icons/io5";
import { darken } from 'polished';

// 이미지 로드가 안되는 이슈로 인해 import로 불러옴
import kiaLogo from "../../assets/teamlogo/기아타이거즈.png";
import lgLogo from "../../assets/teamlogo/엘지트윈스.png";
import samsungLogo from "../../assets/teamlogo/삼성라이온즈.png";
import ssgLogo from "../../assets/teamlogo/ssg랜더스.png";
import lotteLogo from "../../assets/teamlogo/롯데자이언츠.png";
import doosanLogo from "../../assets/teamlogo/두산베어스.png";
import ncLogo from "../../assets/teamlogo/엔씨다이노스.png";
import hanwhaLogo from "../../assets/teamlogo/한화이글스.png";
import ktLogo from "../../assets/teamlogo/케이티위즈.png";
import kiwoomLogo from "../../assets/teamlogo/키움히어로즈.png";
// import matchingdata from "../../assets/matchingdata.json"

// 더미데이터 생성
const teams = [
    { id: 1, name: "KIA 타이거즈", logo: kiaLogo, date: "07.16", time: "오후 6:30", location: "광주 챔피언스필드", color: "#e61e2a" },
    { id: 2, name: "LG 트윈스", logo: lgLogo, date: "07.18", time: "오후 6:30", location: "서울종합운동장 야구장", color: "#c11d2a" },
    { id: 3, name: "삼성 라이온즈", logo: samsungLogo, date: "07.20", time: "오후 5:00", location: "대구 라이온즈파크", color: "#074ca1" },
    { id: 4, name: "SSG 랜더스", logo: ssgLogo, date: "07.25", time: "오후 6:30", location: "인천 SSG랜더스필드", color: "#c8102e" },
    { id: 5, name: "롯데 자이언츠", logo: lotteLogo, date: "07.31", time: "오후 6:30", location: "사직 야구장", color: "#00275d" },
    { id: 6, name: "두산 베어스", logo: doosanLogo, date: "07.23", time: "오후 6:30", location: "서울종합운동장 야구장", color: "#13274f" },
    { id: 7, name: "NC 다이노스", logo: ncLogo, date: "07.27", time: "오후 5:00", location: "창원 NC파크", color: "#315288" },
    { id: 8, name: "한화 이글스", logo: hanwhaLogo, date: "08.01", time: "오후 6:30", location: "대전 한화생명이글스파크", color: "#f36f21" },
    { id: 9, name: "KT 위즈", logo: ktLogo, date: "08.05", time: "오후 6:30", location: "수원 KT위즈파크", color: "#000000" },
    { id: 10, name: "키움 히어로즈", logo: kiwoomLogo, date: "08.07", time: "오후 6:30", location: "고척 스카이돔", color: "#B07F4A" }
];


const ITEMS_PER_PAGE = 8;

const MatchingPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = teams.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(teams.length / ITEMS_PER_PAGE);

    return (
        <Container>
            <Filtergroup>
                {!showFilters && (
                    <FilterToggle onClick={toggleFilters}>팀 필터</FilterToggle>
                )}
                {showFilters && (
                    <FilterButtons>
                        {teams.map((team) => (
                            <TeamFilter key={team.id} color={team.color}>{team.name}</TeamFilter>
                        ))}
                    </FilterButtons>
                )}
            </Filtergroup>
            <Content>
                {currentItems.map((team) => (
                    <Card key={team.id}>
                        <Link to={`/matching/details/${team.id}`}>
                            <CardContent>
                                <LogoWrapper>
                                    <img src={team.logo} alt={team.name} />
                                </LogoWrapper>
                                <InfoWrapper>
                                    <h3>{team.name}</h3>
                                    <p>{team.date} {team.time}</p>
                                    <p><IoLocationSharp /> {team.location}</p>
                                </InfoWrapper>
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </Content>
            <Pagination>
                {[...Array(totalPages)].map((_, index) => (
                    <PageNumber
                        key={index}
                        isActive={index + 1 === currentPage}
                        onClick={() => handlePageChange(index + 1)}
                    >
                        {index + 1}
                    </PageNumber>
                ))}
            </Pagination>
        </Container>
    );
};

export default MatchingPage;

const Container = styled.div`
    padding: 20px;
`;

const Filtergroup = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 30px 200px;
`;

const FilterToggle = styled.button`
    background-color: #03a9f4;
    border: none;
    width: 120px;
    height: 40px;
    border-radius: 25px;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0288d1;
    }
`;

const expand = keyframes`
    from {
        max-height: 0;
        opacity: 0;
    }
    to {
        max-height: 200px;
        opacity: 1;
    }
`;

const FilterButtons = styled.div`
    display: flex;
    flex-wrap: nowrap;
    justify-content: center;
    gap: 10px;
    margin-top: 10px;
    animation: ${expand} 0.5s ease-out;
`;

const TeamFilter = styled.button<{ color: string }>`
    background-color: ${({ color }) => color};
    border: none;
    width: 120px;
    height: 40px;
    border-radius: 20px;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ color }) => darken(0.1, color)};
    }
`;



const StadiumGroup = styled.div`
    display: flex;
    justify-content: flex-start;
`;
const StadiumFilter = styled.option`
    background-color: #202020;

`;

const Content = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
    margin: 0 300px;

    & > * {
        flex: 1 1 calc(50% - 20px);
        max-width: calc(50% - 20px);
    }
`;

const Card = styled.div`
    width: 100%;
    border: 1px solid #dadada;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-align: left;
    margin-bottom: 10px; /* 추가된 여백 */
`;

const CardContent = styled.div`
    display: flex; /* 플렉스 컨테이너로 설정 */
    padding: 10px; /* 패딩을 줄여 높이 줄임 */
    
    img {
        width: 100px; /* 이미지 크기를 줄여 높이 줄임 */
        height: auto;
    }
`;

const LogoWrapper = styled.div`
    flex: 0 0 100px; /* 로고의 고정 너비 */
`;

const InfoWrapper = styled.div`
    flex: 1;
    padding-left: 10px; /* 텍스트와 이미지 간 간격 추가 */

    h3 {
        font-size: 18px; /* 글꼴 크기를 줄여 높이 줄임 */
        margin: 10px 0;
    }

    p {
        font-size: 14px; /* 글꼴 크기를 줄여 높이 줄임 */
        margin: 5px 0;
    }
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const PageNumber = styled.div<{ isActive: boolean }>`
    margin: 0 5px;
    padding: 5px 10px;
    cursor: pointer;
    background-color: ${({ isActive }) => (isActive ? "#03c75a" : "#fff")};
    color: ${({ isActive }) => (isActive ? "#fff" : "#000")};
    border: 1px solid #dadada;
    border-radius: 5px;
`;