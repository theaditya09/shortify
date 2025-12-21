import { Context } from "hono";
import { nanoid } from "nanoid";

export const createHandler = async (c : Context) => {
    const shortId = nanoid(6);
    return "hello";
}