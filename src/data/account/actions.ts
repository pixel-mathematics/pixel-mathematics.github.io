"use server";

import { createClient } from "@/lib/supabase/server";

import { ChangePasswordInput, changePasswordInputSchema } from "./schemas";

export async function changePasswordAction(input: ChangePasswordInput) {
  const validatedInputs = changePasswordInputSchema.safeParse(input);

  if (!validatedInputs.success) {
    return {
      success: false,
      message: "Vui lòng kiểm tra lại mật khẩu",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: validatedInputs.data.newPassword,
  });

  if (error) {
    if (error.message.includes("should be different")) {
      return { success: false, message: "Mật khẩu mới không được trùng với mật khẩu cũ" };
    }

    return { success: false, message: error.message };
  }

  return { success: true, message: "Đổi mật khẩu thành công" };
}
