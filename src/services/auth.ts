"use server";

import { createClient } from "@/utils/supabase/middleware";
import { NextRequest } from "next/server";
import bcrypt from "bcrypt";
import User from "@/types/User";

interface BaseProps {
  req: NextRequest;
}

interface RegisterUserProps extends BaseProps {
  user: User;
}

export async function registerUser({ req, user }: RegisterUserProps) {
  // Create db connection
  const db = createClient(req);

  // Check if the user is already registered
  const isRegistered = await isUserRegistered(db, user.email);

  if (isRegistered) {
    return {
      error: new Error("User is already registered"),
    };
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(user.password, 10);

  // Insert user into db
  const { data, error } = await db.from("users").insert([
    {
      email: user.email,
      password: hashedPassword,
      first_name: user.first_name,
      last_name: user.last_name,
      phone_number: user.phone_number,
      uuid: user.uuid,
    },
  ]);

  return { data, error };
}

interface GetUserProps extends BaseProps {
  email: string;
  password: string;
}

export async function getUser({
  req,
  email,
  password,
}: GetUserProps): Promise<{ user?: User; error?: Error }> {
  // Create db connection
  const db = createClient(req);

  // Get user from db
  const { data, error } = await db.from("users").select().eq("email", email);

  if (error) {
    return {
      error,
    };
  }

  // Check if the user exists
  if (!data) {
    return {
      error: new Error("User not found"),
    };
  }

  const user = data[0];

  // Check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return {
      error: new Error("Incorrect password"),
    };
  }

  return { user };
}

// Function to check if the user is already registered
export async function isUserRegistered(
  db: any,
  email: string
): Promise<boolean> {
  //Check if the user is already registered
  const { data, error } = await db.from("users").select().eq("email", email);

  if (error) {
    throw new Error("Error checking if user is already registered");
  }

  return data.length > 0;
}
