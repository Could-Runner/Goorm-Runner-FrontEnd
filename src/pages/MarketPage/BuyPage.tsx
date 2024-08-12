import React, { useState } from "react";
import styled from "styled-components";
import ItemCard from "./ItemCard";
import items from "../../assets/Items.json"; // items.ts 파일에서 items 배열을 import 합니다.

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

const BuyPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("전체보기");
  const [currentPage, setCurrentPage] = useState<number>(1);

  const itemsPerPage = 8;

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
  const token = localStorage.getItem("authToken");
  const handleClick = () => {
    console.log(token);
  };

  return (
    <Container>
      <Title>판매 목록</Title>
      <CategoryButtons>
        {[
          "전체보기",
          "유니폼",
          "KBO포토카드",
          "티켓양도",
          "싸인볼",
          "기타굿즈",
        ].map((category) => (
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
          <ItemCard
            key={item.id}
            id={item.id}
            image={item.image}
            title={item.title}
            price={item.price}
            date={item.date}
            likes={item.likes}
          />
        ))}
      </ItemList>
      <button onClick={handleClick}>Token</button>
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

export default BuyPage;
