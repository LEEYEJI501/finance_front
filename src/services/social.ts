import { get, post } from "@/api";
import constants from "@/constants";
import { getCreateCommentModel, getCreatePostModel, getPostDetailModel, getPostsModel } from "@/models/social";
import { IPaging } from "@/types/common";
import { ICreateCommentResponse, ICreatePostDto, ICreatePostResponse, IGetPostsResponse, IPostDetailResponse } from "@/types/social";

const SOCIAL_URL = "social";

export const fetchGetPosts = async (
    code: string,
    paging: IPaging = { 
        page: constants.DEFAULT_PAGING.PAGE, 
        pageSize: constants.DEFAULT_PAGING.PAGESIZE 
    }
) => {
    const response = await get<IGetPostsResponse>(
        `${SOCIAL_URL}/posts/symbol/${code}?page=${paging.page}&pageSize=${paging.pageSize}`
    );
    return getPostsModel(response);
}

export const fetchCreatePost = async (
  createPostDto: ICreatePostDto
) => {
    const { userId, title, author, accountName, content, stockCode } = createPostDto;
    const response = await post<ICreatePostResponse>(
        `${SOCIAL_URL}/posts`, 
        {
            userId,
            title,
            author,
            accountName,
            content,
            stockCode
        },
        true
    );

    return getCreatePostModel(response);
};

export const fetchGetPostDetail = async (
    id: number
) => {
    const response = await get<IPostDetailResponse>(`${SOCIAL_URL}/posts/detail/${id}`);
    return getPostDetailModel(response);
}

export const fetchCreateComment = async (
    id: number,
    userId: number,
    content: string
) => {
    const response = await post<ICreateCommentResponse>(`${SOCIAL_URL}/posts/${id}/comments`, {
        userId,
        content
    }, true);

    return getCreateCommentModel(response);
}

export const fetchCreateReply = async(
    id: number,
    commentId: number,
    userId: number,
    content: string
) => {
    const response = await post<ICreateCommentResponse>(`${SOCIAL_URL}/posts/${id}/comments/${commentId}/reply`, {
        userId,
        content
    }, true);

    return getCreateCommentModel(response);
}