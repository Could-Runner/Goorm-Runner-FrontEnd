import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { IoLocationSharp } from 'react-icons/io5';
import { darken } from 'polished';
import { Team, MatchingContentProps } from '../../pages/MatchingPage/type';
// 이미지 로드가 안되는 이슈로 인해 import로 불러옴
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
import teams from "../../assets/teams.json"


const MatchingContent: React.FC<MatchingContentProps> = ({ teams, limit }) => {
    const displayedTeams = limit ? teams.slice(0, limit) : teams;

    return (
        <ContentWrapper>
            {displayedTeams.map((team) => (
                <Card key={team.id}>
                    <StyledLink to={`/matching/${team.id}`}>
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
                    </StyledLink>
                </Card>
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

const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`;