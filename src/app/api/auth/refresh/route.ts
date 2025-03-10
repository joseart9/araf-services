import { jwtVerify } from "jose";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { getUserSession } from "@/app/api/utils";

// /api/auth/refresh
export async function POST(req: NextRequest) {
  const refreshToken = req.cookies.get("refreshToken")?.value;
  if (!refreshToken) {
    return NextResponse.json(
      { message: "No refresh token provided" },
      { status: 403 }
    );
  }

  try {
    const { payload } = await jwtVerify(
      refreshToken,
      new TextEncoder().encode(process.env.JWT_REFRESH_SECRET)
    );
    // Si es válido, genera un nuevo access token
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
      return NextResponse.json(
        { message: "JWT secret is not defined" },
        { status: 500 }
      );
    }

    const { user, error } = await getUserSession(req);

    if (error) {
      return NextResponse.json({ message: error }, { status: 403 });
    }

    if (!user) {
      return NextResponse.json(
        { message: "No user session found" },
        { status: 401 }
      );
    }

    const newAccessToken = jwt.sign(
      {
        ...user,
      },
      jwtSecret,
      { expiresIn: "1d" }
    );
    return NextResponse.json({ token: newAccessToken }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid refresh token" },
      { status: 403 }
    );
  }
}
