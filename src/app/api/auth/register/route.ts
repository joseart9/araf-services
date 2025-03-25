"use server";

import { NextRequest, NextResponse } from "next/server";
import { registerUser } from "@/services/auth";
import BaseResponse from "@/types/BaseResponse";
import { v4 as uuidv4 } from "uuid";
import validateUser from "./utils";
import { ROLES } from "@/const/roles";

export async function POST(req: NextRequest) {
  const {
    email,
    password,
    first_name,
    last_name,
    phone_number,
    organization_id,
  } = await req.json();

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
    organization_id: organization_id,
  };

  // Validate user data
  const isValid = validateUser(user);

  if (isValid.error) {
    return NextResponse.json(
      {
        message: isValid.error,
      },
      { status: 400 }
    );
  }

  try {
    const { error } = await registerUser({
      req,
      user,
    });

    if (error) {
      return NextResponse.json(
        {
          message: error,
        } as BaseResponse,
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      } as BaseResponse,
      { status: 500 }
    );
  }

  return NextResponse.json(
    {
      message: "User registered successfully",
    } as BaseResponse,
    { status: 200 }
  );
}
