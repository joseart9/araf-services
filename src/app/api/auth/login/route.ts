"use server";

import { NextRequest, NextResponse } from "next/server";
import getUser from "@/server/getUser";
import jwt from "jsonwebtoken";

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
    const response = await getUser({ email, password });

    if (response.status !== 200) {
      return NextResponse.json(response, { status: response.status });
    }

    // Generate a JWT token
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: "1h" });

    return NextResponse.json({
      message: "Login successful",
      token,
      user: response.user,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server error", error: error },
      { status: 500 }
    );
  }
}
