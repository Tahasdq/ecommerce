import * as zod from 'zod'
import {zodResolver} from "@hookform/resolvers/zod"
export const registrationSchema = zod.object({
  username:zod
  .string()
  .min(1, "Username is required")
  .max(10 , "Username cannot exceed 10 characters"),
  email:zod.
  string()
  .min(1 , "Email is required")
  .email("Please Enter valid email"),
  password:zod
  .string()
  .min(8, "Password must be at least 8 characters"),
  confirmPassword:zod.string()

}).refine((data)=>data.password==data.confirmPassword , {
  message:"Password do not match",
  path:["confirmPassword"]
})