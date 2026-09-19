import { z } from "zod";

export const changePasswordInputSchema = z.object({
  newPassword: z.string().min(8),
});

export type ChangePasswordInput = z.infer<typeof changePasswordInputSchema>;

export const changePasswordFormInputSchema = z
  .object({
    newPassword: z.string().min(8, { message: "Mật khẩu mới ít nhất 8 kí tự" }),
    confirmNewPassword: z.string().min(1, { message: "Vui lòng xác nhận lại mật khẩu mới" }),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Mật khẩu mới xác nhận không khớp",
    path: ["confirmNewPassword"],
  });

export type ChangePasswordFormInput = z.infer<typeof changePasswordFormInputSchema>;
