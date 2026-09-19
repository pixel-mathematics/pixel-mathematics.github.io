"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { validateFormData } from "@/lib/utils";

import { signInFormInputSchema } from "./schemas";

export interface AuthState {
  success?: boolean;
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
}

const EMAIL_DOMAIN = "@pixelmathematics.edu";

export async function signInAction(
  _initialState: AuthState,
  formData: FormData
): Promise<AuthState> {
  const validatedFields = validateFormData(formData, signInFormInputSchema);

  if (!validatedFields.success) {
    return {
      errors: validatedFields.errors,
      message: "Vui lòng kiểm tra lại thông tin",
    };
  }

  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.signInWithPassword({
    email: validatedFields.data.id + EMAIL_DOMAIN,
    password: validatedFields.data.password,
  });

  if (error) {
    const errorMessage = error.message.includes("Invalid login")
      ? "Email hoặc mật khẩu không đúng"
      : error.message;
    return { success: false, message: errorMessage };
  }

  if (!user) {
    return { success: false, message: "Người dùng không tồn tại" };
  }

  const { data: profile } = await supabase.from("profiles").select().eq("id", user.id).single();

  if (profile?.role === "admin") {
    redirect("/admin");
  } else {
    redirect("/dashboard");
  }
}
