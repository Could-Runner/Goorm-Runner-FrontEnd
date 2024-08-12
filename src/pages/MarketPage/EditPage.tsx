import React, { useState, useEffect } from "react";
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

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [category, setCategory] = useState<string>("UNIFORM");
  const [condition, setCondition] = useState<string>("NEW");
  const [description, setDescription] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [title, setTitle] = useState<string>("");

  useEffect(() => {
    // 여기서 id를 사용해 상품의 현재 데이터를 가져옵니다
    const fetchItemData = async () => {
      try {
        const response = await fetch(
          `/market/categories/${category}/items/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          setTitle(data.title);
          setDescription(data.content);
          setPrice(data.price.toString());
          setImagePreview(data.imageUrl);
          // 기타 상태 업데이트
        } else {
          console.error("Failed to fetch item data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, [id, category]); // id와 category가 변경되면 데이터를 다시 가져옵니다

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
      title: title,
      content: description,
      price: parseInt(price.replace(/,/g, ""), 10), // 가격을 정수로 변환
      delivery: 0, // 예제에서는 배송비를 0으로 설정
      imageUrl: imagePreview || "", // 이미지가 있을 경우 해당 URL을 사용
    };

    try {
      const response = await fetch(
        `http://api.baseball-route.site:8080/market/categories/${category}/items/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_TOKEN_HERE`, // 실제 토큰으로 대체해야 함
          },
          body: JSON.stringify(body),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Updated item:", result);

        navigate(`/market/buy/${id}`);
      } else {
        console.error("Failed to update the item:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
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
            <option value="NEW">새상품</option>
            <option value="USED">중고상품</option>
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
