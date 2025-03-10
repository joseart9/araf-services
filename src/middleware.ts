import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { validateToken } from "@/utils/jwt/validateToken";
import BaseResponse from "@/types/BaseResponse";

export const config = {
  matcher: "/api/:path*",
};

const UNPROTECTED_ROUTES = ["/api/auth/login", "/api/auth/register"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Omitir validación en rutas no protegidas
  if (UNPROTECTED_ROUTES.includes(pathname)) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get("authorization");
  // Buscar token en cookies
  let token = authHeader?.substring(7);

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
