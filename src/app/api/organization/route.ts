"use server";

import BaseResponse from "@/types/BaseResponse";
import { NextRequest, NextResponse } from "next/server";
import { getUserOrganizations } from "@/services";
import { getUserSession } from "@/app/api/utils";
import { createOrganization } from "@/services";

export async function GET(req: NextRequest) {
  // Get the user session
  const { user, error } = await getUserSession(req);

  if (error) {
    return NextResponse.json(
      {
        message: error,
      } as BaseResponse,
      {
        status: 400,
      }
    );
  }

  if (!user) {
    return NextResponse.json(
      {
        message: "No user session found",
      } as BaseResponse,
      {
        status: 401,
      }
    );
  }

  try {
    const { data, error, status } = await getUserOrganizations(
      req,
      user.userID
    );

    if (error) {
      return NextResponse.json(
        {
          message: error,
        } as BaseResponse,
        {
          status: status,
        }
      );
    }

    return NextResponse.json(
      {
        data: data.organizations,
      } as BaseResponse,
      {
        status: status,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
      } as BaseResponse,
      {
        status: 500,
      }
    );
  }
}

// Create a new organization
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
