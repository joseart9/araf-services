"use server";

import { doc, getDoc } from "firebase/firestore";
import bcrypt from "bcrypt";
import db from "@/db";

const getUser = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  // Validate that email and password are provided
  if (!email || !password) {
    return { message: "Email and password are required", status: 400 };
  }

  try {
    // Reference the user document in Firestore
    const userRef = doc(db, "users", email);
    const userSnap = await getDoc(userRef);

    // Check if the user exists
    if (!userSnap.exists()) {
      return { message: "Invalid email or password", status: 401 };
    }

    const user = userSnap.data();

    // Validate the password using bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { message: "Invalid email or password", status: 401 };
    }

    // Return the user data (excluding the password for security reasons)
    return {
      message: "User authenticated successfully",
      user: { email: user.email },
      status: 200,
    };
  } catch (error) {
    return {
      message: "Error fetching user",
      error: error,
      status: 500,
    };
  }
};

export default getUser;
