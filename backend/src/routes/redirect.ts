import { Hono } from "hono";
import { redirectHandler } from "../controllers/redirectHandler";
const app = new Hono();

app.get('/:shortCode', redirectHandler);

export default app;