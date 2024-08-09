export interface ILoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}

export interface ICheckUsernameResponse {
  isDuplicate: boolean;
}
