import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define public paths that don't require authentication
  const isPublicPath = path === "/" || path === "/login" || path === "/register" || path === "/forgot-password"

  // Get the auth token from cookies
  const token = request.cookies.get("auth-token")?.value

  // Check if user is authenticated
  const hasAuthToken = token === "demo-token"

  // Only redirect from /login, /register, /forgot-password if already authenticated
  if (
    hasAuthToken &&
    (path === "/login" || path === "/register" || path === "/forgot-password")
  ) {
    return NextResponse.redirect(new URL("/home", request.url))
  }

  if (!isPublicPath && !hasAuthToken) {
    // If user is not logged in and trying to access a protected path, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/dashboard/:path*",
    "/home/:path*",
    "/asset/:path*",
    "/account/:path*",
    "/maintenance/:path*",
    "/disposals/:path*",
    "/losses/:path*",
    "/settings/:path*",
    "/users/:path*",
    "/audit-log/:path*",
  ],
}
