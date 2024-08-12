import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ItemCard from "./ItemCard";

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

interface Item {
  marketId: number;
  image: string;
  title: string;
  price: number;
  date: string;
  likeCount: number;
}

const categoryName: { [key: string]: string } = {
  전체보기: "",
  유니폼: "UNIFORM",
  KBO포토카드: "PHOTOCARD",
  티켓양도: "TICKET",
  싸인볼: "ETC",
  기타굿즈: "ETC",
};

const BuyPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<keyof typeof categoryName>("전체보기");
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);

  useEffect(() => {
    const fetchItems = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch(
          `http://api.baseball-route.site:8080/market/categories/{categoryName}/items`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch items");
        }

        const data = await response.json();
        setItems(data.overviews || []);
        setTotalPages(data.responseMetaData.totalPages || 1);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, [selectedCategory, currentPage]);

  const handleCategoryChange = (category: keyof typeof categoryName) => {
    setSelectedCategory(category);
    setCurrentPage(0);
  };

  return (
    <Container>
      <Title>판매 목록</Title>
      <CategoryButtons>
        {Object.keys(categoryName).map((category) => (
          <CategoryButton
            key={category}
            active={selectedCategory === category}
            onClick={() =>
              handleCategoryChange(category as keyof typeof categoryName)
            }
          >
            {category}
          </CategoryButton>
        ))}
      </CategoryButtons>
      <ItemList>
        {items.map((item) => (
          <ItemCard
            key={item.marketId}
            id={item.marketId}
            image={item.image}
            title={item.title}
            price={item.price.toString()} /* price를 string으로 변환 */
            date={item.date}
            likes={item.likeCount}
          />
        ))}
      </ItemList>
      <Pagination>
        {Array.from({ length: totalPages }, (_, number) => (
          <PageButton
            key={number}
            active={currentPage === number}
            onClick={() => setCurrentPage(number)}
          >
            {number + 1}
          </PageButton>
        ))}
      </Pagination>
    </Container>
  );
};

export default BuyPage;
