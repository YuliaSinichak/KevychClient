import { z } from "zod";

export const loginReqestSchema = z.object({
  email: z.string().email().trim().toLowerCase(),
  password: z.string().trim().min(2),
});

export const loginResponseSchema = z.object({
  accessToken: z.string(),
  user: z.object({
    id: z.string(),
    email: z.string(),
    name: z.string(),
  }),
});

export type LoginRes = z.infer<typeof loginResponseSchema>;

export type LoginReq = z.infer<typeof loginReqestSchema>;
