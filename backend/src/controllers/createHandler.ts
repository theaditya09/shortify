import { Context } from "hono";
import { nanoid } from "nanoid";
import { urlInput } from "@swekandrew/shortify-schemas";

export const createHandler = async (c : Context) => {
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