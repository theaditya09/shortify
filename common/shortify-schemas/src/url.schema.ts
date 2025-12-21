import { z } from "zod";

export const urlInput = z.object({
    url: z.string().url(),
})

export type urlInputType = z.infer<typeof urlInput>;