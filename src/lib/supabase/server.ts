import { cookies } from "next/headers";
import { env } from "@/env";
import { createServerClient } from "@supabase/ssr";

export async function createClient() {
  // BẮT BUỘC dùng await trong Next.js 16
  const cookieStore = await cookies();

  return createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Next.js không cho phép set cookie khi đang render Server Component
          }
        },
      },
    }
  );
}
