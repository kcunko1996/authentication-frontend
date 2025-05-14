"use server";

import { getAuthToken } from "../auth/tokens";
import { Config, HeadersRecord, Response } from "./types";

const DEFAULT_CONFIG = {
  baseUrl: process.env.API_URL,
  requiresAuth: true,
};
export async function makeRequest<T>(
  path: string,
  config?: Config
): Promise<Response<T>> {
  const {
    url = DEFAULT_CONFIG.baseUrl,
    headers = {},
    method = "GET",
    credentials = "include",
    requiresAuth = true,
  } = config || {};

  const defaultHeaders: HeadersRecord = {
    Accept: "application/json",
    "Content-Type": "application/json",
    ...headers,
  };

  try {
    if (requiresAuth) {
      const token = await getAuthToken();

      defaultHeaders["Authorization"] = `Bearer ${token.accessToken}`;
      defaultHeaders["Cookie"] = `auth=${JSON.stringify(token)}`;
    }

    const response = await fetch(url + path, {
      ...(config?.body && { body: JSON.stringify(config?.body) }),
      method,
      credentials,
      headers: defaultHeaders,
    });

    if (!response.ok) {
      const errorText = await response.text();

      return {
        error: {
          status: response.status,
          message: `An error has occurred: ${response.statusText} - ${errorText}`,
        },
      };
    }

    const data = await response.json();

    return { data };
  } catch (error) {
    return { error: { message: (error as Error).message } };
  }
}
