import { Context } from "hono";
import { nanoid } from "nanoid";
import { createShortUrlSchema } from "@swekandrew/shortify-schemas";
import { getPrisma } from "../db";

// export const createShortUrlSchema = z.object({
//     longUrl: z
//       .string()
//       .url("Invalid URL")
//       .max(2048, "URL too long"),
  
//     customAlias: z
//       .string()
//       .min(3)
//       .max(30)
//       .regex(/^[a-zA-Z0-9_-]+$/)
//       .optional(),
  
//     expiresAt: z
//       .string()
//       .datetime()
//       .optional(),
//   })

export const createHandler = async (c : Context) => {
    const prisma = getPrisma(c.env.ACCELERATE_URL);
    
    const {success, data, error} = createShortUrlSchema.safeParse(await c.req.json());
    if(!success) return c.json({
        message: "Invalid URL",
        error: error.message,
    }, 400);

    const shortId = nanoid(6);
    try {
        await prisma.url.create({
            data: {
                shortCode: data.customAlias || shortId,
                longUrl: data.longUrl,
            },
        });
    } catch (error) {
        return c.json({
            message: "Error shortening URL",
        }, 500);
    }

    return c.json({
        message: "URL shortened successfully",
        shortId: data.customAlias || shortId,
        originalUrl: data.longUrl,
    }, 200);
}