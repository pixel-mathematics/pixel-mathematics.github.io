import { z } from "zod";

export const changePasswordInputSchema = z.object({
  newPassword: z.string().min(8),
});

export type ChangePasswordInput = z.infer<typeof changePasswordInputSchema>;

export const changePasswordFormInputSchema = z.object({
  newPassword: z.string().min(6, { message: "Mật khẩu mới ít nhất 6 kí tự" }),
  confirmNewPassword: z.string().min(1, { message: "Vui lòng xác nhận lại mật khẩu mới" }),
});

export type ChangePasswordFormInput = z.infer<typeof changePasswordFormInputSchema>;
