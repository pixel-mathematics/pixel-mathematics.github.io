import { format } from "date-fns";
import type { z, ZodError } from "zod";

export { cn } from "cn";

export function formatDate(date: Date | string | null, fmt: string = "dd/MM/yyyy") {
  if (!date) return "N/A";
  return format(date, fmt);
}

export function getDayOfWeek(dayOfWeek: number | null) {
  if (dayOfWeek === 0 || !dayOfWeek) return "Chủ Nhật";
  return `Thứ ${dayOfWeek + 1}`;
}

export function getAvatarFallbackText(name: string) {
  return name.split(" ").at(-1)?.at(0);
}

export function formatZodErrors(error: ZodError): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};

  error.issues.forEach((issue) => {
    const field = String(issue.path[0]);

    if (!fieldErrors[field]) {
      fieldErrors[field] = [];
    }

    fieldErrors[field].push(issue.message);
  });

  return fieldErrors;
}

export function validateFormData<T>(formData: FormData, schema: z.ZodType<T>) {
  // Chuyển đổi FormData thành Object (ví dụ: { email: '...', password: '...' })
  const data = Object.fromEntries(formData.entries());

  const validatedFields = schema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false as const,
      errors: formatZodErrors(validatedFields.error),
    };
  }

  return {
    success: true as const,
    data: validatedFields.data, // Dữ liệu đã được ép kiểu (typed) chuẩn xác
  };
}
