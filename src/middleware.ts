import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/register", "/forgotpassword"];

export default async function middleware(req: NextRequest) {
  const token = await getToken({ req });

  if (token) {
    if (authRoutes.includes(req.nextUrl.pathname)) {
      const url = new URL("/", req.nextUrl.origin);

      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  }

  if (!token) {
    if (!authRoutes.includes(req.nextUrl.pathname)) {
      const url = new URL("/login", req.nextUrl.origin);
      url.searchParams.set("callbackUrl", req.nextUrl.pathname);

      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
