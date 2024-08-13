import { IApiResponse } from '@/types/common';
import { IEmailSendResponse, IEmailVerifyResponse } from "@/types/email";

export const getEmailVerify = (res: IApiResponse<IEmailVerifyResponse>) => {
    const success = res.success;

    if (success) {
        const results = res?.data;

        const isValid = results?.isValid ?? false;
        
        return isValid;
    }
    
    return false;
}