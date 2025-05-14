"use server";

import { deleteAuthToken, setAuthToken } from "@/utils/auth/tokens";

export async function handleTokenRefresh(accessToken: string) {
  await setAuthToken(accessToken);
}

export async function handleLogout() {
  await deleteAuthToken();
}
