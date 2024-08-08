// ItemCard.tsx
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

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
  transition: box-shadow 0.3s ease-in-out;

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

const ItemPrice = styled.p`
  font-size: 16px;
  font-weight: bold;
  color: #03c75a;
  margin: 5px 0;
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

interface ItemCardProps {
  id: number;
  image: string;
  title: string;
  price: string;
  date: string;
  likes: number;
}

const ItemCard: React.FC<ItemCardProps> = ({
  id,
  image,
  title,
  price,
  date,
  likes,
}) => {
  const navigate = useNavigate();

  return (
    <Item onClick={() => navigate(`/market/buy/${id}`)}>
      <ItemImage src={image} alt={title} />
      <ItemContent>
        <ItemTitle>{title}</ItemTitle>
        <ItemPrice>{price}</ItemPrice>
        <ItemDate>{date}</ItemDate>
        <ItemLikes>
          <HeartIcon>❤️</HeartIcon>
          {likes}
        </ItemLikes>
      </ItemContent>
    </Item>
  );
};

export default ItemCard;
