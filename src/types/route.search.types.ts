import { z } from "zod";

export const SearchRequestSchema = z.object({
  departureStation: z.string(),
  arrivalStation: z.string(),
  departureDate: z.date(),
});

export type SearchReq = z.infer<typeof SearchRequestSchema>;
