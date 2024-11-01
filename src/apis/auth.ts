import { setLocalStorage } from "@/libs/storage";
import { ResponseType } from "@/types/global";
import {
  ILoginUser as ILoginUserDTO,
  IRegisterUser as IRegisterUserDTO,
  IUsersResponse,
} from "@/types/users";
import axiosInstance from "@/utils/axios/axiosInstance";

export const loginUser = async (data: ILoginUserDTO) => {
  const result = await axiosInstance.post("/api/auth/login", data);
  setLocalStorage({
    name: "authTokens",
    value: JSON.stringify({
      accessToken: result.data.accessToken,
      refreshToken: result.data.refreshToken,
    }),
  });
  return result as ResponseType<IUsersResponse>;
};

export const registerUser = async (data: IRegisterUserDTO) => {
  const result = await axiosInstance.post("/api/auth/register", data);
  setLocalStorage({
    name: "authTokens",
    value: JSON.stringify({
      accessToken: result.data.accessToken,
      refreshToken: result.data.refreshToken,
    }),
  });
  return result as ResponseType<IUsersResponse>;
};
