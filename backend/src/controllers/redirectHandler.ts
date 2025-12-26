import { Context } from "hono";
import { getPrisma } from "../db";

export const redirectHandler = async (c : Context) => {
    const prisma = getPrisma(c.env.ACCELERATE_URL);
    const shortCode = c.req.param('shortCode');

    if(!shortCode) return c.json({
        message: "Invalid short code",
    }, 400);

    try {
        const url = await prisma.url.findUnique({
            where: {
                shortCode: shortCode,
            },
        });

        if (!url) {
            return c.json({
                message: "Short code not found",
            }, 404);
        }
        
        return c.redirect(url.longUrl);
    }
    catch (error) {
        return c.json({
            message: "Error redirecting URL",
        }, 500);
    }
}