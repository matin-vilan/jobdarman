export interface IUsersResponse {
  email: string;
  username: string;
  id: number;
  refreshToken: string | null;
  accessToken: string | null;
}

export interface IUsersDB extends IUsersResponse {
  password: string;
}

export interface ILoginUser {
  username: string;
  password: string;
}

export interface IRegisterUser {
  username: string;
  password: string;
  email: string;
}
