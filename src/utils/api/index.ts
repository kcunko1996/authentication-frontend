import { makeRequest } from "../makeRequest/makeRequest";
import { Config, Response } from "../makeRequest/types";

export const api = {
  get: <T>(path: string, config?: Omit<Config, "method">) =>
    makeRequest<T>(path, { ...config, method: "GET" }),
  post: <T>(
    path: string,
    body?: Record<string, any>,
    config?: Omit<Config, "method" | "body">
  ) => makeRequest<T>(path, { ...config, method: "POST", body }),
  put: <T>(
    path: string,
    body?: Record<string, any>,
    config?: Omit<Config, "method" | "body">
  ) => makeRequest<T>(path, { ...config, method: "PUT", body }),
  patch: <T>(
    path: string,
    body?: Record<string, any>,
    config?: Omit<Config, "method" | "body">
  ) => makeRequest<T>(path, { ...config, method: "PATCH", body }),
  delete: <T>(path: string, config?: Omit<Config, "method">) =>
    makeRequest<T>(path, { ...config, method: "DELETE" }),
};
