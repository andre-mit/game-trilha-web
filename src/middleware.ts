import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  if (!token) {
    if (
      request.nextUrl.pathname === "/login" ||
      request.nextUrl.pathname === "/register"
    ) {
      return NextResponse.next();
    }
    const signInURL = new URL("/login", request.url);
    return NextResponse.redirect(signInURL);
  } else if (
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register"
  ) {
    const homeURL = new URL("/", request.url);
    return NextResponse.redirect(homeURL);
  }
}

export const config = {
  matcher: ["/((?!_next|api/auth).*)(.+)", "/login", "/"],
};
