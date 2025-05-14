"use server";
import { LoginType } from "@/app/page";
import { api } from "@/utils/api";
import { setAuthToken } from "@/utils/auth/tokens";
import { redirect } from "next/navigation";

export const login = async (data: LoginType) => {
  const { data: loginData, error } = await api.post<{
    accessToken: string;
    refreshToken: string;
  }>(
    "/auth/login",
    {
      email: data.email,
      password: data.password,
    },
    {
      requiresAuth: false,
    }
  );

  if (loginData?.accessToken && loginData.refreshToken) {
    await setAuthToken(JSON.stringify({ ...loginData }));

    redirect("/users");
  }
};
