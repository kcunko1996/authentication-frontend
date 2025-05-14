export type HeadersRecord = Record<string, string>;

export interface Config extends Pick<RequestInit, "method" | "credentials"> {
  url?: string;
  body?: Record<any, any>;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
}

export type Response<T> = {
  data?: T;
  error?: {
    status?: number;
    message: string;
  } | null;
};
