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

  const { error } = await supabase.auth.signInWithPassword({
    email: validatedFields.data.id + EMAIL_DOMAIN,
    password: validatedFields.data.password,
  });

  if (error) {
    const errorMessage = error.message.includes("Invalid login")
      ? "Email hoặc mật khẩu không đúng"
      : error.message;
    return { success: false, message: errorMessage };
  }

  redirect("/dashboard");
}
