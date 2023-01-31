import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';


// Construct a schema, using GraphQL schema language
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello world! 1',
    },
};

const server = new ApolloServer({typeDefs, resolvers});

const {url} = await startStandaloneServer(server, {
    listen: {port: 4000},
});

console.log(`🚀  Server ready at: ${url}`);
