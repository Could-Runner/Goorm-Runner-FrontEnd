import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import boardData from "../../../assets/boardcontents.json";
import { BoardData } from "../type";

const GeneralEditor: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const post = (boardData as BoardData[]).find(item => item.id === parseInt(id!, 10));
    const [title, setTitle] = useState(post ? post.title : "");
    const [content, setContent] = useState(post ? post.content : "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // 여기에 게시글 수정 로직을 추가하세요 (예: 서버에 PUT 요청)
        console.log({ id, title, content });
        // 게시글 수정 후 상세 페이지로 이동
        navigate(`/board/general/${id}`);
    };

    if (!post) {
        return <div>게시글을 찾을 수 없습니다.</div>;
    }

    return (
        <Container>
            <Title>게시글 수정</Title>
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
                    내용:
                    <Textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />
                </Label>
                <Button type="submit">수정하기</Button>
            </Form>
        </Container>
    );
};

export default GeneralEditor;

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