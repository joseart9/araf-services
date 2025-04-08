import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function getOrganization(uuid: string) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("organizations")
    .select("*")
    .eq("uuid", uuid);

  if (!data) {
    return { organization: null, error: error?.message };
  }

  return { organization: data[0], error: null };
}
