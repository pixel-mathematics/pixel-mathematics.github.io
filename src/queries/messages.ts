import type { QueryData } from "@supabase/supabase-js";
import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";

const now = new Date().toISOString();

const fetchActiveMessagesQuery = supabase
  .from("messages")
  .select(
    `
        id,
        content,
        created_at,
        expired_at,
        courses (
          id,
          title
        )
      `
  )
  .or(`expired_at.gt.${now},expired_at.is.null`)
  .order("created_at", { ascending: false });

export type Message = QueryData<typeof fetchActiveMessagesQuery>[0];

export async function fetchActiveMessages(): Promise<Message[]> {
  const { data, error } = await fetchActiveMessagesQuery;

  if (!data || error) {
    throw new Error("Lỗi lấy dữ liệu tin nhắn");
  }

  return data;
}

export const fetchActiveMessagesQueryOptions = queryOptions({
  queryKey: ["scheduleEvents"],
  queryFn: fetchActiveMessages,
  staleTime: 1000 * 60 * 5,
});
