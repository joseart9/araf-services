"use server";

import BaseResponse from "@/types/BaseResponse";
import { NextRequest, NextResponse } from "next/server";
import { getUserOrganizations } from "@/services/organizations";
import { getUser } from "@/app/api/utils";

export async function GET(req: NextRequest) {
  // Get the user session
  const user = await getUser(req);

  if (!user) {
    return NextResponse.json({
      status: 401,
      message: "No user session found",
    } as BaseResponse);
  }

  try {
    const { data, error } = await getUserOrganizations(req, user.userID);

    if (error) {
      return NextResponse.json({
        status: 500,
        message: "Internal server error",
      } as BaseResponse);
    }

    return NextResponse.json({
      status: 200,
      data: data?.organizations,
    } as BaseResponse);
  } catch (error) {
    return NextResponse.json({
      status: 500,
      message: "Internal server error",
      error: error,
    } as BaseResponse);
  }
}
