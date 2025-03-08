// supabaseClient.ts
import { createClient } from "@/utils/supabase/server";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

export default function getSupabaseClient(
  cookieStore: Promise<ReadonlyRequestCookies>
) {
  return createClient(cookieStore);
}
