import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateToken } from "@/utils/jwt/validateToken";
import BaseResponse from "@/types/BaseResponse";

export const config = {
  matcher: "/api/:path*",
};

const UNPROTECTED_ROUTES = [
  "/api/auth/login",
  "/api/auth/login/:projectId*",
  "/api/auth/logout",
  "/api/auth/validate",
  "/api/image/upload",
];

// Add your allowed origins here
const ALLOWED_ORIGINS = [
  "https://arafinnovations.com",
  "http://localhost:3000",
  // Add other allowed origins as needed
  "https://goat-boots.vercel.app",
];

export async function middleware(request: NextRequest) {
  const origin = request.headers.get("origin") || "";

  // Handle preflight requests
  if (request.method === "OPTIONS") {
    return new NextResponse(null, {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": ALLOWED_ORIGINS.includes(origin)
          ? origin
          : ALLOWED_ORIGINS[0],
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
        "Access-Control-Max-Age": "86400",
      },
    });
  }

  const { pathname } = request.nextUrl;

  console.log(pathname);

  // Check if the pathname matches any unprotected route pattern
  const isUnprotectedRoute = UNPROTECTED_ROUTES.some((route) => {
    if (route.includes(":projectId")) {
      // Convert the route pattern to a regex
      const pattern = route.replace(":projectId*", "[^/]+");
      return new RegExp(`^${pattern}$`).test(pathname);
    }
    return pathname === route;
  });

  // Omitir validación en rutas no protegidas
  if (isUnprotectedRoute) {
    const response = NextResponse.next();
    if (ALLOWED_ORIGINS.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set("Access-Control-Allow-Credentials", "true");
    }
    return response;
  }

  const authHeader = request.headers.get("authorization");
  // Buscar token en cookies
  let token = authHeader?.substring(7);

  if (!token) {
    const response = NextResponse.json(
      {
        message: "No Auth token provided",
      } as BaseResponse,
      {
        status: 403,
      }
    );
    if (ALLOWED_ORIGINS.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set("Access-Control-Allow-Credentials", "true");
    }
    return response;
  }

  // Validar token
  const { error, status } = await validateToken(token);

  if (error) {
    const response = NextResponse.json(
      {
        message: error,
      } as BaseResponse,
      {
        status: status,
      }
    );
    if (ALLOWED_ORIGINS.includes(origin)) {
      response.headers.set("Access-Control-Allow-Origin", origin);
      response.headers.set("Access-Control-Allow-Credentials", "true");
    }
    return response;
  }

  const response = NextResponse.next();
  if (ALLOWED_ORIGINS.includes(origin)) {
    response.headers.set("Access-Control-Allow-Origin", origin);
    response.headers.set("Access-Control-Allow-Credentials", "true");
  }
  return response;
}
