import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import boardData from "../../assets/boardcontents.json";
import { BoardData, BoardDataWithoutContent } from "./type"

const ITEMS_PER_PAGE = 8;

const GeneralBoard: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();
    const [data, setData] = useState<BoardDataWithoutContent[]>([]); // JSON 데이터를 state에 저장

    useEffect(() => {
        // content를 제외한 데이터를 설정
        const filteredData = (boardData as BoardData[]).map(({ content, ...rest }) => rest);
        setData(filteredData);
    }, []);

    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(data.length / ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleRowClick = (id: number) => {
        navigate(`/board/general/${id}`);
    };

    const handleWritePost = () => {
        navigate("/postform");
    };

    return (
        <Container>
            <Header>
                <Title>자유게시판</Title>
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
                    <tr key={item.id} onClick={() => handleRowClick(item.id)}>
                    <Td>{item.id}</Td>
                    <Td>{item.title}</Td>
                    <Td>{item.author}</Td>
                    <Td>{item.date}</Td>
                    <Td>{item.likes}</Td>
                    </tr>
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
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
`;

const Title = styled.h1`
    margin-bottom: 20px;
`;

const WriteButton = styled.button`
    padding: 10px 20px;
    background-color: #03c75a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

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
    padding: 8px;
    background-color: #f2f2f2;
    text-align: left;
`;

const Td = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
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
`;