import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateToken } from "@/utils/jwt/validateToken";
import BaseResponse from "@/types/BaseResponse";

export const config = {
  matcher: "/api/:path*",
};

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Omitir validación en rutas /api/auth
  if (pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  // Buscar token en cookies
  let token = authHeader?.substring(7);

  console.log(token);

  if (!token) {
    return NextResponse.json(
      {
        message: "No Auth token provided",
      } as BaseResponse,
      {
        status: 403,
      }
    );
  }

  // Validar token
  const { error, status } = await validateToken(token);

  if (error) {
    return NextResponse.json(
      {
        message: error,
      } as BaseResponse,
      {
        status: status,
      }
    );
  }

  return NextResponse.next();
}
