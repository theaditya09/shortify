import { Hono } from "hono";
import { createHandler } from "../controllers/createHandler";
const app = new Hono();

app.post('/', createHandler);

export default app;