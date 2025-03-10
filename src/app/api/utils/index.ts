import UserSession from "@/types/UserSession";
import { jwtVerify } from "jose";
import { NextRequest } from "next/server";

export async function getUserSession(
  req: NextRequest
): Promise<{ user?: UserSession; error?: string }> {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader ? authHeader.split(" ")[1] : undefined;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");

  if (!token || !authHeader) {
    return { error: "No Auth token provided" };
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    return { user: payload as unknown as UserSession };
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
}
