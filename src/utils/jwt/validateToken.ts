import { jwtVerify } from "jose";

export async function validateToken(
  token: string
): Promise<{ valid: boolean; payload?: any }> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");
  try {
    const { payload } = await jwtVerify(token, secret);
    return { valid: true, payload };
  } catch (error) {
    return { valid: false, payload: null };
  }
}
