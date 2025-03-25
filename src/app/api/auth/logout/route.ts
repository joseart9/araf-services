import { NextRequest, NextResponse } from "next/server";
import BaseResponse from "@/types/BaseResponse";

export async function POST(req: NextRequest) {
  try {
    const response = NextResponse.json(
      { message: "Logout successful" } as BaseResponse,
      { status: 200 }
    );

    // Delete the auth token cookie
    response.cookies.set("admin_token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred during logout",
        error: error instanceof Error ? error.message : "Unknown error",
      } as BaseResponse,
      { status: 500 }
    );
  }
}
