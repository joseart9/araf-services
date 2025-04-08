import { NextRequest, NextResponse } from "next/server";
import {
  createProjectService,
  updateProjectService,
  getProjectService,
} from "@/services/projects";
import { getUserSession } from "@/app/api/utils";
import BaseResponse from "@/types/BaseResponse";
import { validateProject } from "./utils";

// Get a project by ID
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

  // Get project ID from the URL
  const url = new URL(req.url);
  const projectUUID = url.searchParams.get("uuid");

  if (!projectUUID) {
    return NextResponse.json(
      {
        message: "Project ID is required",
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
    } = await getProjectService(req, projectUUID);

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

// Create a new project
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
  const {
    uuid,
    name,
    description,
    img,
    organization_id,
    public_url,
    admin_url,
    login_url,
    has_custom_domain,
    custom_domain_url,
    isActive,
    type,
  } = await req.json();

  // Validate the project
  const { error: validationError } = validateProject({
    uuid,
    name,
    description,
    img,
    organization_id,
    public_url,
    admin_url,
    login_url,
    has_custom_domain,
    custom_domain_url,
    isActive,
    type,
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
        uuid,
        name,
        description,
        img,
        organization_id,
        public_url,
        admin_url,
        login_url,
        has_custom_domain,
        custom_domain_url,
        isActive,
        type,
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

// Update a project
export async function PUT(req: NextRequest) {
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

  // Get project ID from the URL
  const url = new URL(req.url);
  const projectId = url.searchParams.get("id");

  if (!projectId) {
    return NextResponse.json(
      {
        message: "Project ID is required",
      } as BaseResponse,
      {
        status: 400,
      }
    );
  }

  // Get the request body
  const {
    name,
    description,
    img,
    organization_id,
    public_url,
    admin_url,
    login_url,
    has_custom_domain,
    custom_domain_url,
    isActive,
    type,
  } = await req.json();

  // Validate the project
  const { error: validationError } = validateProject({
    name,
    description,
    img,
    organization_id,
    public_url,
    admin_url,
    login_url,
    has_custom_domain,
    custom_domain_url,
    isActive,
    type,
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
    } = await updateProjectService({
      req,
      projectId,
      project: {
        name,
        description,
        img,
        organization_id,
        public_url,
        admin_url,
        login_url,
        has_custom_domain,
        custom_domain_url,
        isActive,
        type,
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
