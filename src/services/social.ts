import { get, post } from "@/api";
import constants from "@/constants";
import { getPostsModel } from "@/models/posts";
import { IPaging } from "@/types/common";
import { ICreatePostDto } from "@/types/social";

const SOCIAL_URL = "social";

export const fetchGetPosts = async (
    paging: IPaging = { 
        page: constants.DEFAULT_PAGING.PAGE, 
        pageSize: constants.DEFAULT_PAGING.PAGESIZE 
    }
) => {
    const response = await get<any>(
        `${SOCIAL_URL}/posts?page=${paging.page}&pageSize=${paging.pageSize}`
    );
    return getPostsModel(response);
}

export const fetchCreatePost = async (
  createPostDto: ICreatePostDto
) => {
    const { userId, title, author, accountName, content, stockCode } = createPostDto;
    const response = await post<any>(
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

    return response;
};
