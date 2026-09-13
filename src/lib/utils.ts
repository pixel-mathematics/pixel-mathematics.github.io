import { format } from "date-fns";

export { cn } from "cn";

export function formatDate(
  date: Date | string | null,
  fmt: string = "dd/MM/yyyy"
) {
  if (!date) return "N/A";
  return format(date, fmt);
}

export function getDayOfWeek(dayOfWeek: number) {
  if (dayOfWeek === 0) return "Chủ Nhật";
  return `Thứ ${dayOfWeek + 1}`;
}
