import { NextRequest, NextResponse } from "next/server";
import BaseResponse from "@/types/BaseResponse";
import { createOrganization } from "@/services";

// Create a new organization
// api/organization
export async function POST(req: NextRequest) {
  // Get the request body
  const { name } = await req.json();

  // Check if the name is provided
  if (!name) {
    return NextResponse.json(
      {
        message: "A name for the organization is required",
      } as BaseResponse,
      { status: 400 }
    );
  }

  // Create the organization
  const { data, error, status } = await createOrganization(req, name);

  if (error) {
    return NextResponse.json(
      {
        message: "Error creating organization",
      } as BaseResponse,
      { status: status }
    );
  }

  return NextResponse.json(
    {
      message: "Organization created successfully",
      data,
    } as BaseResponse,
    { status: status }
  );
}
