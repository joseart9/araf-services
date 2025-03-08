import jwt from "jsonwebtoken";

export const validateToken = (req) => {
  const SECRET_KEY = process.env.JWT_SECRET;

  const authHeader = req.headers.get("authorization");
  if (!authHeader) {
    throw new Error("No authorization header provided");
  }

  const token = authHeader.split(" ")[1]; // Format: "Bearer <token>"
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    return decoded; // Returns the payload (e.g., { email })
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
};
