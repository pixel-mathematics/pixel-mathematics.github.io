"use server";

import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

import { ChangeUserPasswordInput } from "./schemas";

export async function resetUserPasswordAction(input: ChangeUserPasswordInput) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, message: "Chưa xác thực" };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("user_id, role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    return { success: false, message: "Từ chối truy cập: Trái phép" };
  }

  const supabaseAdmin = createAdminClient();

  try {
    const { error } = await supabaseAdmin.auth.admin.updateUserById(input.userId, {
      password: input.password,
    });

    if (error) throw error;

    return { success: true, message: `Đặt lại mật khẩu thành công cho #${profile.user_id}` };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    return { success: false, message: error.message ?? "Đã có lỗi xảy ra" };
  }
}
