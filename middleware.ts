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

  // Redirect logic
  if (isPublicPath && hasAuthToken) {
    // If user is logged in and trying to access a public path, redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url))
  }

  if (!isPublicPath && !hasAuthToken) {
    // If user is not logged in and trying to access a protected path, redirect to login
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/",
    "/login",
    "/register",
    "/forgot-password",
    "/dashboard/:path*",
    "/assets/:path*",
    "/forms/:path*",
    "/maintenance/:path*",
    "/disposals/:path*",
    "/losses/:path*",
    "/settings/:path*",
    "/users/:path*",
    "/audit-log/:path*",
  ],
}
