import React, { useState, useEffect } from "react";
import axios from "axios";
import styled, { keyframes } from "styled-components";
import { darken } from 'polished';
import MatchingContent from "../../components/MatchingContent/MatchingContent";

import teams from "../../assets/teams.json"
import stadiums from "../../assets/stadiums.json"
import dummyData from "../../assets/matchingdata.json"

const ITEMS_PER_PAGE = 8;

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

const teamFilterOptions = [
    { value: "KIA 타이거즈", label: "KIA 타이거즈", color: "#e61e2a" },
    { value: "LG 트윈스", label: "LG 트윈스", color: "#c11d2a" },
    { value: "삼성 라이온즈", label: "삼성 라이온즈", color: "#074ca1" },
    { value: "SSG 랜더스", label: "SSG 랜더스", color: "#c8102e" },
    { value: "롯데 자이언츠", label: "롯데 자이언츠", color: "#00275d" },
    { value: "두산 베어스", label: "두산 베어스", color: "#13274f" },
    { value: "NC 다이노스", label: "NC 다이노스", color: "#315288" },
    { value: "한화 이글스", label: "한화 이글스", color: "#f36f21" },
    { value: "KT 위즈", label: "KT 위즈", color: "#000000" },
    { value: "키움 히어로즈", label: "키움 히어로즈", color: "#B07F4A" }
];

const stadiumFilterOptions = [
    { value: "광주 챔피언스필드", label: "광주 챔피언스필드", color: "#e61e2a" },
    { value: "서울종합운동장 야구장", label: "서울종합운동장 야구장", color: "#c11d2a" },
    { value: "대구 라이온즈파크", label: "대구 라이온즈파크", color: "#074ca1" },
    { value: "인천 SSG랜더스필드", label: "인천 SSG랜더스필드", color: "#c8102e" },
    { value: "사직 야구장", label: "사직 야구장", color: "#00275d" },
    { value: "창원 NC파크", label: "창원 NC파크", color: "#315288" },
    { value: "대전 한화생명이글스파크", label: "대전 한화생명이글스파크", color: "#f36f21" },
    { value: "수원 KT위즈파크", label: "수원 KT위즈파크", color: "#000000" },
    { value: "고척 스카이돔", label: "고척 스카이돔", color: "#B07F4A" }
];

// const MatchingPage: React.FC = () => {
//     const [currentPage, setCurrentPage] = useState(1);
//     const [showFilters, setShowFilters] = useState(false);
//     const [showStadiums, setShowStadiums] = useState(false);
//     const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
//     const [selectedStadium, setSelectedStadium] = useState<string | null>(null);
//     const [teamsData, setTeamsData] = useState<any[]>([]);
//     const [loading, setLoading] = useState(true);

//     const fetchFilteredData = async (team: string | null, ballpark: string | null) => {
//         try {
//             const response = await fetch(`http://api.baseball-route.site:8080/api/recruitment?team=${team || ""}&ballpark=${ballpark || ""}`);
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             const data = await response.json();
//             setTeamsData(data);
//             setLoading(false);
//         } catch (error) {
//             console.error("데이터를 가져오는 중 오류 발생:", error);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchFilteredData(selectedTeam, selectedStadium);
//     }, [selectedTeam, selectedStadium]);

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     const toggleFilters = () => {
//         setShowFilters(!showFilters);
//     };

//     const toggleStadiums = () => {
//         setShowStadiums(!showStadiums);
//     };

//     const handleTeamFilter = (team: string) => {
//         setSelectedTeam(selectedTeam === team ? null : team);
//     };

//     const handleStadiumFilter = (stadium: string) => {
//         setSelectedStadium(selectedStadium === stadium ? null : stadium);
//     };

//     const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
//     const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
//     const currentItems = teamsData.slice(indexOfFirstItem, indexOfLastItem);

//     const totalPages = Math.ceil(teamsData.length / ITEMS_PER_PAGE);

//     if (loading) {
//         return <div>로딩 중...</div>;
//     }

//     return (
//         <Container>
//             <FilterGroup>
//                 <FilterWrapper>
//                     <FilterToggle onClick={toggleFilters}>팀 필터</FilterToggle>
//                     {showFilters && (
//                         <FilterButtons>
//                             {teamFilterOptions.map((option) => (
//                                 <TeamFilter
//                                     key={option.value}
//                                     color={option.color}
//                                     selected={option.value === selectedTeam}
//                                     onClick={() => handleTeamFilter(option.value)}
//                                 >
//                                     {option.label}
//                                 </TeamFilter>
//                             ))}
//                         </FilterButtons>
//                     )}
//                 </FilterWrapper>
//                 <FilterWrapper>
//                     <FilterToggle onClick={toggleStadiums}>경기장 필터</FilterToggle>
//                     {showStadiums && (
//                         <FilterButtons>
//                             {stadiumFilterOptions.map((option) => (
//                                 <TeamFilter
//                                     key={option.value}
//                                     color={option.color}
//                                     selected={option.value === selectedStadium}
//                                     onClick={() => handleStadiumFilter(option.value)}
//                                 >
//                                     {option.label}
//                                 </TeamFilter>
//                             ))}
//                         </FilterButtons>
//                     )}
//                 </FilterWrapper>
//             </FilterGroup>
//             <ContentWrapper>
//                 <MatchingContent teams={currentItems} />
//                 <Pagination>
//                     {[...Array(totalPages)].map((_, index) => (
//                         <PageNumber
//                             key={index}
//                             isActive={index + 1 === currentPage}
//                             onClick={() => handlePageChange(index + 1)}
//                         >
//                             {index + 1}
//                         </PageNumber>
//                     ))}
//                 </Pagination>
//             </ContentWrapper>
//         </Container>
//     );
// };

// export default MatchingPage;
const MatchingPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [showFilters, setShowFilters] = useState(false);
    const [showStadiums, setShowStadiums] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
    const [selectedStadium, setSelectedStadium] = useState<string | null>(null);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const toggleFilters = () => {
        setShowFilters(!showFilters);
    };

    const toggleStadiums = () => {
        setShowStadiums(!showStadiums);
    };

    const handleTeamFilter = (team: string) => {
        setSelectedTeam(selectedTeam === team ? null : team);
    };

    const handleStadiumFilter = (stadium: string) => {
        setSelectedStadium(selectedStadium === stadium ? null : stadium);
    };

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const filteredTeams = teams.filter(team => {
        const teamMatch = selectedTeam ? team.name === selectedTeam : true;
        const stadiumMatch = selectedStadium ? team.location === selectedStadium : true;
        return teamMatch && stadiumMatch;
    });
    const currentItems = filteredTeams.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(filteredTeams.length / ITEMS_PER_PAGE);

    return (
        <Container>
            <FilterGroup>
                <FilterWrapper>
                    <FilterToggle onClick={toggleFilters}>팀 필터</FilterToggle>
                    {showFilters && (
                        <FilterButtons>
                            {teams.map((team) => (
                                <TeamFilter
                                    key={team.id}
                                    color={team.color}
                                    selected={team.name === selectedTeam}
                                    onClick={() => handleTeamFilter(team.name)}
                                >
                                    {team.name}
                                </TeamFilter>
                            ))}
                        </FilterButtons>
                    )}
                </FilterWrapper>
                <FilterWrapper>
                    <FilterToggle onClick={toggleStadiums}>경기장 필터</FilterToggle>
                    {showStadiums && (
                        <FilterButtons>
                            {stadiums.map((stadium, index) => (
                                <TeamFilter
                                    key={index}
                                    color={stadium.color}
                                    selected={stadium.name === selectedStadium}
                                    onClick={() => handleStadiumFilter(stadium.name)}
                                >
                                    {stadium.name}
                                </TeamFilter>
                            ))}
                        </FilterButtons>
                    )}
                </FilterWrapper>
            </FilterGroup>
            <ContentWrapper>
                <MatchingContent teams={currentItems} />
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
            </ContentWrapper>
        </Container>
    );
};

export default MatchingPage;

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: center;
`;

const FilterGroup = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-bottom: 20px;
    margin-top: 20px;
`;

const FilterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 10px;
    margin-right: 10px;
`;

const FilterToggle = styled.button`
    border: none;
    width: 120px;
    height: 40px;
    border-radius: 25px;
    color: #fff;
    font-size: 18px;
    cursor: pointer;
    transition: background-color 0.3s;
    background-color: #03c75a;

    &:hover {   
        background-color: #028a4d;
    }
`;

const FilterButtons = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 10px;
    animation: ${expand} 0.5s ease-out;
`;

const TeamFilter = styled.button<{ color: string, selected: boolean }>`
    background-color: ${({ color, selected }) => (selected ? darken(0.2, color) : color)};
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

const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
    align-items: center;

    max-width: 1000px;
`;

const Pagination = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
    padding-top: 10px;
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