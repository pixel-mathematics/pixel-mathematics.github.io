import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { format } from "date-fns"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string, fmt: string = "dd/MM/yyyy") {
  return format(date, fmt)
}

export function getDayOfWeek(dayOfWeek: number) {
  if (dayOfWeek === 0) return "Chủ Nhật"
  return `Thứ ${dayOfWeek + 1}`
}
