import { jwtVerify } from "jose";

export async function validateToken(
  token: string
): Promise<{ payload?: any; error?: string; status: number }> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");
  try {
    const { payload } = await jwtVerify(token, secret);
    if (!payload) {
      return { status: 403, error: "Invalid token" };
    }
    return { payload, status: 200 };
  } catch (error) {
    return { status: 403, error: "Invalid token" };
  }
}
