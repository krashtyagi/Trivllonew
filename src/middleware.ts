import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const blockedRoutes = ["/bilkes", "/adventures", "/cabs"];

  const pathname = request.nextUrl.pathname;

  const isBlocked = blockedRoutes.some((route) => pathname.startsWith(route));

  if (isBlocked) {
    return NextResponse.redirect(
      new URL("/temporarily-unavailable", request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/bikes/:path*", "/adventures/:path*", "/cabs/:path*"],
};
