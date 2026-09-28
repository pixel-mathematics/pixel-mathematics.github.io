"use server";

import { cache } from "react";
import { QueryData, SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/database.types";
import { createClient } from "@/lib/supabase/server";

export async function buildCurrentUserQuery(client: SupabaseClient<Database>, userId: string) {
  return client.from("profiles").select("*").eq("id", userId).single();
}

export type User = QueryData<ReturnType<typeof buildCurrentUserQuery>>;

export const getCurrentUser = cache(async (): Promise<User | null> => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: userProfile } = await buildCurrentUserQuery(supabase, user.id);

  return userProfile;
});
