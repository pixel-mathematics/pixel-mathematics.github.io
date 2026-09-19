import { cache } from "react";
import { QueryData, SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/database.types";
import { createClient } from "@/lib/supabase/server";

/* get recent lessons of current user */
export async function buildUserProfilesQuery(client: SupabaseClient<Database>) {
  return client
    .from("profiles")
    .select("*")
    .order("role", { ascending: true })
    .order("full_name", { ascending: true });
}

export type UserProfile = QueryData<ReturnType<typeof buildUserProfilesQuery>>[0];

export const getUserProfiles = cache(async (): Promise<UserProfile[]> => {
  const supabase = await createClient();

  const { data, error } = await buildUserProfilesQuery(supabase);
  if (!data || error) {
    throw new Error(`Lỗi lấy dữ liệu người dùng`);
  }

  return data;
});
