import * as zod from 'zod'

export const loginSchema = zod.object({
  email: zod
    .string()
    .min(1, "Email is required")
    .email("Please Enter valid email"),
  password: zod.string().min(1, "Password is required"),
});

// Login Inputs type
export type LoginInputs = {
  email: string;
  password: string;
};
