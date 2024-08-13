import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import boardData from "../../../assets/boardcontents.json";
import commentData from "../../../assets/comments.json";
import { BoardData, CommentData } from "../type";


const GeneralDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const post = (boardData as BoardData[]).find(item => item.id === parseInt(id!, 10));
    const [likes, setLikes] = useState(post ? post.likes : 0);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState(commentData as CommentData[]);
    const [newComment, setNewComment] = useState("");
    const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
    const [editedComment, setEditedComment] = useState("");

    if (!post) {
        return <div>게시글을 찾을 수 없습니다.</div>;
    }

    const handleLikeToggle = () => {
        if (liked) {
            setLikes(likes - 1);
        } else {
            setLikes(likes + 1);
        }
        setLiked(!liked);
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

    const handleEdit = () => {
        navigate(`/board/general/edit/${id}`);
    };

    const handleEditComment = (commentId: number) => {
        const commentToEdit = comments.find(comment => comment.id === commentId);
        if (commentToEdit) {
            setEditingCommentId(commentId);
            setEditedComment(commentToEdit.content);
        }
    };

    const handleUpdateComment = (e: React.FormEvent) => {
        e.preventDefault();
        setComments(comments.map(comment => 
            comment.id === editingCommentId ? { ...comment, content: editedComment } : comment
        ));
        setEditingCommentId(null);
        setEditedComment("");
    };

    const handleDeleteComment = (commentId: number) => {
        setComments(comments.filter(comment => comment.id !== commentId));
    };

    return (
        <Container>
            <Table>
                <tbody>
                    <Tr>
                        <Th>제목</Th>
                        <Td colSpan={3}>{post.title}</Td>
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
                <Button onClick={() => navigate('/board/tips')}>목록으로</Button>
                <LikeButton liked={liked} onClick={handleLikeToggle}>
                    {liked ? `좋아요 취소 ${likes}` : `좋아요 ${likes}`}
                </LikeButton>
                <Button onClick={handleEdit}>수정하기</Button>
            </Actions>
            <CommentSection>
                <CommentTitle>댓글</CommentTitle>
                <CommentForm onSubmit={editingCommentId ? handleUpdateComment : handleCommentSubmit}>
                    <CommentInput
                        type="text"
                        placeholder="댓글을 작성해주세요."
                        value={editingCommentId ? editedComment : newComment}
                        onChange={e => editingCommentId ? setEditedComment(e.target.value) : handleCommentChange(e)}
                    />
                    <CommentButton type="submit">
                        {editingCommentId ? "수정 완료" : "댓글 쓰기"}
                    </CommentButton>
                </CommentForm>
                {comments.map(comment => (
                    <Comment key={comment.id}>
                    <CommentContentWrapper>
                        <CommentAuthor>{comment.author}</CommentAuthor>
                        <CommentContent>{comment.content}</CommentContent>
                        <CommentDate>{comment.date}</CommentDate>
                    </CommentContentWrapper>
                    <CommentActions>
                        <EditButton onClick={() => handleEditComment(comment.id)}>수정</EditButton>
                        <DeleteButton onClick={() => handleDeleteComment(comment.id)}>삭제</DeleteButton>
                    </CommentActions>
                </Comment>
                ))}
            </CommentSection>
        </Container>
    );
};

export default GeneralDetail;
// const GeneralDetail: React.FC = () => {
//     const { id } = useParams<{ id: string }>();
//     const navigate = useNavigate();
//     const [post, setPost] = useState<PostDetail | null>(null);
//     const [comments, setComments] = useState<CommentData[]>([]);
//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState<string | null>(null);
//     const [likes, setLikes] = useState(0);
//     const [liked, setLiked] = useState(false);
//     const [newComment, setNewComment] = useState("");
//     const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
//     const [editedComment, setEditedComment] = useState("");

//     const token = localStorage.getItem("authToken");

//     useEffect(() => {
//         const fetchPostData = async () => {
//             try {
//                 const response = await fetch(`http://api.baseball-route.site:8080/categories/GENERAL/posts/${id}`, {
//                     method: 'GET',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         "Authorization": `Bearer ${token}`,
//                     },
//                 });
    
//                 if (!response.ok) {
//                     throw new Error("Failed to fetch post data");
//                 }
//                 const data: PostDetail = await response.json();
//                 setPost(data);
//                 setLikes(data.likeCount);
//             } catch (err: any) {
//                 setError(err.message);
//             } finally {
//                 setLoading(false);
//             }
//         };

//         const fetchComments = async () => {
//             try {
//                 const response = await fetch(
//                     `http://api.baseball-route.site:8080/categories/GENERAL/posts/${id}/comments`,
//                     {
//                         method: 'GET',
//                         headers: {
//                             'Content-Type': 'application/json',
//                         },
//                     }
//                 );

//                 if (!response.ok) {
//                     throw new Error("Failed to fetch comments data");
//                 }

//                 const data = await response.json();
//                 setComments(data.overviews || []);
//             } catch (err: any) {
//                 setError(err.message);
//             }
//         };

//         fetchPostData();
//         fetchComments();
//     }, [id]);

//     const handleLikeToggle = () => {
//         if (liked) {
//             setLikes(likes - 1);
//         } else {
//             setLikes(likes + 1);
//         }
//         setLiked(!liked);
//     };

//     const handleCommentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setNewComment(e.target.value);
//     };

//     const handleCommentSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         try {
//             const response = await fetch(
//                 `http://api.baseball-route.site:8080/categories/GENERAL/posts/${id}/comments`,
//                 {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`,
//                     },
//                     body: JSON.stringify({
//                         content: newComment,
//                     }),
//                 }
//             );

//             if (!response.ok) {
//                 throw new Error("Failed to post comment");
//             }

//             const newCommentData: CommentData = await response.json();
//             setComments([...comments, newCommentData]);
//             setNewComment("");
//         } catch (err: any) {
//             console.error("Error:", err.message);
//             alert("댓글 작성 중 오류가 발생했습니다.");
//         }
//     };

//     const handleEditComment = (commentId: number) => {
//         const commentToEdit = comments.find(comment => comment.id === commentId);
//         if (commentToEdit) {
//             setEditingCommentId(commentId);
//             setEditedComment(commentToEdit.content);
//         }
//     };

//     const handleUpdateComment = async (e: React.FormEvent) => {
//         e.preventDefault();

//         try {
//             const response = await fetch(
//                 `http://api.baseball-route.site:8080/categories/GENERAL/posts/${id}/comments/${editingCommentId}`,
//                 {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type': 'application/json',
//                         'Authorization': `Bearer ${token}`,
//                     },
//                     body: JSON.stringify({
//                         content: editedComment,
//                     }),
//                 }
//             );

//             if (!response.ok) {
//                 throw new Error("Failed to update comment");
//             }

//             const updatedCommentData: CommentData = await response.json();
//             setComments(comments.map(comment =>
//                 comment.id === editingCommentId ? updatedCommentData : comment
//             ));
//             setEditingCommentId(null);
//             setEditedComment("");
//         } catch (err: any) {
//             console.error("Error:", err.message);
//             alert("댓글 수정 중 오류가 발생했습니다.");
//         }
//     };

//     const handleDeleteComment = async (commentId: number) => {
//         try {
//             const response = await fetch(
//                 `http://api.baseball-route.site:8080/categories/GENERAL/posts/${id}/comments/${commentId}`,
//                 {
//                     method: 'DELETE',
//                     headers: {
//                         'Authorization': `Bearer ${token}`,
//                     },
//                 }
//             );

//             if (!response.ok) {
//                 throw new Error("Failed to delete comment");
//             }

//             setComments(comments.filter(comment => comment.id !== commentId));
//         } catch (err: any) {
//             console.error("Error:", err.message);
//             alert("댓글 삭제 중 오류가 발생했습니다.");
//         }
//     };

//     return (
//         <Container>
//             <Table>
//                 <tbody>
//                     <Tr>
//                         <Th>제목</Th>
//                         <Td colSpan={3}>{post ? post.title : "제목 없음"}</Td>
//                     </Tr>
//                     <Tr>
//                         <Th>작성자</Th>
//                         <Td>{post ? post.categoryName : "알 수 없음"}</Td>
//                         <Th>등록일</Th>
//                         <Td>{post ? post.createdAt : "알 수 없음"}</Td>
//                     </Tr>
//                     <Tr>
//                         <Th>내용</Th>
//                         <Td colSpan={3}>{post ? post.content : "내용 없음"}</Td>
//                     </Tr>
//                 </tbody>
//             </Table>
//             <Actions>
//                 <Button onClick={() => navigate('/board/general')}>목록으로</Button>
//                 <LikeButton liked={liked} onClick={handleLikeToggle}>
//                     {liked ? `좋아요 취소 ${likes}` : `좋아요 ${likes}`}
//                 </LikeButton>
//                 <Button onClick={() => navigate(`/board/general/edit/${id}`)}>수정하기</Button>
//             </Actions>
//             <CommentSection>
//                 <CommentTitle>댓글</CommentTitle>
//                 <CommentForm onSubmit={editingCommentId ? handleUpdateComment : handleCommentSubmit}>
//                     <CommentInput
//                         type="text"
//                         placeholder="댓글을 작성해주세요."
//                         value={editingCommentId ? editedComment : newComment}
//                         onChange={e => editingCommentId ? setEditedComment(e.target.value) : handleCommentChange(e)}
//                     />
//                     <CommentButton type="submit">
//                         {editingCommentId ? "수정 완료" : "댓글 쓰기"}
//                     </CommentButton>
//                 </CommentForm>
//                 {comments.length > 0 ? (
//                     comments.map(comment => (
//                         <Comment key={comment.id}>
//                             <CommentContentWrapper>
//                                 <CommentAuthor>{comment.authorName}</CommentAuthor>
//                                 <CommentContent>{comment.content}</CommentContent>
//                                 <CommentDate>{comment.createdAt}</CommentDate>
//                             </CommentContentWrapper>
//                             <CommentActions>
//                                 <EditButton onClick={() => handleEditComment(comment.id)}>수정</EditButton>
//                                 <DeleteButton onClick={() => handleDeleteComment(comment.id)}>삭제</DeleteButton>
//                             </CommentActions>
//                         </Comment>
//                     ))
//                 ) : (
//                     <div>댓글이 없습니다.</div>
//                 )}
//             </CommentSection>
//         </Container>
//     );
// };

// export default GeneralDetail;

const Container = styled.div`
    margin-top: 50px;
    padding: 20px;
    padding-top: 30px;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #dadada;
    border-radius: 8px;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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

const LikeButton = styled(Button)<{ liked: boolean }>`
    background-color: ${({ liked }) => (liked ? '#ccc' : '#ff0707')};

    &:hover {
        background-color: ${({ liked }) => (liked ? '#bbb' : '#e60000')};
    }
`;

const CommentSection = styled.div`
    margin-top: 40px;
`;

const CommentTitle = styled.h2`
    margin-bottom: 20px;
    font-size: 24px;
    color: #333;
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

const CommentContentWrapper = styled.div`
    flex: 1;
`;

const CommentActions = styled.div`
    display: flex;
    gap: 10px;
`;

const EditButton = styled.button`
    padding: 5px 10px;
    background-color: #03a9f4;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: #0288d1;
    }
`;

const DeleteButton = styled.button`
    padding: 5px 10px;
    background-color: #f44336;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;

    &:hover {
        background-color: #d32f2f;
    }
`;
    

const CommentForm = styled.form`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
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
const NoCommentMessage = styled.div`
    padding: 20px; 
    text-align: center; 
    color: #999; 
    border: 1px solid #ddd; 
    border-radius: 5px; 
    background-color: #f9f9f9;
`;