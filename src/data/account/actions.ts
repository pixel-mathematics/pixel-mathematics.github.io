"use server";

import { createClient } from "@/lib/supabase/server";
import { validateFormData } from "@/lib/utils";

import { changePasswordFormInputSchema } from "./schemas";

export interface ChangePasswordState {
  success?: boolean;
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
}

export async function changePasswordAction(
  _initialState: ChangePasswordState,
  formData: FormData
): Promise<ChangePasswordState> {
  const validatedFields = validateFormData(formData, changePasswordFormInputSchema);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.errors,
      message: "Vui lòng kiểm tra lại mật khẩu",
    };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.updateUser({
    password: validatedFields.data.newPassword,
  });

  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true, message: "Đổi mật khẩu thành công" };
}
