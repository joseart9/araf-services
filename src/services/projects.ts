import BaseRequest from "@/types/BaseRequest";
import Project from "@/types/Project";
import { createClient } from "@/utils/supabase/middleware";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

interface CreateProjectProps extends BaseRequest {
  project: Partial<Project>;
}
export async function createProjectService({
  req,
  project,
}: CreateProjectProps): Promise<{
  data?: Project;
  error?: string;
  status: number;
}> {
  // Connect to the database
  const db = createClient(req);

  // Generate a new UUID
  const uuid = uuidv4();

  // Create a new project
  const { data, error } = await db
    .from("projects")
    .insert([
      {
        ...project,
        uuid,
      },
    ])
    .select("*")
    .single();

  if (error) {
    return {
      error: error.message,
      status: 500,
    };
  }

  if (!data) {
    return {
      error: "Failed to create project",
      status: 500,
    };
  }

  return {
    data: data,
    status: 200,
  };
}
