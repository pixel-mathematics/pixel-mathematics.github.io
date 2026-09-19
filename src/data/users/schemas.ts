import { z } from "zod";

export const changeUserPasswordInputSchema = z.object({
  userId: z.string().min(1),
  password: z.string().min(8),
});

export type ChangeUserPasswordInput = z.infer<typeof changeUserPasswordInputSchema>;
