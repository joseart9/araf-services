import UserSession from "@/types/UserSession";
import { JWTPayload, jwtVerify } from "jose";
import { NextRequest } from "next/server";

export async function getUser(req: NextRequest): Promise<null | UserSession> {
  const authHeader = req.headers.get("Authorization");
  const token = authHeader ? authHeader.split(" ")[1] : undefined;
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, secret);
    return payload as unknown as UserSession;
  } catch (error) {
    return null;
  }
}
