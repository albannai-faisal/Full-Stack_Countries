import { loadFiles } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import graphql from 'graphql';

const typesArray = await loadFiles('./graphql/schemaShards/*.gql');
const resolversArray = await loadFiles('./graphql/schemaShards/*.resolvers.*');
const rootSchema = graphql.buildSchema(graphql.print(mergeTypeDefs(typesArray)));
const rootValue = mergeResolvers(resolversArray);

export { rootValue, rootSchema };

/*
curl -X POST -H "Content-Type: application/json" -d '{"query": "{ listCountries {id} }"}' http://127.0.0.1:3000/api/graphql
*/
