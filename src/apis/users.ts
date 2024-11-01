"use client";
import { ResponseType } from "@/types/global";
import { IUsersResponse } from "@/types/users";
import axiosInstance from "@/utils/axios/axiosInstance";
import { AxiosError, AxiosResponse } from "axios";

export const getUsers = async () => {
  const result = await axiosInstance.get("/api/users");
  return result as ResponseType<IUsersResponse[]>;
};
