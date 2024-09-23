import { z } from "zod";

export const DeleteReqestSchema = z.number();
export type DeleteReq = z.infer<typeof DeleteReqestSchema>;
