import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const PostWrtier: React.FC = () => {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 여기에 게시글 작성 로직을 추가하세요 (예: 서버에 POST 요청)
        console.log({ title, author, content });
        // 게시글 작성 후 목록 페이지로 이동
        navigate("/board/general");
    };

    return (
        <Container>
            <Title>게시글 작성</Title>
            <Form onSubmit={handleSubmit}>
                <Label>
                    제목:
                    <Input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </Label>
                <Label>
                    글쓴이:
                    <Input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                    />
                </Label>
                <Label>
                    내용:
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Label>
                <Button type="submit">작성하기</Button>
            </Form>
        </Container>
    );
};

export default PostWrtier;

const Container = styled.div`
    padding: 20px;
    margin: 0 200px;
`;

const Title = styled.h1`
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label`
    margin-bottom: 10px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 8px;
    margin-top: 5px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
    height: 150px;
    resize: none;
`;

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #03c75a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #028a3d;
    }
`;