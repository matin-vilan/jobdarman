import jwt from "jsonwebtoken";
import { readData } from "@/libs/db";
import { EEntities } from "@/types/entities";
import { formatResponse } from "@/libs/formatters";
import { IUsersDB } from "@/types/users";
import { EXPIRE_ACCESS_TIME } from "@/constants/global";

const JWT_SECRET = process.env.JWT_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

export async function POST(req: Request) {
  const data = await req.json();

  const { refreshToken } = data;

  if (!refreshToken) {
    return formatResponse({
      statusCode: 401,
      statusText: "Refresh token missing",
    });
  }

  try {
    const decoded = jwt.verify(refreshToken, String(REFRESH_SECRET));

    if (typeof decoded !== "string" && "userId" in decoded) {
      const users: IUsersDB[] = readData(EEntities.USERS);

      const user = users.find(
        (u) => u.id === decoded.userId && u.refreshToken === refreshToken
      );

      if (!user) {
        return formatResponse({
          statusCode: 403,
          statusText: "Invalid refresh token",
        });
      }

      const newAccessToken = jwt.sign(
        { userId: user.id, username: user.username },
        String(JWT_SECRET),
        { expiresIn: EXPIRE_ACCESS_TIME }
      );
      return formatResponse({
        statusCode: 200,
        data: { accessToken: newAccessToken, refreshToken },
      });
    }
  } catch (error) {
    return formatResponse({
      data: error,
      statusCode: 403,
      statusText: "Invalid refresh token",
    });
  }
}
