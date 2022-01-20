import Router from '@koa/router';
import GraphQLRouter from './graphql.js';

const router = new Router({ prefix: '/api' });

router.get('/', ctx => {
  ctx.body = 'Working all';
});

router.use(GraphQLRouter);

export default router;
