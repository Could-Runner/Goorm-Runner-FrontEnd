import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import boardData from "../../assets/boardcontents.json"


// 페이지당 항목 수
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
        navigate(`/board/general/${id}`);
    };
    const handleWritePost = () => {
        navigate("/board/general/postform");
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

// const GeneralBoard: React.FC = () => {
//     const categoryName = "GENERAL"; // 고정된 카테고리 이름
//     const [currentPage, setCurrentPage] = useState(0);
//     const [boardData, setBoardData] = useState<any[]>([]); // 데이터를 배열로 저장
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const navigate = useNavigate();

//     // 날짜 포맷을 yyyy년 mm월 dd일로 변환하는 함수
//     const formatDate = (dateString: string) => {
//         const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
//         const date = new Date(dateString);
//         return date.toLocaleDateString('ko-KR', options);
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             try {
//                 const response = await fetch(
//                     `http://api.baseball-route.site:8080/categories/${categoryName}/posts?pageNumber=${currentPage}&pageSize=${ITEMS_PER_PAGE}`
//                 );
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch data");
//                 }
//                 const data = await response.json();
//                 console.log("API Response Data:", data); // 응답 데이터를 콘솔에 출력하여 확인
//                 setBoardData(data.overviews || []); // API 응답에 맞게 데이터 설정
//             } catch (err: any) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };
    
//         fetchData();
//     }, [currentPage]);

//     const totalPages = Math.ceil((boardData?.length || 0) / ITEMS_PER_PAGE);

//     const handlePageChange = (page: number) => {
//         setCurrentPage(page);
//     };

//     const handleRowClick = (id: number) => {
//         navigate(`/board/${categoryName}/${id}`);
//     };

//     const handleWritePost = () => {
//         navigate(`/board/${categoryName}/postform`);
//     };

//     if (loading) {
//         return <div>Loading...</div>;
//     }

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     if (!boardData || boardData.length === 0) {
//         return <div>No data available</div>; // 데이터가 없을 때 표시할 메시지
//     }

//     return (
//         <Container>
//             <Header>
//                 <Title>자유게시판</Title>
//                 <WriteButton onClick={handleWritePost}>글쓰기</WriteButton>
//             </Header>
//             <Table>
//                 <thead>
//                     <tr>
//                         <Th>No</Th>
//                         <Th>제목</Th>
//                         <Th>글쓴이</Th>
//                         <Th>작성시간</Th>
//                         <Th>좋아요</Th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {boardData.map((item) => (
//                         <Tr key={item.id} onClick={() => handleRowClick(item.id)}>
//                             <Td>{item.postId}</Td>
//                             <Td>{item.title}</Td>
//                             <Td>{item.authorName}</Td>
//                             <Td>{formatDate(item.createdAt)}</Td> {/* 작성시간을 포맷팅하여 표시 */}
//                             <Td>{item.likeCount}</Td>
//                         </Tr>
//                     ))}
//                 </tbody>
//             </Table>
//             <Pagination>
//                 {[...Array(totalPages)].map((_, index) => (
//                     <PageNumber
//                         key={index}
//                         isActive={index + 1 === currentPage}
//                         onClick={() => handlePageChange(index + 1)}
//                     >
//                         {index + 1}
//                     </PageNumber>
//                 ))}
//             </Pagination>
//         </Container>
//     );
// };

// export default GeneralBoard;

const Container = styled.div`
    padding: 20px;
    margin: 0 200px;
    margin-top: 50px;
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