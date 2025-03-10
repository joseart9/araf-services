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

  // Buscar token en cookies
  let token = request.cookies.get("token")?.value;
  // Si no se encuentra en cookies, buscar en header Authorization
  if (!token) {
    const authHeader = request.headers.get("authorization");
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.substring(7);
    }
  }

  if (!token) {
    return NextResponse.json({
      status: 403,
      message: "No Auth token provided",
    } as BaseResponse);
  }

  // Validar token
  const { valid: isValid, payload } = await validateToken(token);

  console.log(isValid);

  if (!isValid) {
    return NextResponse.json({
      status: 403,
      message: "Invalid Auth token",
    } as BaseResponse);
  }

  return NextResponse.next();
}
