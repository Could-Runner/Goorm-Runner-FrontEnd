import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PostWriter: React.FC = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [category, setCategory] = useState("GENERAL");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const postData = {
            title,
            content
        };

        try {
            const response = await fetch(`http://api.baseball-route.site:8080/categories/${category}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) {
                throw new Error("게시글 작성에 실패했습니다.");
            }

            const data = await response.json();
            console.log("작성된 게시글 데이터:", data);
            alert("작성이 완료되었습니다.");
            navigate("/board/general");
        } catch (error) {
            console.error("Error:", error);
            alert("게시글 작성 중 오류가 발생했습니다.");
        }
    };

    return (
        <Container>
            <Title>게시글 작성</Title>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label htmlFor="category">카테고리</Label>
                    <Select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option value="GENERAL">자유게시판</option>
                        <option value="TIP">꿀팁게시판</option>
                        <option value="RESTAURANT">맛집게시판</option>
                    </Select>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="title">제목</Label>
                    <Input
                        id="title"
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="제목을 입력하세요"
                    />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="content">내용</Label>
                    <Textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        placeholder="내용을 입력하세요"
                    />
                </FormGroup>
                <Button type="submit">작성하기</Button>
            </Form>
        </Container>
    );
};

export default PostWriter;


const Container = styled.div`
    margin-top: 50px;
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

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
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

const Select = styled.select`
    width: 100%;
    height: 40px;
    padding: 5px 11px;
    border: 1px solid #dadada;
    background: #fff;
    box-sizing: border-box;
    border-radius: 4px;
    font-size: 16px;
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

const Textarea = styled.textarea`
    width: 100%;
    height: 200px;
    padding: 10px;
    border: 1px solid #dadada;
    background: #fff;
    box-sizing: border-box;
    border-radius: 4px;
    resize: none;
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