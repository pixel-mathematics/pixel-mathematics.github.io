"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

import { signInFormInputSchema, SignInInput } from "./schemas";

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
  const id = formData.get("id") as string;
  const password = formData.get("password") as string;

  const validatedFields = signInFormInputSchema.safeParse({ id, password });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
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
