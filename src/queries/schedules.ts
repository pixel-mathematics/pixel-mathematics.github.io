import type { QueryData } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

/* Fetch all schedule events */
const fetchScheduleEventsQuery = supabase
  .from("schedule_events")
  .select()
  .order("id");

export type ScheduleEvent = QueryData<typeof fetchScheduleEventsQuery>[0];

export async function fetchScheduleEvents(): Promise<ScheduleEvent[]> {
  const { data, error } = await fetchScheduleEventsQuery;

  if (!data || error) {
    throw new Error("Lỗi lấy dữ liệu thời khóa biểu");
  }

  return data;
}

export const fetchScheduleEventsQueryOptions = queryOptions({
  queryKey: ["scheduleEvents"],
  queryFn: fetchScheduleEvents,
  staleTime: 1000 * 60 * 5,
});
