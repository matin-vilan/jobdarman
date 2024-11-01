import jwt from "jsonwebtoken";
import { getLocalStorage, removeLocalStorage } from "./storage";

const JWT_SECRET = process.env.JWT_SECRET;

export function isTokenExpired(token: string) {
  const decoded = jwt.decode(token);

  // @ts-ignore
  if (!decoded || !decoded.exp) return true;

  const currentTime = Math.floor(Date.now() / 1000);

  // @ts-ignore
  return decoded.exp < currentTime;
}

export function formatToken(authHeader: string) {
  return authHeader.split(" ")[1];
}

export const getAccessToken = () => {
  const authTokens = JSON.parse(String(getLocalStorage("authTokens")));
  if (authTokens?.accessToken) return authTokens.accessToken;
  else return false;
};

export const getRefreshToken = () => {
  const authTokens = JSON.parse(String(getLocalStorage("authTokens")));
  if (authTokens?.refreshToken) return authTokens.refreshToken;
  else return false;
};

export const logOut = () => {
  return removeLocalStorage("authTokens");
};
