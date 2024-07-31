import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const boardData = [
    { id: 8, title: "올 시즌 최고의 타자는 누구일까요?", author: "baseballFan", date: "2024-07-07", likes: 15 },
    { id: 7, title: "LG 트윈스와 두산 베어스의 역사적 라이벌리", author: "sportsGuru", date: "2024-07-07", likes: 20 },
    { id: 6, title: "야구 경기 관람할 때 챙겨야 할 것들", author: "baseballLover", date: "2024-07-06", likes: 10 },
    { id: 5, title: "주말에 함께 야구 보러 갈 사람 구해요", author: "happyWatcher", date: "2024-07-06", likes: 12 },
    { id: 4, title: "한화 이글스 올해 우승 가능할까?", author: "eagleEye", date: "2024-07-05", likes: 25 },
    { id: 3, title: "프로야구 선수들 트레이닝 비법", author: "fitnessFan", date: "2024-07-05", likes: 18 },
    { id: 2, title: "KBO 리그 역사와 주요 순간들", author: "historyBuff", date: "2024-07-04", likes: 22 },
    { id: 1, title: "야구장에서 먹으면 좋은 간식 추천", author: "foodieFan", date: "2024-07-04", likes: 30 }
];

const ITEMS_PER_PAGE = 8;

const GeneralBoard: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = boardData.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(boardData.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };
    const handleRowClick = (id: number) => {
        navigate(`/board/food/${id}`);
    };
    const handleWritePost = () => {
        navigate("/postform");
    };

    return (
        <Container>
            <Header>
                <Title>자유 게시판</Title>
                <WriteButton onClick={handleWritePost}>글쓰기</WriteButton>
            </Header>
            <Table>
                <thead>
                    <tr>
                        <Th>No</Th>
                        <Th>제목</Th>
                        <Th>글쓴이</Th>
                        <Th>작성시간</Th>
                        <Th>좋아요</Th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => (
                        <Tr key={item.id} onClick={() => handleRowClick(item.id)}>
                            <Td>{item.id}</Td>
                            <Td>{item.title}</Td>
                            <Td>{item.author}</Td>
                            <Td>{item.date}</Td>
                            <Td>{item.likes}</Td>
                        </Tr>
                    ))}
                </tbody>
            </Table>
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

export default GeneralBoard;

const Container = styled.div`
    padding: 20px;
    margin: 0 200px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    margin-bottom: 20px;
    color: #333;
`;

const WriteButton = styled.button`
    padding: 10px 20px;
    background-color: #03c75a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;
    transition: background-color 0.3s;

    &:hover {
        background-color: #028a3d;
    }
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
`;

const Th = styled.th`
    border: 1px solid #ddd;
    padding: 12px;
    background-color: #03c75a;
    color: white;
    text-align: left;
    font-weight: bold;
`;

const Td = styled.td`
    border: 1px solid #ddd;
    padding: 12px;
    color: #333;
`;

const Tr = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }

    &:hover {
        background-color: #e9e9e9;
        cursor: pointer;
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
    border: 1px solid #ddd;
    border-radius: 5px;
    user-select: none;

    &:hover {
        background-color: ${({ isActive }) => (isActive ? "#028a3d" : "#f2f2f2")};
    }
`;