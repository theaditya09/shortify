import { z } from "zod";

export const urlInput = z.object({
    url: z.string().url(),
})

export const createShortUrlSchema = z.object({
    longUrl: z
      .string()
      .url("Invalid URL")
      .max(2048, "URL too long"),
  
    customAlias: z
      .string()
      .min(3)
      .max(30)
      .regex(/^[a-zA-Z0-9_-]+$/)
      .optional(),
  
    expiresAt: z
      .string()
      .datetime()
      .optional(),
  })

  export const shortUrlResponseSchema = z.object({
    id: z.string(),
    shortCode: z.string(),
    shortUrl: z.string().url(),
    longUrl: z.string().url(),
    createdAt: z.string().datetime(),
    expiresAt: z.string().datetime().nullable(),
  })


export type urlInputType = z.infer<typeof urlInput>;
export type createShortUrlType = z.infer<typeof createShortUrlSchema>;
export type shortUrlResponseType = z.infer<typeof shortUrlResponseSchema>;