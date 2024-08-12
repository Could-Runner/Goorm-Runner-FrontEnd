import React from 'react';
import styled from 'styled-components';
import { IoLocationSharp } from 'react-icons/io5';
import { BsPeopleFill } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";

// 이미지 import
import kiaLogo from "../../assets/teamlogo/기아 타이거즈.png";
import lgLogo from "../../assets/teamlogo/엘지 트윈스.png";
import samsungLogo from "../../assets/teamlogo/삼성 라이온즈.png";
import ssgLogo from "../../assets/teamlogo/SSG 랜더스.png";
import lotteLogo from "../../assets/teamlogo/롯데 자이언츠.png";
import doosanLogo from "../../assets/teamlogo/두산 베어스.png";
import ncLogo from "../../assets/teamlogo/엔씨 다이노스.png";
import hanwhaLogo from "../../assets/teamlogo/한화 이글스.png";
import ktLogo from "../../assets/teamlogo/케이티 위즈.png";
import kiwoomLogo from "../../assets/teamlogo/키움 히어로즈.png";
import { Link } from 'react-router-dom';

// 이미지 매핑 객체 생성
const teamLogos: { [key: string]: string } = {
    "KIA 타이거즈": kiaLogo,
    "LG 트윈스": lgLogo,
    "삼성 라이온즈": samsungLogo,
    "SSG 랜더스": ssgLogo,
    "롯데 자이언츠": lotteLogo,
    "두산 베어스": doosanLogo,
    "NC 다이노스": ncLogo,
    "한화 이글스": hanwhaLogo,
    "KT 위즈": ktLogo,
    "키움 히어로즈": kiwoomLogo
};

interface MatchingContentProps {
    teams: {
        id: number;
        title: string;
        content: string;
        address: string;
        meetTime: string;
        maxParticipants: number;
        teamName: string;
        ballparkName: string;
    }[];
    limit?: number;
}

const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    return date.toLocaleString('ko-KR', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
    });
};

const MatchingContent: React.FC<MatchingContentProps> = ({ teams, limit }) => {
    const displayedTeams = limit ? teams.slice(0, limit) : teams;

    return (
        <ContentWrapper>
            {displayedTeams.map((team) => (
                <StyledLink to={`/matching/${team.id}`} key={team.id}>
                    <Card>
                        <CardContent>
                            <LogoWrapper>
                                <img src={teamLogos[team.teamName]} alt={team.teamName} />
                            </LogoWrapper>
                            <InfoWrapper>
                                <h3>{team.title}</h3>
                                <p><IoLocationSharp /> {team.ballparkName}</p>
                                <p><IoTimeOutline /> {formatDateTime(team.meetTime)}</p>
                                <p><BsPeopleFill /> 최대 {team.maxParticipants}명</p>
                            </InfoWrapper>
                        </CardContent>
                    </Card>
                </StyledLink>
            ))}
        </ContentWrapper>
    );
};

export default MatchingContent;

const ContentWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 25px;
    column-gap: 40px;
    margin-top: 20px;
    width: 100%;
    max-width: 1000px;
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;

const Card = styled.div`
    border: 1px solid #dadada;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    text-align: left;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background-color: rgba(217, 217, 217, 0.2);
`;

const CardContent = styled.div`
    display: flex;
    padding: 10px;

    img {
        width: 100px;
        height: auto;
    }
`;

const LogoWrapper = styled.div`
    flex: 0 0 100px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const InfoWrapper = styled.div`
    flex: 1;
    padding-left: 10px;

    h3 {
        font-size: 18px;
        margin: 10px 0;
    }

    p {
        font-size: 14px;
        margin: 5px 0;
    }
`;