import * as z from "zod"; 
 
export const SignupZod = z.object({ 
  username: z.string().max(100).min(3).trim(),
  email: z.email(),
  password: z.string().max(100).min(3).trim(),
  plan: z.number(),
});