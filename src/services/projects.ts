import { createClient } from "@/utils/supabase/middleware";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

interface Project {
  uuid?: string;
  name: string;
  description?: string;
  img?: string;
  organization_id: string;
  public_url?: string;
  admin_url?: string;
  login_url?: string;
  has_custom_domain?: boolean;
  custom_domain_url?: string;
  isActive?: boolean;
  type?: string;
  updated_at?: Date;
}

interface CreateProjectParams {
  req: NextRequest;
  project: Project;
}

interface UpdateProjectParams {
  req: NextRequest;
  projectId: string;
  project: Partial<Project>;
}

export async function createProjectService({
  req,
  project,
}: {
  req: NextRequest;
  project: Project;
}): Promise<{
  data?: Project;
  error?: string;
  status: number;
}> {
  // Connect to db
  const db = createClient(req);

  // Generate a unique UUID for the project
  const uuid = uuidv4();

  // Default config
  const admin_url = project.public_url
    ? `${project.public_url}/admin`
    : undefined;
  const has_custom_domain = false;
  const isActive = true;

  // Create a new project
  const { data, error } = await db
    .from("projects")
    .insert([
      {
        ...project,
        uuid,
        admin_url,
        has_custom_domain,
        isActive,
      },
    ])
    .select("*")
    .single();

  if (error) {
    return { error: error.message, status: 400 };
  }

  if (!data) {
    return { error: "Failed to create project", status: 500 };
  }

  return { data, status: 200 };
}

export async function updateProjectService({
  req,
  projectId,
  project,
}: {
  req: NextRequest;
  projectId: string;
  project: Partial<Project>;
}): Promise<{
  data?: Project;
  error?: string;
  status: number;
}> {
  // Connect to db
  const db = createClient(req);

  // Update the project
  const { data, error } = await db
    .from("projects")
    .update(project)
    .eq("id", projectId)
    .select("*")
    .single();

  if (error) {
    return { error: error.message, status: 400 };
  }

  if (!data) {
    return { error: "Failed to update project", status: 500 };
  }

  return { data, status: 200 };
}

export async function getProjectService(
  req: NextRequest,
  projectUUID: string
): Promise<{
  data?: Project;
  error?: string;
  status: number;
}> {
  // Connect to db
  const db = createClient(req);

  // Get the project
  const { data, error } = await db
    .from("projects")
    .select("*")
    .eq("uuid", projectUUID)
    .single();

  if (error) {
    return { error: error.message, status: 400 };
  }

  if (!data) {
    return { error: "Project not found", status: 404 };
  }

  return { data, status: 200 };
}
