// 게시글 데이터 타입 정의
export interface BoardData {
    id: number;
    title: string;
    author: string;
    date: string;
    likes: number;
    content: string;
}

// content를 제외한 데이터의 타입 정의
export interface BoardDataWithoutContent {
    id: number;
    title: string;
    author: string;
    date: string;
    likes: number;
}

// 댓글 타입 정의
export interface CommentData {
    id: number;
    author: string;
    content: string;
    date: string;
}