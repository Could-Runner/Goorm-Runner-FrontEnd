import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import items from "../../assets/Items.json";

const Container = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
  padding: 20px;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
  border: 1px solid #dadada;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const ProductImage = styled.img`
  width: 200px;
  height: auto;
  border: 1px solid #dadada;
  border-radius: 4px;
  margin-right: 20px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const Title = styled.h2`
  margin: 10px;
  margin-left: auto;
  font-size: 24px;
  color: #333;
`;

const ProductDetail = styled.div`
  margin-bottom: 10px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

const Text = styled.p`
  margin: 0;
  font-size: 16px;
  color: #555;
`;

const Price = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #03c75a;
  margin: 10px;
  margin-left: auto;
`;

const WishlistButton = styled.button`
  font-size: 16px;
  cursor: pointer;
  color: #fff;
  border: none;
  border-radius: 4px;
  background-color: #ff4081;
  padding: 10px 20px;
  margin-top: 10px;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #e73370;
  }

  svg {
    margin-right: 5px;
  }
`;

const DescriptionSection = styled.div`
  margin-top: 20px;
`;

const SellerInfo = styled.div`
  display: flex;
  align-items: center;
  margin-top: 20px;
`;

const SellerImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 10px;
`;

const SellerDetails = styled.div`
  flex: 1;
`;

const SellerName = styled.p`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  color: #333;
`;

const SellerRating = styled.p`
  margin: 0;
  font-size: 14px;
  color: #555;
`;

const ReviewsSection = styled.div`
  margin-top: 20px;
`;

const Review = styled.div`
  padding: 10px;
  border-bottom: 1px solid #dadada;
`;

const ReviewText = styled.p`
  margin: 0;
  font-size: 14px;
  color: #555;
`;

const ReviewAuthor = styled.p`
  margin: 0;
  font-size: 12px;
  color: #999;
  text-align: right;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

const Button = styled.button`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  width: 100%;
  height: 49px;
  cursor: pointer;
  text-align: center;
  color: #fff;
  border: none;
  border-radius: 4px;
  background-color: #03c75a;

  &:hover {
    background-color: #028a4d;
  }
`;

const DetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = items.find((item) => item.id === parseInt(id!, 10));

  const [wishlistCount, setWishlistCount] = useState(
    product ? product.likes : 0
  );
  const [isWishlist, setIsWishlist] = useState(false);

  const handleWishlistClick = () => {
    setIsWishlist(!isWishlist);
    setWishlistCount(isWishlist ? wishlistCount - 1 : wishlistCount + 1);
  };

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  const handleBuyClick = () => {
    const openChatUrl = product.openChatUrl; // 판매글에서 입력된 오픈채팅 URL
    if (openChatUrl) {
      window.location.href = openChatUrl;
    } else {
      alert("오픈채팅방 URL이 등록되지 않았습니다.");
    }
  };

  const handleEditClick = () => {
    navigate(`/market/edit/${id}`);
  };

  return (
    <Container>
      <Header>
        <ProductImage src={product.image} alt="상품 이미지" />
        <ProductInfo>
          <Title>{product.title}</Title>
          <Price>{product.price}</Price>
          <ProductDetail>
            <Label>카테고리</Label>
            <Text>{product.category}</Text>
          </ProductDetail>
          <ProductDetail>
            <Label>상품 상태</Label>
            <Text>{product.condition}</Text>
          </ProductDetail>
          <WishlistButton onClick={handleWishlistClick}>
            {isWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
            {wishlistCount} 찜하기
          </WishlistButton>
        </ProductInfo>
      </Header>
      <DescriptionSection>
        <Label>상품 설명</Label>
        <Text>{product.description}</Text>
      </DescriptionSection>
      <SellerInfo>
        <SellerImage src={product.seller.image} alt="판매자 이미지" />
        <SellerDetails>
          <SellerName>{product.seller.name}</SellerName>
          <SellerRating>{product.seller.rating}</SellerRating>
        </SellerDetails>
      </SellerInfo>
      <ReviewsSection>
        <Label>판매 후기</Label>
        {product.reviews.map((review, index) => (
          <Review key={index}>
            <ReviewText>{review.text}</ReviewText>
            <ReviewAuthor>{review.author}</ReviewAuthor>
          </Review>
        ))}
      </ReviewsSection>
      <ButtonGroup>
        <Button onClick={handleBuyClick}>채팅하기</Button>
        <Button onClick={handleEditClick}>수정하기</Button>
      </ButtonGroup>
    </Container>
  );
};

export default DetailPage;
