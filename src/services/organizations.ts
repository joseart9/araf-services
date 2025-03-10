import { createClient } from "@/utils/supabase/middleware";
import { NextRequest } from "next/server";

export async function getUserOrganizations(req: NextRequest, id: string) {
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
    .eq("id", id)
    .single();

  return { data, error };
}
