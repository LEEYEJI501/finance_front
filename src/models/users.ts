import constants from '@/constants';
import { IApiResponse } from '@/types/common';
import { ICheckUsernameResponse } from '@/types/user';

export const getCheckUsernameModel = (res: IApiResponse<ICheckUsernameResponse>) => {
    const success = res.success;

    if (success) {
        const results = res?.data;
        return results?.isDuplicate ?? constants.DEFAULT_BOOL;
    }
    
    return constants.DEFAULT_BOOL;
}