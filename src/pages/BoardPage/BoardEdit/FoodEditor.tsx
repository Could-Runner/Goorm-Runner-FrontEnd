import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import boardData from "../../../assets/boardcontents.json";
import { BoardData } from "../type";

const FoodEditor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const post = (boardData as BoardData[]).find(item => item.id === parseInt(id!, 10));
    const [title, setTitle] = useState(post ? post.title : "");
    const [content, setContent] = useState(post ? post.content : "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ id, title, content });
        alert("수정이 완료되었습니다.");
        navigate(`/board/food/${id}`);
    };

    if (!post) {
        return <div>게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <Container>
            <Title>게시글 수정</Title>
            <Form onSubmit={handleSubmit}>
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
                <Button type="submit">수정하기</Button>
            </Form>
        </Container>
    );
};

export default FoodEditor;

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