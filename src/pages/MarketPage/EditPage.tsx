import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const EditPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  // 수정 폼의 초기 값을 설정
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState("유니폼");
  const [condition, setCondition] = useState("새상품");
  const [description, setDescription] = useState(
    "안녕하세요, 최강야구 팬 여러분! 최강야구 어센틱 유니폼을 판매합니다. 이 유니폼은 선수들이 실제 경기에서 입는 고퀄리티의 제품으로, 마킹이 없는 상태입니다. 정가는 110,000원인데, 저는 50,000원에 판매하고자 합니다."
  );
  const [price, setPrice] = useState("50,000");

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 폼 제출 로직을 추가하세요

    console.log("Image:", image);
    console.log("Category:", category);
    console.log("Condition:", condition);
    console.log("Description:", description);
    console.log("Price:", price);

    // 수정 완료 후 상세 페이지로 이동
    navigate(`/market/buy/${id}`);
  };

  return (
    <Container>
      <Title>제품 수정</Title>
      <form onSubmit={handleSubmit}>
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
            <option value="유니폼">유니폼</option>
            <option value="KBO포토카드">KBO포토카드</option>
            <option value="티켓양도">티켓양도</option>
            <option value="싸인볼">싸인볼</option>
            <option value="기타굿즈">기타굿즈</option>
            {/* 다른 카테고리를 추가 */}
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
            <option value="새상품">새상품</option>
            <option value="중고상품">중고상품</option>
            {/* 다른 상태를 추가 */}
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">상품 설명</Label>
          <TextArea
            id="description"
            name="description"
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
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormGroup>
        <Button type="submit">수정 완료</Button>
      </form>
    </Container>
  );
};

export default EditPage;
