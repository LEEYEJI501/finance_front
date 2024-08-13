import { post } from "@/api";
import { IEmailSendResponse, IEmailVerifyResponse } from "@/types/email";
import { IApiResponse } from '@/types/common';
import { getEmailVerify } from '@/models/email'

const EMAIL_URL = "email";

export const fetchEmailSend = async (
  email: string
): Promise<IApiResponse<IEmailSendResponse>> => {
  const response = await post<IEmailSendResponse>(`${EMAIL_URL}/send`, {
    email,
  });

  return response;
};

export const fetchEmailVerify = async (
  email: string,
  code: string
): Promise<IApiResponse<IEmailVerifyResponse>> => {
  const response = await post<IEmailVerifyResponse>(
    `${EMAIL_URL}/verify`,
    {
      email,
      code,
    },
  );

  return getEmailVerify(response);
};
