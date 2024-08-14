import constants from '@/constants';
import { IApiResponse } from '@/types/common';
import { IGetPostsResponse } from "@/types/social";

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