import { NextResponse, type NextRequest } from "next/server";
import { env } from "@/env";
import { createServerClient } from "@supabase/ssr";

export async function updateSession(request: NextRequest) {
  // Khởi tạo response mặc định tiếp tục request
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    env.NEXT_PUBLIC_SUPABASE_URL,
    env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Cập nhật cookie cho request hiện tại
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));

          supabaseResponse = NextResponse.next({
            request,
          });

          // Cập nhật cookie cho response trả về trình duyệt
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Lấy thông tin user (Dùng getUser thay vì getSession để đảm bảo an toàn tuyệt đối)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Phân loại các route
  const url = request.nextUrl.clone();
  const isAuthRoute = url.pathname.startsWith("/sign-in");
  const isProtectedRoute =
    url.pathname.startsWith("/dashboard") || url.pathname.startsWith("/admin");

  // Logic 1: Chưa đăng nhập mà ráng vào Dashboard -> Đuổi về trang Login
  if (!user && isProtectedRoute) {
    url.pathname = "/sign-in";
    return NextResponse.redirect(url);
  }

  // Logic 2: Đã đăng nhập rồi mà ráng vào lại trang Login/Register -> Đẩy thẳng vào Dashboard
  if (user && isAuthRoute) {
    const { data: profile } = await supabase.from("profiles").select().eq("id", user.id).single();
    url.pathname = profile.role === "admin" ? "/admin" : "/dashboard"; // Hoặc đường dẫn dashboard mặc định của bạn
    return NextResponse.redirect(url);
  }

  // Trả về response cùng với cookie (nếu có refresh token)
  return supabaseResponse;
}
