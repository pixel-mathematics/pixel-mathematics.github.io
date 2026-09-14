import { supabase } from "@/lib/supabase";

/* change password mutation */
export interface ChangePasswordInput {
  password: string;
}

const changePasswordMutation = ({ password }: ChangePasswordInput) =>
  supabase.auth.updateUser({ password });

export async function changePassword(input: ChangePasswordInput) {
  const { error } = await changePasswordMutation(input);
  console.log(error?.message);

  if (error) {
    throw new Error("Lỗi: " + error?.message);
  }
}
