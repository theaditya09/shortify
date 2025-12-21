import { Hono } from "hono";
import create from "./create";
const app = new Hono();

app.route('/shorten', create);

export default app;