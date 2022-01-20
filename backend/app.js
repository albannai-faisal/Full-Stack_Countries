import cors from '@koa/cors';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import router from './routes/routes.js';
import {cacheConnect} from './cache.js';

await cacheConnect();
const app = new Koa();

app.use(cors());
app.use(bodyParser());
app.use(async function handleError(ctx, next) {
  try {
    await next();
  } catch (error) {
    ctx.status = 500;
    console.log(error);
    ctx.body = error;
  }
});

app
  .use(router.routes())
  .use(router.allowedMethods());

export default app;
