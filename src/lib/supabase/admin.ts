import { env } from "@/env";
import { createClient } from "@supabase/supabase-js";

import type { Database } from "@/types/database.types";

export function createAdminClient() {
  return createClient<Database>(env.NEXT_PUBLIC_SUPABASE_URL, env.SUPABASE_SECRET_KEY, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
