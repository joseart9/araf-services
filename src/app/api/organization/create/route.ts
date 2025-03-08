import { NextRequest, NextResponse } from "next/server";
import BaseResponse from "@/types/BaseResponse";
import getSupabaseClient from "@/utils/supabase";
import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";

// Create a new organization
export async function POST(req: NextRequest) {
  // Get cookies from the request
  const cookieStore = cookies();

  // Get the request body
  const { name } = await req.json();

  // Check if the name is provided
  if (!name) {
    return NextResponse.json({
      status: 400,
      message: "Name is required",
    } as BaseResponse);
  }

  // Connect to Supabase
  const db = getSupabaseClient(cookieStore);

  // Generate a unique UUID for the organization
  const uuid = uuidv4();

  // Insert the new organization
  const { data, error } = await db
    .from("organizations")
    .insert({ name, uuid })
    .select("*")
    .single();

  if (error) {
    return NextResponse.json({
      status: 500,
      message: "Error creating organization",
      error: error.message,
    } as BaseResponse);
  }

  return NextResponse.json({
    status: 200,
    message: "Organization created successfully",
    data,
  } as BaseResponse);
}
