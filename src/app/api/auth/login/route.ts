"use server";

import { NextRequest, NextResponse } from "next/server";
import BaseResponse from "@/types/BaseResponse";
import jwt from "jsonwebtoken";
import { getUser } from "@/services/auth";

export async function POST(req: NextRequest) {
  const SECRET_KEY = process.env.JWT_SECRET;

  if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  // Get the email and password from the request body
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      { message: "Email and password are required" },
      { status: 400 }
    );
  }

  try {
    // Authenticate the user
    const user = await getUser({ req, email, password });

    if (!user) {
      return NextResponse.json({
        status: 401,
        message: "Invalid email or password",
      } as BaseResponse);
    }

    // Generate a JWT token
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

    return NextResponse.json({
      message: "Login successful",
      data: {
        token: token,
        user: user,
      },
    } as BaseResponse);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
      error: error,
    } as BaseResponse);
  }
}
