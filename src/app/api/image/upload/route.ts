"use server";

import { NextResponse, NextRequest } from "next/server";
import BaseResponse from "@/types/BaseResponse";
import { uploadImage } from "@/services";

export async function POST(req: NextRequest) {
  try {
    // Procesamos el formulario multipart/form-data
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const projectID = formData.get("project_id") as string;

    if (!file) {
      return NextResponse.json(
        {
          message: "No file provided",
        } as BaseResponse,
        {
          status: 400,
        }
      );
    }

    if (!projectID) {
      return NextResponse.json(
        {
          message: "No project ID provided",
        } as BaseResponse,
        {
          status: 400,
        }
      );
    }

    const { data, error, status } = await uploadImage({
      req,
      file,
      projectID,
    });

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

    return NextResponse.json(
      {
        message: "Image uploaded successfully",
        data: data,
      } as BaseResponse,
      {
        status: status,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error,
      } as BaseResponse,
      {
        status: 500,
      }
    );
  }
}
