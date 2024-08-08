interface ILoginResponse {
  token: string;
  user: {
    id: string;
    username: string;
  };
}
