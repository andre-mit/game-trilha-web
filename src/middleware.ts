import { NextRequest, NextResponse } from "next/server";

export default function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;

  const signInURL = new URL("/login", request.url);

  if (!token) {
    if (request.nextUrl.pathname === "/login") {
      return NextResponse.next();
    }
    return NextResponse.redirect(signInURL);
  }
}

export const config = {
  matcher: ["/((?!_next|api/auth).*)(.+)", "/login", "/"],
};
