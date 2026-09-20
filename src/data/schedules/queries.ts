"use server";

import { unstable_cache } from "next/cache";
import type { QueryData, SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/database.types";
import { createAdminClient } from "@/lib/supabase/admin";

/* get all schedule events */
export async function buildScheduleEventsQuery(client: SupabaseClient<Database>) {
  return client
    .from("schedule_events")
    .select(
      `
    *,
    student_schedule_events!inner (
      profiles (
        id,
        full_name,
        user_id
      )
    )
  `
    )
    .order("id");
}

export type ScheduleEvent = QueryData<ReturnType<typeof buildScheduleEventsQuery>>[0];

export const getScheduleEvents = unstable_cache(
  async (): Promise<ScheduleEvent[]> => {
    const supabase = createAdminClient();

    const { data, error } = await buildScheduleEventsQuery(supabase);

    if (!data || error) {
      throw new Error("Lỗi lấy dữ liệu thời khóa biểu");
    }

    return data;
  },
  ["schedule"],
  { revalidate: 60 * 60 * 24, tags: ["schedule"] }
);
