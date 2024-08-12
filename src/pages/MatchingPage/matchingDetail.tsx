import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { MdPeople } from "react-icons/md";
import baseballImg from "../../assets/야구배경.jpg";
import profile from "../../assets/profile_img.jpg";
import { useParams } from 'react-router-dom';
import axios from 'axios';

declare global {
    interface Window {
        kakao: any;
    } 
}

const { kakao } = window;

type StadiumsType = {
    [key: string]: { lat: number; lng: number };
};

const stadiums: StadiumsType = {
    "서울종합운동장 야구장": { lat: 37.51215, lng: 127.071976 },
    "광주-기아 챔피언스 필드": { lat: 35.168339, lng: 126.888992 },
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
    const { recruitmentId } = useParams<{ recruitmentId: string }>(); // URL에서 recruitmentId를 가져옴
    const [detail, setDetail] = useState<RecruitmentDetail | null>(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const response = await fetch(`http://api.baseball-route.site:8080/api/recruitment/${recruitmentId}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setDetail(data); // 데이터를 state에 저장
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchDetail(); // 데이터 호출 함수 실행
    }, [recruitmentId]); // recruitmentId가 변경될 때마다 호출

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
    }, [detail]); // detail이 설정된 후 지도 표시

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

    const handleJoin = async () => {
        try {
            const response = await fetch(`http://api.baseball-route.site:8080/api/recruitment/${recruitmentId}/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 필요한 경우, Authorization 헤더 추가
                    // 'Authorization': 'Bearer YOUR_TOKEN_HERE',
                },
            });

            if (!response.ok) {
                if (response.status === 400) {
                    const errorData = await response.json();
                    alert(`참여 실패: ${errorData.message}`);
                } else {
                    throw new Error('참여 요청에 실패했습니다.');
                }
            } else {
                alert('모집에 성공적으로 참여했습니다.');
                // 필요한 경우, 성공적으로 참여 후 동작 추가
            }
        } catch (error) {
            console.error('Failed to join:', error);
            alert('참여 중 오류가 발생했습니다.');
        }
    };

    if (!detail) {
        return <div>Loading...</div>; // 데이터를 불러오는 동안 로딩 표시
    }
    
    return (
        <Container>
            <Banner src={baseballImg} alt="banner" />
            <Title>{detail.title}</Title> {/* 상세 정보 제목 */}
            <HostInfo>
                <HostAvatar src={profile} alt="host" />
                <HostDetails>
                    <span>Hosted by <strong>두산조아</strong></span>
                    <span><MdPeople /> 1/{detail.maxParticipants}</span>
                </HostDetails>
            </HostInfo>
            <SectionTitle>Details</SectionTitle>
            <MainContent>
                <LeftContent>
                    <Details>
                        {detail.content}<br />
                        <br />
                        모집 일정<br />
                        - 날짜: {formatDateTime(detail.meetTime)}<br />
                        <br />
                        모집 장소<br />
                        - 장소: {detail.ballparkName}<br />
                    </Details>
                </LeftContent>
                <RightContent>
                    <Card>
                        <CardTitle>두산조아 님</CardTitle>
                        <CardDetails>
                            <div>응원팀: {detail.teamName}</div>
                            <div>경기장: {detail.ballparkName}</div>
                        </CardDetails>
                    </Card>
                    <Card>
                        <CardTitle>날짜 및 시간</CardTitle>
                        <CardDetails>
                            <div>🗓 {formatDateTime(detail.meetTime)}</div>
                            <div>📍 {detail.address}</div>
                        </CardDetails>
                    </Card>
                    <MapPlaceholder id='map'>지도 위치</MapPlaceholder>
                    <AttendButton onClick={handleJoin}>참석하기</AttendButton>
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