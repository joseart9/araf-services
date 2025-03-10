"use server";

import { createClient } from "@/utils/supabase/middleware";
import bcrypt from "bcrypt";
import User from "@/types/User";
import UserSession from "@/types/UserSession";
import BaseRequest from "@/types/BaseRequest";

interface RegisterUserProps extends BaseRequest {
  user: User;
}

export async function registerUser({
  req,
  user,
}: RegisterUserProps): Promise<{ error?: string; data?: any; status: number }> {
  // Create db connection
  const db = createClient(req);

  // Check if the user is already registered
  const { isRegistered, error: isRegisteredError } = await isUserRegistered(
    db,
    user.email
  );

  if (isRegistered) {
    return { error: "This user already has an account", status: 400 };
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
      organization_id: user.organization_id,
      role: user.role,
    },
  ]);

  if (error) {
    return {
      error: error.message,
      status: 400,
    };
  }

  return { data, status: 200 };
}

interface GetUserProps extends BaseRequest {
  email: string;
  password: string;
}

export async function getUser({
  req,
  email,
  password,
}: GetUserProps): Promise<{ user?: User; error?: string; status?: number }> {
  // Create db connection
  const db = createClient(req);

  // Get user from db
  const { data, error } = await db
    .from("users")
    .select()
    .eq("email", email)
    .single();

  // Check if the user exists
  if (!data) {
    return {
      error: "User not found",
      status: 404,
    };
  }

  if (error) {
    return {
      error: error.message,
      status: 400,
    };
  }

  const user = data;

  // Check if the password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return {
      error: "Incorrect password",
      status: 401,
    };
  }

  return { user, status: 200 };
}

// Function to check if the user is already registered
export async function isUserRegistered(
  db: any,
  email: string
): Promise<{ isRegistered?: boolean; error?: string }> {
  // Check if the user is already registered
  const { data, error } = await db.from("users").select().eq("email", email);

  if (error) {
    return { error: error.message, isRegistered: true };
  }

  if (data.length > 0) {
    return { isRegistered: true };
  } else return { isRegistered: false };
}

interface GetUserSessionProps extends BaseRequest {
  user: User;
}

// Function to get the User Session
export async function getUserSession({
  user,
  req,
}: GetUserSessionProps): Promise<{
  userSession: null | UserSession;
  error?: string;
}> {
  // Connect to the db
  const db = createClient(req);

  // Fetch user based on the uuid
  const { data, error } = await db
    .from("users")
    .select("*")
    .eq("uuid", user.uuid)
    .single();

  if (error || !data) {
    return { error: error?.message || "User not found", userSession: null };
  }

  // Return the user session
  return {
    userSession: {
      userID: data.id,
      email: data.email,
      uuid: data.uuid,
      role: data.role,
      organizationID: data.organization_id,
    },
  };
}
