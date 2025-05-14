"use server";
import { cookies } from "next/headers";

const TOKEN = "auth";

const isSecure = false;

type AuthToken = {
  accessToken: string;
  refreshToken: string;
  deviceId: string;
};

export const getAuthToken = async (): Promise<AuthToken> => {
  const cookieStore = await cookies();
  const authToken = cookieStore.get(TOKEN);

  if (!authToken) throw Error("No auth token");

  try {
    const parsedToken = JSON.parse(authToken.value);

    return parsedToken;
  } catch (error) {
    throw Error("Invalid auth token format");
  }
};

export const setAuthToken = async (value: any) => {
  const cookieStore = await cookies();

  return cookieStore.set(TOKEN, value, {
    secure: isSecure,
    httpOnly: true,
  });
};

export const deleteAuthToken = async () => {
  const cookieStore = await cookies();

  await cookieStore.delete(TOKEN);
};
