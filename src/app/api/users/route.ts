import { readData, updateData, writeData } from "@/libs/db";
import { EEntities } from "@/types/entities";
import { IUsersDB, IUsersResponse } from "@/types/users";
import axiosInstance from "@/utils/axios/axiosInstanceBackend";
import bcrypt from "bcryptjs";
import { formatResponse } from "@/libs/formatters";
import { AxiosResponse } from "axios";
import { ResponseType } from "@/types/global";
import { formatToken, isTokenExpired } from "@/libs/tokens";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return formatResponse({
      statusCode: 401,
      message: "Authorization header missing",
    });
  }

  if (isTokenExpired(formatToken(authHeader))) {
    return formatResponse({ statusCode: 401, statusText: "token expired" });
  }

  const users: IUsersDB[] = await readData(EEntities.USERS);

  const formattedUsers: IUsersResponse[] = users.map((u) => ({
    ...u,
    password: undefined,
  }));

  return formatResponse({ data: formattedUsers, statusCode: 200 });
}

export async function POST(req: Request) {
  const data = await req.json();
  const users: AxiosResponse<ResponseType<IUsersResponse[]>> =
    await axiosInstance.get("/api/users", {
      headers: { Authorization: req.headers.get("Authorization") },
    });

  const existingUser = users.data.data.find(
    (user) => user.email === data.email || user.username === data.username
  );

  if (existingUser) {
    return formatResponse({
      message: "User with this email or username already exists",
      statusCode: 409,
      statusText: "User with this email or username already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser: IUsersDB = {
    id: Date.now(),
    username: data.username,
    email: data.email,
    password: hashedPassword,
    refreshToken: data.refreshToken,
    accessToken: data.accessToken,
  };

  writeData<IUsersResponse>(EEntities.USERS, newUser);

  return formatResponse({
    data: newUser,
    statusCode: 201,
    statusText: `User ${newUser.username} created. `,
  });
}

export async function PATCH(req: Request) {
  // for replacing refresh token and accessToken with new refresh token and access token
  const data = await req.json();
  const { accessToken, refreshToken, id } = data;

  const users = readData(EEntities.USERS);

  const user: IUsersDB = users.find((u: IUsersDB) => u.id === id);

  if (!user) {
    return formatResponse({
      statusCode: 401,
      statusText: "username and password is not correct.",
    });
  }

  user.refreshToken = refreshToken;
  user.accessToken = accessToken;

  updateData<IUsersDB>(EEntities.USERS, user.id, user);

  return formatResponse({ statusCode: 200, statusText: "" });
}
