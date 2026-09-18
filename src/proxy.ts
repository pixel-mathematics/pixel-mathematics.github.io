import { type NextRequest } from "next/server";

import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

// Cấu hình matcher để chỉ chạy middleware trên các route cần thiết
// Bỏ qua các file tĩnh (ảnh, css, js) để tối ưu hiệu suất web
export const config = {
  matcher: [
    /*
     * Match tất cả các request TRỪ:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - Các file có đuôi mở rộng (svg, png, jpg, jpeg, gif, webp)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
