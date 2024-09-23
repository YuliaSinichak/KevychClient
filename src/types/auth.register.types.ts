import { z } from "zod";
import { loginReqestSchema, loginResponseSchema } from "./auth.login.types";

export const registerReqestSchema = loginReqestSchema.extend({
  name: z.string().min(2).max(46),
});

const registerResponseSchema = loginResponseSchema;

export type RegisterRes = z.infer<typeof registerResponseSchema>;

export type RegisterReq = z.infer<typeof registerReqestSchema>;
