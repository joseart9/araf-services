"use server";

import { NextRequest, NextResponse } from "next/server";
import BaseResponse from "@/types/BaseResponse";
import jwt from "jsonwebtoken";
import { ROLES } from "@/const/roles";

export async function GET(req: NextRequest) {
  const SECRET_KEY = process.env.JWT_SECRET;

  if (!SECRET_KEY) {
    return NextResponse.json(
      {
        message: "JWT_SECRET is not defined in the environment variables",
      } as BaseResponse,
      { status: 500 }
    );
  }

  try {
    // Create a temporary session for onboarding
    const onboardingSession = {
      role: ROLES.ONBOARDING,
    };

    // Generate a JWT token with short expiration for security
    const token = jwt.sign({ ...onboardingSession }, SECRET_KEY, {
      expiresIn: "24h", // Short expiration for onboarding process
    });

    return NextResponse.json(
      {
        message: "Onboarding token generated successfully",
        data: {
          token,
        },
      } as BaseResponse,
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Error generating onboarding token",
        error: error instanceof Error ? error.message : "Unknown error",
      } as BaseResponse,
      { status: 500 }
    );
  }
}
