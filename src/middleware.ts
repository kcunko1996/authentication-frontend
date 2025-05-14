import { NextRequest, NextResponse } from "next/server";
import { jwtDecode } from "jwt-decode";
import { api } from "./utils/api";

const PROTECTED_ROUTES = ["/users", "/profile", "/settings"];

interface DecodedToken {
  exp: number;
  iat: number;
}

const redirectAfterFailedRefresh = (request: NextRequest) => {
  const url = request.nextUrl.clone();
  url.pathname = "/";
  const response = NextResponse.redirect(url);
  response.cookies.delete("auth");
  return response;
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const authCookie = request.cookies.get("auth");
  const originalUserAgent = request.headers.get("user-agent");

  if (!authCookie && PROTECTED_ROUTES.includes(pathname)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  if (authCookie && PROTECTED_ROUTES.includes(pathname)) {
    try {
      const parsedAccessToken = JSON.parse(authCookie.value).accessToken;
      const decoded = jwtDecode<DecodedToken>(parsedAccessToken);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (!isExpired) return NextResponse.next();

      const { data, error } = await api.get<{
        accessToken: string;
        refreshToken: string;
        deviceId: string;
      }>("/auth/refresh", {
        headers: {
          "X-Original-User-Agent": originalUserAgent || "Next.js Client",
        },
      });

      if (error) return redirectAfterFailedRefresh(request);

      const response = NextResponse.next();

      response.cookies.set({
        name: "auth",
        value: JSON.stringify(data),
        httpOnly: true,
        path: "/",
        secure: true,
      });

      return response;
    } catch (error) {
      return redirectAfterFailedRefresh(request);
    }
  }
}
