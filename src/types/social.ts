export interface ICreatePostDto {
    userId: number
    title: string
    author: string
    accountName: string
    content: string
    stockCode: string
}

export interface IComment {
    id: number;
    content: string;
    createdAt: string;
    likes: number;
    parentCommentId: number | null;
    postId: number;
    userId: number;
    username: string;
    likedByUser: boolean;
}

export interface IPost {
    id: number
    accountName: string
    author: string
    content: string
    createdAt: string
    likes: number
    title: string
    userId: number
    views: number
    comments: IComment[] | null;
}

export interface IGetPostsResponse {
    results: {
        total_elements: number
        total_pages: number
        posts: IPost[]
        current_page: number
    }
}

export interface ICreatePostResponse {
    results: {
        post_stock_name: string
        post_id: number
        user_id: number
        post_stock_code: string
    }
}

export interface IPostDetailResponse {
    results: IPost;
}

export interface ICreateCommentResponse {
    results: IComment;
}

export interface ICreateReplyResponse {
    results: IComment;
}

export interface IDeleteCommentResponse {
    results: {
        deletedCommentIds: number[];
    }
}