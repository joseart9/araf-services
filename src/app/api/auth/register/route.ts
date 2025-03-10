"use server";

import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/services/auth";
import BaseResponse from "@/types/BaseResponse";
import { v4 as uuidv4 } from "uuid";
import validateUser from "./utils";
import User from "@/types/User";
import { ROLES } from "@/const/roles";

export async function POST(req: NextRequest) {
  const { email, password, first_name, last_name, phone_number } =
    await req.json();

  // Generate uuid for the user
  const uuid = uuidv4();

  // Create user object
  const user: User = {
    uuid: uuid,
    email,
    password,
    first_name,
    last_name,
    phone_number,
    role: ROLES.USER,
  };

  // Validate user data
  const isValid = validateUser(user);

  if (isValid.error) {
    return NextResponse.json({
      status: 400,
      message: "Missing data",
      error: isValid.error,
    } as BaseResponse);
  }

  try {
    const { error } = await registerUser({
      req,
      user,
    });

    if (error) {
      return NextResponse.json({
        status: 500,
        message: "Error registering user",
        error: error.message,
      } as BaseResponse);
    }
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
      error: error,
    } as BaseResponse);
  }

  return NextResponse.json({
    status: 200,
    message: "User registered successfully",
  } as BaseResponse);
}
