"use server";

import { doc, setDoc, getDoc } from "firebase/firestore";
import User from "@/types/User";
import bcrypt from "bcrypt";
import db from "@/db";

const registerUser = async ({ user }: { user: User }) => {
  // Validate that there is a user email and password
  if (!user.email || !user.password) {
    return { message: "Email and password are required", status: 400 };
  }

  try {
    // Validate that the user does not exist
    const userRef = doc(db, "users", user.email);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { message: "User already exists" };
    }

    // Hash the user password
    const hashedPassword = await bcrypt.hash(user.password, 10);

    // Create the user
    await setDoc(userRef, { email: user.email, password: hashedPassword });

    return { message: "User registered successfully" };
  } catch (error) {
    return { message: "Error registering user", error: error, status: 500 };
  }
};

export default registerUser;
