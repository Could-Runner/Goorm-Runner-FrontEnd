import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import boardData from "../../../assets/boardcontents.json"
import commentData from "../../../assets/comments.json"
import { BoardData, CommentData } from "../type";

const FoodDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const post = (boardData as BoardData[]).find(item => item.id === parseInt(id!, 10));
    const [likes, setLikes] = useState(post ? post.likes : 0);
    const [comments, setComments] = useState(commentData as CommentData[]);
    const [newComment, setNewComment] = useState("");

    if (!post) {
        return <div>게시글을 찾을 수 없습니다.</div>;
    }

    const handleLike = () => {
        setLikes(likes + 1);
    };

    const handleUnlike = () => {
        setLikes(likes - 1);
    };

    const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewComment(e.target.value);
    };

    const handleCommentSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newCommentData: CommentData = {
            id: comments.length + 1,
            author: "익명",
            content: newComment,
            date: new Date().toISOString().split('T')[0]
        };
        setComments([...comments, newCommentData]);
        setNewComment("");
    };

    return (
        <Container>
            <Table>
                <tbody>
                    <Tr>
                        <Th>제목</Th>
                        <Td>{post.title}</Td>
                    </Tr>
                    <Tr>
                        <Th>작성자</Th>
                        <Td>{post.author}</Td>
                        <Th>등록일</Th>
                        <Td>{post.date}</Td>
                    </Tr>
                    <Tr>
                        <Th>내용</Th>
                        <Td colSpan={3}>{post.content}</Td>
                    </Tr>
                </tbody>
            </Table>
            <Actions>
                <Button onClick={() => navigate('/board/general')}>목록으로</Button>
                <Button onClick={handleLike}>좋아요 {likes}</Button>
                <Button onClick={handleUnlike}>좋아요 취소</Button>
            </Actions>
            <CommentSection>
                <CommentTitle>댓글</CommentTitle>
                <CommentForm onSubmit={handleCommentSubmit}>
                    <CommentInput
                        type="text"
                        placeholder="댓글을 작성해주세요."
                        value={newComment}
                        onChange={handleCommentChange}
                    />
                    <CommentButton type="submit">댓글 쓰기</CommentButton>
                </CommentForm>
                {comments.map(comment => (
                    <Comment key={comment.id}>
                        <CommentAuthor>{comment.author}</CommentAuthor>
                        <CommentContent>{comment.content}</CommentContent>
                        <CommentDate>{comment.date}</CommentDate>
                    </Comment>
                ))}
            </CommentSection>
        </Container>
    );
};

export default FoodDetail;

const Container = styled.div`
    padding: 20px;
    margin: 0 200px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
`;

const Th = styled.th`
    border: 1px solid #ddd;
    padding: 8px;
    background-color: #f2f2f2;
    text-align: left;
    width: 150px;
`;

const Td = styled.td`
    border: 1px solid #ddd;
    padding: 8px;
`;

const Tr = styled.tr`
    border: 1px solid #ddd;
`;

const Actions = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
`;

const Button = styled.button`
    padding: 10px 20px;
    margin: 0 10px;
    background-color: #03c75a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 16px;

    &:hover {
        background-color: #028a3d;
    }
`;

const CommentSection = styled.div`
    margin-top: 40px;
`;

const CommentTitle = styled.h2`
    margin-bottom: 20px;
`;

const Comment = styled.div`
    margin-bottom: 10px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
`;

const CommentAuthor = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
`;

const CommentContent = styled.div`
    margin-bottom: 5px;
`;

const CommentDate = styled.div`
    font-size: 12px;
    color: #999;
`;

const CommentForm = styled.form`
    display: flex;
    align-items: center;
    margin-top: 20px;
`;

const CommentInput = styled.input`
    flex: 1;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin-right: 10px;
`;

const CommentButton = styled.button`
    padding: 10px 20px;
    background-color: #03c75a;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #028a3d;
    }
`;