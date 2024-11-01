import jwt from "jsonwebtoken";
import axiosInstance from "@/utils/axios/axiosInstanceBackend";
import { formatResponse } from "@/libs/formatters";
import { IUsersDB } from "@/types/users";
import { readData } from "@/libs/db";
import { EEntities } from "@/types/entities";
import { EXPIRE_ACCESS_TIME, EXPIRE_REFRESH_TIME } from "@/constants/global";

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

export async function POST(req: Request) {
  const data = await req.json();
  const { username, email, password } = data;

  if (!username || !email || !password) {
    return formatResponse({
      statusCode: 400,
      statusText: "All fields are required",
    });
  }

  const newUser: IUsersDB = {
    id: Date.now(),
    username,
    email,
    password: password,
    refreshToken: null,
    accessToken: null,
  };

  const users: IUsersDB[] = readData(EEntities.USERS);

  const isUserExist = users.find((u) => u.username === username);

  if (isUserExist) {
    return formatResponse({
      statusCode: 403,
      message: "User with this credential already exists.",
    });
  }

  const accessToken = jwt.sign(
    { userId: newUser.id, username: newUser.username },
    String(JWT_SECRET),
    { expiresIn: EXPIRE_ACCESS_TIME }
  );
  const refreshToken = jwt.sign(
    { userId: newUser.id },
    String(REFRESH_SECRET),
    {
      expiresIn: EXPIRE_REFRESH_TIME,
    }
  );

  newUser.refreshToken = refreshToken;
  newUser.accessToken = accessToken;

  await axiosInstance.post("/api/users", newUser, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return formatResponse({
    data: { accessToken, refreshToken },
    statusCode: 201,
    statusText: "User registered successfully",
  });
}
