import { NextResponse } from "next/server"

const visitorRoutes = ["/login"] // Removed "/" from here
const isPublicRoute = (url) => {
  return visitorRoutes.some((route) => route === url)
}

export async function middleware(request) {
  const authCookie = request.cookies.get("user")
  const pathname = request.nextUrl.pathname

  // Redirect root path to login
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Allow access to public routes without authentication
  if (isPublicRoute(pathname)) {
    return NextResponse.next()
  }

  // Redirect to login if trying to access a protected route without authentication
  if (!authCookie) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Check if the route is not found (i.e., 404)
  const is404 = pathname === "/404"

  // If the user is authenticated and trying to access a 404 page, redirect them to the home page or a specific page
  if (is404) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Additional logic for authenticated users can be added here

  return NextResponse.next()
}

// Applies this middleware only to files in the app directory
export const config = {
  matcher: ["/((?!api|static|.*\\..*|_next).*)"],
}
