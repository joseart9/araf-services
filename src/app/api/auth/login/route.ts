"use server";

import { NextRequest, NextResponse } from "next/server";
import BaseResponse from "@/types/BaseResponse";
import jwt from "jsonwebtoken";
import { getUser } from "@/services/auth";
import UserSession from "@/types/UserSession";

export async function POST(req: NextRequest) {
  const SECRET_KEY = process.env.JWT_SECRET;

  if (!SECRET_KEY) {
    throw new Error("JWT_SECRET is not defined in the environment variables");
  }

  // Get the email and password from the request body
  const { email, password } = await req.json();

  if (!email || !password) {
    return NextResponse.json(
      {
        message: "Email and password are required",
      } as BaseResponse,
      { status: 400 }
    );
  }

  try {
    // Authenticate the user
    const { user, error, status } = await getUser({ req, email, password });

    if (error) {
      return NextResponse.json(
        {
          message: error,
        } as BaseResponse,
        { status: status }
      );
    }

    if (!user) {
      return NextResponse.json(
        {
          message: "Invalid email or password",
        } as BaseResponse,
        { status: status }
      );
    }

    // Create a user session for JWT
    const userSession: UserSession = {
      userID: user.id!,
      email: user.email,
      uuid: user.uuid,
      role: user.role,
      organizationID: user.organization_id,
    };

    // Generate a JWT token
    const token = jwt.sign({ ...userSession }, SECRET_KEY, { expiresIn: "7d" });

    return NextResponse.json(
      {
        message: "Login successful",
        data: {
          token,
        },
      } as BaseResponse,
      { status: status }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      } as BaseResponse,
      { status: 500 }
    );
  }
}
