import { Context } from "hono";
import { nanoid } from "nanoid";
import { urlInput } from "@swekandrew/shortify-schemas";
import { getPrisma } from "../db";

export const createHandler = async (c : Context) => {
    const prisma = getPrisma(c.env.ACCELERATE_URL);
    
    const {success, data, error} = urlInput.safeParse(await c.req.json());
    if(!success) return c.json({
        message: "Invalid URL",
        error: error.message,
    }, 400);

    const shortId = nanoid(6);
    return c.json({
        message: "URL shortened successfully",
        shortId: shortId,
        originalUrl: data.url,
    }, 200);
}