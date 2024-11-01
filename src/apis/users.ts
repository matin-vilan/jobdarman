"use client";
import { ResponseType } from "@/types/global";
import { IUsersResponse } from "@/types/users";
import axiosInstance from "@/utils/axios/axiosInstance";

export const getUsers = async () => {
  const result = await axiosInstance.get("/api/users");
  return result as ResponseType<IUsersResponse[]>;
};
