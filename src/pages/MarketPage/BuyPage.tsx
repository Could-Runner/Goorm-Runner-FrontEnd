import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 20px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  text-align: center;
`;

const CategoryButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const CategoryButton = styled.button<{ active: boolean }>`
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #dadada;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? "#03c75a" : "#f8f8f8")};
  color: ${({ active }) => (active ? "#fff" : "#333")};

  &:hover {
    background-color: ${({ active }) => (active ? "#028a4d" : "#e8e8e8")};
  }
`;

const ItemList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
`;

const Item = styled.div`
  width: calc(20% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  border: 1px solid #dadada;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;

  &:hover {
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const ItemImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  margin-bottom: 10px;
`;

const ItemContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const ItemTitle = styled.h3`
  font-size: 18px;
  margin: 0;
  color: #333;
  text-align: center;
`;

const ItemDate = styled.div`
  font-size: 14px;
  color: #777;
`;

const ItemLikes = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  color: #777;
`;

const HeartIcon = styled.span`
  color: red;
`;

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

const PageButton = styled.button<{ active: boolean }>`
  padding: 10px 15px;
  margin: 0 5px;
  border: 1px solid #dadada;
  border-radius: 4px;
  background-color: ${({ active }) => (active ? "#03c75a" : "#f8f8f8")};
  color: ${({ active }) => (active ? "#fff" : "#333")};
  cursor: pointer;

  &:hover {
    background-color: ${({ active }) => (active ? "#028a4d" : "#e8e8e8")};
  }
`;

const MarketBuyPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<string>("전체보기");
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const itemsPerPage = 8;

  const items = [
    {
      id: 1,
      image: "https://via.placeholder.com/100",
      title: "굿즈 1",
      date: "2일 전",
      likes: 5,
      category: "의류",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/100",
      title: "굿즈 2",
      date: "1일 전",
      likes: 3,
      category: "악세사리",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/100",
      title: "굿즈 3",
      date: "3일 전",
      likes: 8,
      category: "기타",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/100",
      title: "굿즈 4",
      date: "4일 전",
      likes: 1,
      category: "의류",
    },
    {
      id: 5,
      image: "https://via.placeholder.com/100",
      title: "굿즈 5",
      date: "5일 전",
      likes: 4,
      category: "기타",
    },
    {
      id: 6,
      image: "https://via.placeholder.com/100",
      title: "굿즈 6",
      date: "6일 전",
      likes: 2,
      category: "악세사리",
    },
    {
      id: 7,
      image: "https://via.placeholder.com/100",
      title: "굿즈 7",
      date: "7일 전",
      likes: 7,
      category: "의류",
    },
    {
      id: 8,
      image: "https://via.placeholder.com/100",
      title: "굿즈 8",
      date: "8일 전",
      likes: 9,
      category: "기타",
    },
    {
      id: 9,
      image: "https://via.placeholder.com/100",
      title: "굿즈 9",
      date: "9일 전",
      likes: 6,
      category: "악세사리",
    },
    {
      id: 10,
      image: "https://via.placeholder.com/100",
      title: "굿즈 10",
      date: "10일 전",
      likes: 0,
      category: "의류",
    },
    {
      id: 11,
      image: "https://via.placeholder.com/100",
      title: "굿즈 11",
      date: "11일 전",
      likes: 3,
      category: "기타",
    },
    {
      id: 12,
      image: "https://via.placeholder.com/100",
      title: "굿즈 12",
      date: "12일 전",
      likes: 2,
      category: "악세사리",
    },
    // 다른 상품들도 추가할 수 있습니다.
  ];

  const filteredItems =
    selectedCategory === "전체보기"
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredItems.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <Container>
      <Title>판매 목록</Title>
      <CategoryButtons>
        {["전체보기", "의류", "악세사리", "기타"].map((category) => (
          <CategoryButton
            key={category}
            active={selectedCategory === category}
            onClick={() => {
              setSelectedCategory(category);
              setCurrentPage(1);
            }}
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryButtons>
      <ItemList>
        {currentItems.map((item) => (
          <Item
            key={item.id}
            onClick={() => navigate(`/market/buy/${item.id}`)}
          >
            <ItemImage src={item.image} alt={item.title} />
            <ItemContent>
              <ItemTitle>{item.title}</ItemTitle>
              <ItemDate>{item.date}</ItemDate>
              <ItemLikes>
                <HeartIcon>❤️</HeartIcon>
                {item.likes}
              </ItemLikes>
            </ItemContent>
          </Item>
        ))}
      </ItemList>
      <Pagination>
        {pageNumbers.map((number) => (
          <PageButton
            key={number}
            active={currentPage === number}
            onClick={() => setCurrentPage(number)}
          >
            {number}
          </PageButton>
        ))}
      </Pagination>
    </Container>
  );
};

export default MarketBuyPage;
