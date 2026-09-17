import { z } from "zod";

export const signInInputSchema = z.object({
  id: z.string().min(1),
  password: z.string().min(1),
});

export type SignInInput = z.infer<typeof signInInputSchema>;

export const signInFormInputSchema = z.object({
  id: z.string().min(1),
  password: z.string().min(1),
});

export type SignInFormInput = z.infer<typeof signInFormInputSchema>;
