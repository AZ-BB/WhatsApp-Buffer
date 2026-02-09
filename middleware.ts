import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Global middleware: add security headers and ensure API errors are consistent.
 * Route handlers return their own JSON; this only runs before the handler.
 */
export function middleware(request: NextRequest) {
  const res = NextResponse.next();
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("X-Frame-Options", "DENY");
  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
