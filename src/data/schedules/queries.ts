"use server";

import { cache } from "react";
import type { QueryData, SupabaseClient } from "@supabase/supabase-js";

import { Database } from "@/types/database.types";
import { createClient } from "@/lib/supabase/server";

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

export const getScheduleEvents = cache(async (): Promise<ScheduleEvent[]> => {
  const supabase = await createClient();

  const { data, error } = await buildScheduleEventsQuery(supabase);

  if (!data || error) {
    throw new Error("Lỗi lấy dữ liệu thời khóa biểu");
  }

  return data;
});
