import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #dadada;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 24px;
  color: #333;
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
`;

const Content = styled.div`
  text-align: left;
`;

const ContentItem = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.span`
  font-weight: bold;
  color: #333;
`;

const Text = styled.span`
  color: #777;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Button = styled.button`
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border: 1px solid #dadada;
  border-radius: 4px;
  background-color: #f8f8f8;

  &:hover {
    background-color: #e8e8e8;
  }
`;

const MarketDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    const items = [
      {
        id: 1,
        image: "https://via.placeholder.com/100",
        title: "굿즈 1",
        date: "2일 전",
        likes: 5,
        category: "의류",
        author: "작성자 1",
        condition: "새상품",
        description: "상품 설명 1",
        price: "10000원",
      },
      // 추가 아이템들...
    ];

    const selectedItem = items.find(
      (item) => item.id === parseInt(id || "", 10)
    );
    setItem(selectedItem);
  }, [id]);

  if (!item) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Title>{item.title}</Title>
      <Image src={item.image} alt={item.title} />
      <Content>
        <ContentItem>
          <Label>작성자: </Label>
          <Text>{item.author}</Text>
        </ContentItem>
        <ContentItem>
          <Label>카테고리: </Label>
          <Text>{item.category}</Text>
        </ContentItem>
        <ContentItem>
          <Label>상품 상태: </Label>
          <Text>{item.condition}</Text>
        </ContentItem>
        <ContentItem>
          <Label>설명: </Label>
          <Text>{item.description}</Text>
        </ContentItem>
        <ContentItem>
          <Label>가격: </Label>
          <Text>{item.price}</Text>
        </ContentItem>
        <ContentItem>
          <Label>작성일: </Label>
          <Text>{item.date}</Text>
        </ContentItem>
        <ContentItem>
          <Label>찜: </Label>
          <Text>{item.likes}</Text>
        </ContentItem>
      </Content>
      <ButtonContainer>
        <Button onClick={() => navigate("/market/buy")}>
          목록으로 돌아가기
        </Button>
        <Button onClick={() => navigate(`/market/edit/${item.id}`)}>
          수정하기
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default MarketDetailPage;
