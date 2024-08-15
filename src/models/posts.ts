import constants from '@/constants';
import { IApiResponse } from '@/types/common';
import { ICreatePostResponse, IGetPostsResponse, IPostDetailResponse } from "@/types/social";

export const getPostsModel = (res: IApiResponse<IGetPostsResponse>) => {
    const success = res.success;

    if (success) {
        const results = res?.data;
        const posts = results?.posts;

        return {
            total_elements: posts?.total_elements ?? constants.DEFAULT_NUM,
            current_page: posts?.current_page ?? constants.DEFAULT_NUM,
            total_pages: posts?.total_pages ?? constants.DEFAULT_NUM,
            posts: posts?.posts ?? constants.DEFAULT_ITEMS
        }
    }
    
    return {
        total_elements: constants.DEFAULT_NUM,
        current_page: constants.DEFAULT_NUM,
        total_pages: constants.DEFAULT_NUM,
        posts: constants.DEFAULT_ITEMS
    }
}

export const getCreatePostModel = (res: IApiResponse<ICreatePostResponse>) => {
    const success = res.success;

    if (success) {
        const results = res.data;
        const post = results?.post;

        return {
            postStockName: post?.post_stock_name ?? constants.DEFAULT_STR,
            postId: post?.post_id ?? constants.DEFAULT_NUM,
            userId: post?.user_id ?? constants.DEFAULT_NUM,
            postStockCode: post?.post_stock_code ?? constants.DEFAULT_STR
        }
    }

    return {
        postStockName: constants.DEFAULT_STR,
        postId: constants.DEFAULT_NUM,
        userId: constants.DEFAULT_NUM,
        postStockCode: constants.DEFAULT_STR
    }
}

export const getPostDetailModel = (res: IApiResponse<IPostDetailResponse>) => {
    const success = res.success;

    if (success) {
        const postData = res.data?.post;

        return {
            id: postData?.id ?? constants.DEFAULT_NUM,
            accountName: postData?.accountName ?? constants.DEFAULT_STR,
            author: postData?.author ?? constants.DEFAULT_STR,
            content: postData?.content ?? constants.DEFAULT_STR,
            createdAt: postData?.createdAt ?? constants.DEFAULT_STR,
            likes: postData?.likes ?? constants.DEFAULT_NUM,
            title: postData?.title ?? constants.DEFAULT_STR,
            userId: postData?.userId ?? constants.DEFAULT_NUM,
            views: postData?.views ?? constants.DEFAULT_NUM,
            comments: postData?.comments ?? constants.DEFAULT_ITEMS
        };
    }

    return {
        id: constants.DEFAULT_NUM,
        accountName: constants.DEFAULT_STR,
        author: constants.DEFAULT_STR,
        content: constants.DEFAULT_STR,
        createdAt: constants.DEFAULT_STR,
        likes: constants.DEFAULT_NUM,
        title: constants.DEFAULT_STR,
        userId: constants.DEFAULT_NUM,
        views: constants.DEFAULT_NUM,
        comments: constants.DEFAULT_ITEMS
    };
}