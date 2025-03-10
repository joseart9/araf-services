import { NextRequest, NextResponse } from "next/server";
import { createProjectService } from "@/services/projects";
import { getUserSession } from "@/app/api/utils";
import BaseResponse from "@/types/BaseResponse";
import { validateProject } from "./utils";

export async function POST(req: NextRequest) {
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

  // Get the request body
  const { name, organization_id, public_url } = await req.json();

  // Validate the project
  const { error: validationError } = validateProject({
    name,
    organization_id,
    public_url,
  });

  if (validationError) {
    return NextResponse.json(
      {
        message: validationError,
      } as BaseResponse,
      {
        status: 400,
      }
    );
  }

  try {
    const {
      data,
      error: projectError,
      status,
    } = await createProjectService({
      req,
      project: {
        name,
        organization_id,
        public_url,
      },
    });

    if (projectError) {
      return NextResponse.json(
        {
          message: projectError,
        } as BaseResponse,
        {
          status: status,
        }
      );
    }

    return NextResponse.json(
      {
        data,
      } as BaseResponse,
      {
        status: status,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unknown error",
      } as BaseResponse,
      {
        status: 500,
      }
    );
  }
}
