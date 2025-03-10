"use server";

import BaseResponse from "@/types/BaseResponse";
import { NextRequest, NextResponse } from "next/server";
import { getUserOrganizations } from "@/services";
import { getUser } from "@/app/api/utils";

export async function GET(req: NextRequest) {
  // Get the user session
  const { user, error } = await getUser(req);

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
