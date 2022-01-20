import Router from '@koa/router';
import graphqlHTTP from 'koa-graphql';
import { rootSchema, rootValue } from '../graphql/schema.js';

const router = new Router({ prefix: '/graphql' });

router.all(
  '/',
  graphqlHTTP({
    schema: rootSchema,
    rootValue: rootValue,
    graphiql: true
  })
);

export default router.routes();
