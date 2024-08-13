import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import axios from "axios";

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
  const { marketId, categoryName } = useParams<{
    marketId: string;
    categoryName: string;
  }>(); // 카테고리 이름과 아이템 ID를 URL에서 가져옴
  const navigate = useNavigate();
  const [product, setProduct] = useState<any | null>(null);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isWishlist, setIsWishlist] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://api.baseball-route.site:8080/market/categories/{categoryName}/items/{marketId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 포함
              "Content-Type": "multipart/form-data",
            },
          }
        );
        setProduct(response.data);
        setWishlistCount(response.data.likeCount);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [marketId, categoryName]); // id와 categoryName이 변경될 때마다 useEffect 재실행

  if (!product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  const handleWishlistClick = () => {
    setIsWishlist(!isWishlist);
    setWishlistCount(isWishlist ? wishlistCount - 1 : wishlistCount + 1);
  };

  const handleBuyClick = () => {
    // 항상 특정 오픈채팅 URL로 이동
    const openChatUrl = "https://open.kakao.com/o/suNbCSHg";
    window.location.href = openChatUrl;
  };

  const handleEditClick = () => {
    navigate(`/market/edit/${marketId}`);
  };

  return (
    <Container>
      <Header>
        <ProductDetail>
          <Label>작성일시</Label>
          <Text>{new Date(product.createdAt).toLocaleString()}</Text>
        </ProductDetail>
        <ProductImage src={product.imageUrl} alt="상품 이미지" />
        <ProductInfo>
          <Title>{product.title}</Title>
          <Price>{product.price}원</Price>
          <ProductDetail>
            <Label>카테고리</Label>
            <Text>{product.categoryName}</Text>
          </ProductDetail>
          <ProductDetail>
            <Label>상품 상태</Label>
            <Text>{product.status}</Text>
          </ProductDetail>
          <WishlistButton onClick={handleWishlistClick}>
            {isWishlist ? <AiFillHeart /> : <AiOutlineHeart />}
            {wishlistCount} 찜하기
          </WishlistButton>
        </ProductInfo>
      </Header>
      <DescriptionSection>
        <Label>상품 설명</Label>
        <Text>{product.content}</Text>
      </DescriptionSection>
      <SellerInfo>
        <SellerImage
          src={product.seller?.image || "/default-seller.jpg"}
          alt="판매자 이미지"
        />
        <SellerDetails>
          <SellerName>{product.seller?.name || "Unknown Seller"}</SellerName>
        </SellerDetails>
      </SellerInfo>
      <ReviewsSection>
        <Label>판매 후기</Label>
        {product.reviews?.map((review: any, index: number) => (
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
