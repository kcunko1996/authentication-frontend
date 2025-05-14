"use server";

import { getAuthToken } from "@/utils/auth/tokens";

export async function refreshAndSetToken() {
  const token = await getAuthToken();

  await fetch("http://localhost:3001/api/refresh", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Cookie: `auth=${token?.value}`,
      Authorization: `Bearer ${token?.value}`,
    },
  });
}
