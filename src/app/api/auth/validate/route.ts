"use server";

import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  const SECRET_KEY = process.env.JWT_SECRET;

  if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  // Obtén el encabezado Authorization
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return NextResponse.json(
      { message: "Authorization header is missing or invalid" },
      { status: 400 }
    );
  }

  // Extrae el token del encabezado
  const token = authHeader.split(" ")[1];

  try {
    // Valida el token
    const decoded = jwt.verify(token, SECRET_KEY);

    return NextResponse.json({
      message: "Token is valid",
      user: decoded,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid or expired token", error: error },
      { status: 401 }
    );
  }
}
