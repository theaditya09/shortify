import { Hono } from 'hono'
import { cors } from 'hono/cors'
import app from './routes/index'

const router = new Hono();

router.use('*', cors({
  origin: '*',
  allowMethods: ['GET', 'POST', 'PUT'],
}))

router.get('/test', (c) => {
  return c.json({
    message: 'test request',
  }).status(200);
})

router.route('/api/v1', app);

export default router;
