import { IApiResponse } from '@/types/common';
import { ILoginResponse } from '@/types/auth';
import constants from '@/constants';

export const getLoginModel = (res: IApiResponse<ILoginResponse>) => {
    const success = res.success;

    const user = {
        id: String(constants.DEFAULT_NUM),
        username: constants.DEFAULT_STR
    }

    if (success) {
        const results = res?.data;
        user.username = results?.user.username ?? constants.DEFAULT_STR;
        user.id = results?.user.id ?? String(constants.DEFAULT_NUM);
        
        return {
            token: results?.token ?? constants.DEFAULT_STR,
            user
        }
    }
    
    return {
        token: constants.DEFAULT_STR,
        user
    };
}