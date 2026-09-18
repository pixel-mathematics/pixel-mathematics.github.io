"use server";

import { cache } from "react";
import { QueryData, SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/database.types";
import { createClient } from "@/lib/supabase/server";

export async function buildUserProfileQuery(client: SupabaseClient<Database>, userId: string) {
  return client.from("profiles").select("*").eq("id", userId).single();
}

export type UserProfile = QueryData<ReturnType<typeof buildUserProfileQuery>>;

export const getUserProfile = cache(async (): Promise<UserProfile | null> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await buildUserProfileQuery(supabase, user.id);

  return profile;
});
