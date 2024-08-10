import { post } from '@/api';
import { IEmailSendResponse } from '@/types/email';

const EMAIL_URL = 'email';

export const fetchEmailSend = async (
  email: string
): Promise<IEmailSendResponse> => {
  const response = await post<IEmailSendResponse>(
    `${EMAIL_URL}/send`,
    {
      email
    }
  );

  return response;
};

export const fetchEmailVerify = async(
    email: string,
    code: string
): Promise<any> => {
    const response = await post<any>(
        `${EMAIL_URL}/verify`,
        {
            email,
            code
        }
    );

    return response;
}