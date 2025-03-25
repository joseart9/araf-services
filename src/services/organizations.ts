import { createClient } from "@/utils/supabase/middleware";
import { NextRequest } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function getUserOrganizations(
  req: NextRequest,
  uuid: string
): Promise<{
  data?: any;
  error?: string;
  status: number;
}> {
  // Connect to db
  const db = createClient(req);

  // Get user organizations
  const { data, error } = await db
    .from("users")
    .select(
      `
    organizations (
      uuid,
      id,
      name,
      project_id
    )
  `
    )
    .eq("uuid", uuid)
    .single();

  if (error) {
    return { error: "pene", status: 400 };
  }

  if (!data.organizations) {
    return { error: "No organization found", status: 404 };
  }

  return { data, status: 200 };
}

export async function createOrganization(
  req: NextRequest,
  name: string
): Promise<{
  data?: any;
  error?: string;
  status: number;
}> {
  // Connect to db
  const db = createClient(req);

  // Generate a unique UUID for the organization
  const uuid = uuidv4();

  // Insert the new organization
  const { data, error } = await db
    .from("organizations")
    .insert({ name, uuid })
    .select("*")
    .single();

  if (error) {
    return { error: error.message, status: 400 };
  }

  return { data, status: 200 };
}
