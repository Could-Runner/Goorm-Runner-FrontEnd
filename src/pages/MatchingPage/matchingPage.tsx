import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { IoLocationSharp } from "react-icons/io5";
import { darken } from 'polished';
import teams from "../../assets/teams.json"
import stadiums from "../../assets/stadiums.json"
import MatchingContent from "../../components/MatchingContent/MatchingContent";

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