"use server";

import { NextRequest, NextResponse } from "next/server";
import BaseResponse from "@/types/BaseResponse";
import jwt from "jsonwebtoken";
import { validateToken } from "@/utils/jwt/validateToken";

export async function POST(req: NextRequest) {
  const SECRET_KEY = process.env.JWT_SECRET;

  if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  try {
    // Get the token from the request body
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json(
        {
          message: "Token is required",
        } as BaseResponse,
        { status: 400 }
      );
    }

    const { error, status } = await validateToken(token);

    if (error) {
      return NextResponse.json({ message: error } as BaseResponse, {
        status: status,
      });
    }

    return NextResponse.json(
      {
        message: "Token is valid",
      } as BaseResponse,
      { status: 200 }
    );
  } catch (error) {
    // Handle different types of JWT errors
    if (error instanceof jwt.TokenExpiredError) {
      return NextResponse.json(
        {
          message: "Token has expired",
        } as BaseResponse,
        { status: 401 }
      );
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        {
          message: "Invalid token",
        } as BaseResponse,
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "Error validating token",
      } as BaseResponse,
      { status: 500 }
    );
  }
}
