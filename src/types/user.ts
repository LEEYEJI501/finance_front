export interface ICheckUsernameResponse {
  isDuplicate: boolean;
}

export interface ISignUpResponse {
  username: string;
  password: string;
  email: string;
  profileImage?: File;
}
