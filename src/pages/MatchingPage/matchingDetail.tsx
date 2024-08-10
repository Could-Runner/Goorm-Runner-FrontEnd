import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdPeople } from "react-icons/md";
import baseballImg from "../../assets/야구배경.jpg"
import { useParams } from 'react-router-dom';
import axios from 'axios';
import profile from "../../assets/profile_img.jpg"


declare global {
    interface Window {
        kakao: any;
    } 
}

const {kakao} = window;

type StadiumsType = {
    [key: string]: { lat: number; lng: number };
};

const stadiums: StadiumsType = {
    "서울종합운동장 야구장": { lat: 37.51215, lng: 127.071976 },
    "광주 챔피언스필드": { lat: 35.168339, lng: 126.888992 },
    "대구 라이온즈파크": { lat: 35.841111, lng: 128.681667 },
    "인천 SSG랜더스필드": { lat: 37.435139, lng: 126.690806 },
    "사직 야구장": { lat: 35.194077, lng: 129.061584 },
    "창원 NC파크": { lat: 35.222628, lng: 128.581697 },
    "대전 한화생명이글스파크": { lat: 36.317085, lng: 127.429131 },
    "수원 KT위즈파크": { lat: 37.299759, lng: 127.009781 },
    "고척 스카이돔": { lat: 37.498333, lng: 126.866667 }
};

type RecruitmentDetail = {
    id: number;
    title: string;
    content: string;
    address: string;
    meetTime: string;
    maxParticipants: number;
    teamName: string;
    ballparkName: string;
};

const MatchingDetail: React.FC = () => {
    const { recruitmentId } = useParams<{ recruitmentId: string }>();
    const [detail, setDetail] = useState<RecruitmentDetail | null>(null);

    useEffect(() => {
        axios.get(`http://api.baseball-route.site:8080/api/recruitment/${recruitmentId}`)
            .then(response => {
                setDetail(response.data);
            })
            .catch(error => {
                console.error('Failed to fetch data:', error);
            });
    }, [recruitmentId]);

    useEffect(() => {
        if (detail) {
            const mapContainer = document.getElementById('map');
            const mapOption = {
                center: new kakao.maps.LatLng(stadiums[detail.ballparkName].lat, stadiums[detail.ballparkName].lng),
                level: 5
            };

            const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
            const imageSize = new kakao.maps.Size(64, 69);
            const imageOption = { offset: new kakao.maps.Point(27, 69) };
            const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption);
            const map = new kakao.maps.Map(mapContainer, mapOption);

            const markerPosition = new kakao.maps.LatLng(stadiums[detail.ballparkName].lat, stadiums[detail.ballparkName].lng);
            const marker = new kakao.maps.Marker({
                position: markerPosition,
                image: markerImage
            });
            marker.setMap(map);
        }
    }, [detail]);

    if (!detail) {
        return <div>Loading...</div>;
    }
    
    return (
        <Container>
        <Banner src={baseballImg} alt="banner" />
        <Title>두산팬들 모여라~</Title>
        <HostInfo>
            <HostAvatar src={profile} alt="host" />
            <HostDetails>
            <span>Hosted by <strong>두산조아</strong></span>
            <span><MdPeople /> 1/4</span>
            </HostDetails>
        </HostInfo>
        <SectionTitle>Details</SectionTitle>
        <MainContent>
            <LeftContent>
            
            <Details>
                안녕하세요, 야구 팬 여러분!<br />
                다가오는 7월 23일 화요일 오후 6시 30분에 잠실야구장에서 열리는 두산 베어스 vs 한화 이글스 경기를 함께 관람할 멤버를 모집합니다 ⚾<br />
                <br />
                모집 인원<br />
                - 총 3명 (선착순)<br />
                <br />
                모집 일정<br />
                - 날짜: 2024년 7월 23일 (화요일)<br />
                - 시간: 오후 6시 30분 경기 시작 (5시 30분까지 모임)<br />
                <br />
                모집 장소<br />
                - 장소: 잠실야구장 정문 앞<br />
                <br />
                티켓 구매<br />
                - 온라인 예매: 경기 7일 전부터 가능 (예매 사이트: 티켓링크)<br />
                <br />
                참가 방법<br />
                - 참석하기 버튼을 눌러 참석을 알려주세요.<br />
                - 참석 가능 여부와 함께 연락처를 남겨주세요.<br />
                <br />
                준비물<br />
                - 응원 도구 (응원복, 응원용품 등)<br />
                - 야구에 대한 열정과 응원의 에너지!<br />
                <br />
                즐거운 야구 관람을 함께하며, 팀을 향한 열정을 마음껏 발휘해 봅시다! 많은 참여 부탁드려요!
            </Details>
            </LeftContent>
            <RightContent>
            <Card>
                <CardTitle>두산조아 님</CardTitle>
                <CardDetails>
                <div>응원팀: 두산 베어스</div>
                <div>성별: 남자</div>
                <div>나이: 25살</div>
                </CardDetails>
            </Card>
            <Card>
                <CardTitle>날짜 및 시간</CardTitle>
                <CardDetails>
                <div>🗓 2024-07-23 오후 6:30</div>
                <div>📍 서울특별시 송파구 올림픽로 25</div>
                </CardDetails>
            </Card>
            <MapPlaceholder id='map'>지도 위치</MapPlaceholder>
            <AttendButton>참석하기</AttendButton>
            </RightContent>
        </MainContent>
        </Container>
    );
};

export default MatchingDetail;

const Container = styled.div`
    padding: 0 20px;
    margin: 0 auto;
    max-width: 1200px;
`;

const Banner = styled.img`
    width: 100%;
    height: auto;
`;

const Title = styled.h1`
    font-size: 2rem;
    margin: 20px 0;
`;

const HostInfo = styled.div`
    display: flex;
    align-items: center;
`;

const HostAvatar = styled.img`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 10px;
`;

const HostDetails = styled.div`
    display: flex;
    flex-direction: column;
    span {
        margin-bottom: 5px;
    }
`;

const MainContent = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    padding-bottom: 20px;
`;

const LeftContent = styled.div`
    width: 65%;
`;

const RightContent = styled.div`
    width: 30%;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const SectionTitle = styled.h2`
    font-size: 1.5rem;
    margin-bottom: 10px;
`;

const Details = styled.div`
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #f9f9f9;
    line-height: 1.6;

    p {
        margin: 0 0 10px;
    }
`;

const Card = styled.div`
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: #fff;
`;

const CardTitle = styled.h3`
    margin-bottom: 10px;
    font-size: 1.2rem;
`;

const CardDetails = styled.div`
    div {
        margin-bottom: 5px;
    }
`;

const MapPlaceholder = styled.div`
    width: 100%;
    height: 300px;
    border-radius: 8px;
    background-color: #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #333;  
`;

const AttendButton = styled.button`
    padding: 15px;
    margin-top: 10px;
    background-color: #03a9f4;
    border: none;
    border-radius: 8px;
    color: #fff;
    font-size: 1rem;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0288d1;
    }
`;