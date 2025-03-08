import { jwtVerify } from "jose";

export async function validateToken(token: string) {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET || "");
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return false;
  }
}
