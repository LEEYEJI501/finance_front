export interface ICreatePostDto {
    userId: number
    title: string
    author: string
    accountName: string
    content: string
    stockCode: string
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
    comments: any[] | null;
}

export interface IGetPostsResponse {
    posts: {
        total_elements: number
        total_pages: number
        posts: IPost[]
        current_page: number
    }
}

export interface ICreatePostResponse {
    post: {
        post_stock_name: string
        post_id: number
        user_id: number
        post_stock_code: string
    }
}

export interface IPostDetailResponse {
    post: IPost;
}