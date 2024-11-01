import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { IUsersDB } from "@/types/users";
import { readData } from "@/libs/db";
import { EEntities } from "@/types/entities";
import { formatResponse } from "@/libs/formatters";
import axiosInstance from "@/utils/axios/axiosInstanceBackend";
import { EXPIRE_ACCESS_TIME, EXPIRE_REFRESH_TIME } from "@/constants/global";

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

export async function POST(req: Request) {
  const data = await req.json();

  const { username, password } = data;

  const users: IUsersDB[] = readData(EEntities.USERS);

  const user = users.find((u) => u.username === username);

  if (!user) {
    return formatResponse({
      statusCode: 401,
      statusText: "Invalid username!",
    });
  }

  const isMatchedPasswords = await bcrypt.compare(password, user.password);

  if (!isMatchedPasswords) {
    return formatResponse({
      statusCode: 401,
      statusText: "Invalid password!",
    });
  }

  const accessToken = jwt.sign(
    { userId: user.id, username: user.username },
    String(JWT_SECRET),
    { expiresIn: EXPIRE_ACCESS_TIME }
  );

  const refreshToken = jwt.sign({ userId: user.id }, String(REFRESH_SECRET), {
    expiresIn: EXPIRE_REFRESH_TIME,
  });

  await axiosInstance.patch(
    "/api/users",
    {
      id: user.id,
      refreshToken,
      accessToken,
    },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  return formatResponse({
    data: { accessToken, refreshToken },
    statusCode: 200,
    statusText: "Login successful",
  });
}
