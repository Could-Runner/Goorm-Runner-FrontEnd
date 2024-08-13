import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

const FormGroup = styled.div`
  margin-bottom: 20px;
  text-align: left;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  font-size: 14px;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 5px 11px;
  border: 1px solid #dadada;
  background: #fff;
  box-sizing: border-box;
  border-radius: 4px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #dadada;
  background: #fff;
  box-sizing: border-box;
  border-radius: 4px;
  resize: none;
`;

const Select = styled.select`
  width: 100%;
  height: 40px;
  padding: 5px 11px;
  border: 1px solid #dadada;
  background: #fff;
  box-sizing: border-box;
  border-radius: 4px;
`;

const Button = styled.button`
  font-size: 18px;
  font-weight: 700;
  line-height: 49px;
  width: 100%;
  height: 49px;
  margin: 16px 0;
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

const ImagePreviewContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  border: 1px solid #dadada;
  border-radius: 4px;
`;

const HiddenInput = styled.input`
  display: none;
`;

const CustomImageButton = styled.button`
  display: inline-block;
  font-size: 14px;
  padding: 10px 20px;
  margin-top: 10px;
  cursor: pointer;
  border: 1px solid #dadada;
  border-radius: 4px;
  background-color: #f8f8f8;
  &:hover {
    background-color: #e8e8e8;
  }
`;

const SellPage: React.FC = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [openChatUrl, setOpenChatUrl] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUploadClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    document.getElementById("image")?.click();
  };

  const formatPrice = (value: string) => {
    const numberValue = Number(value.replaceAll(",", ""));
    if (isNaN(numberValue)) return "";
    return new Intl.NumberFormat("ko-KR").format(numberValue);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPrice = formatPrice(e.target.value);
    setPrice(formattedPrice);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !title ||
      !image ||
      !category ||
      !condition ||
      !description ||
      !price ||
      !openChatUrl
    ) {
      alert("모든 필드를 채워주세요.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "request",
      new Blob(
        [
          JSON.stringify({
            title: title, // 사용자가 입력한 상품 제목
            category: category, // 카테고리
            content: description, // 상품 설명
            price: Number(price.replace(/,/g, "")), // 가격에서 쉼표 제거 후 숫자로 변환
            openChatUrl: openChatUrl, // 사용자가 입력한 오픈채팅 URL 추가
          }),
        ],
        { type: "application/json" }
      )
    );

    if (image) {
      formData.append("image", image, image.name);
    }

    const token = localStorage.getItem("authToken");

    try {
      const response = await fetch(
        `http://api.baseball-route.site:8080/market/categories/{categoryName}/items`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`, // 토큰을 Authorization 헤더에 포함
          },
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      const result = await response.json();
      console.log("Submit successful:", result);

      // 게시글 상세 페이지로 리다이렉트
      navigate(`/market/items/${result.marketId}`);
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.");
    }
  };

  return (
    <Container>
      <Title>굿즈 판매글 작성</Title>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="title">제목</Label>
          <Input
            id="title"
            name="title"
            placeholder="판매글 제목을 입력하세요"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="image">상품 이미지</Label>
          <HiddenInput
            id="image"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
          <CustomImageButton onClick={handleImageUploadClick}>
            {imagePreview ? "이미지 변경" : "이미지 업로드"}
          </CustomImageButton>
          {imagePreview && (
            <ImagePreviewContainer>
              <ImagePreview src={imagePreview} alt="상품 이미지 미리보기" />
            </ImagePreviewContainer>
          )}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="category">카테고리</Label>
          <Select
            id="category"
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">카테고리를 선택하세요</option>
            <option value="UNIFORM">유니폼</option>
            <option value="PHOTOCARD">KBO포토카드</option>
            <option value="TICKET">티켓 양도</option>
            <option value="ETC">기타 굿즈</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="condition">상품 상태</Label>
          <Select
            id="condition"
            name="condition"
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
          >
            <option value="">상품 상태를 선택하세요</option>
            <option value="NEW">새상품</option>
            <option value="USED_GOOD">중고상품_상</option>
            <option value="USED_FAIR">중고상품_중</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">상품 설명</Label>
          <TextArea
            id="description"
            name="description"
            placeholder="상품 설명을 입력하세요"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="price">가격</Label>
          <Input
            id="price"
            name="price"
            type="text"
            placeholder="가격을 입력하세요"
            value={price}
            onChange={handlePriceChange}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="openChatUrl">오픈채팅방 링크</Label>
          <Input
            id="openChatUrl"
            name="openChatUrl"
            type="text"
            placeholder="카카오톡 오픈채팅방 링크를 입력하세요"
            value={openChatUrl}
            onChange={(e) => setOpenChatUrl(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">판매글 작성</Button>
      </form>
    </Container>
  );
};

export default SellPage;
