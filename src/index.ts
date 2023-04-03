import dotenv from 'dotenv';

import {ApolloServer} from '@apollo/server';

import express from 'express';
import * as http from "http";
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import {expressMiddleware} from "@apollo/server/express4";
import pkg from 'body-parser';
import {client, runQuery} from "./db_client/connectivity/connection.js";
import {createSchemaQuery, setSearchPathQuery} from "./db_client/queries/config/config.js";
import {schema} from "./graphql/index.js";
import cors from 'cors';


import {
    createUserTableQuery,
    insertDataInToUsersQuery,
} from './db_client/queries/config/users.js';
import {
    createPostTableQuery,
    insertDataInToPostsQuery
} from "./db_client/queries/config/posts.js";
import {createAnswerTableQuery, insertDataInToAnswersQuery} from "./db_client/queries/config/answers.js";
import {createCommentTableQuery, insertDataInToCommentsQuery} from "./db_client/queries/config/comments.js";
import {
    createVoteTableEnumsQuery,
    createVoteTableQuery,
    insertDataInToVotesQuery
} from "./db_client/queries/config/votes.js";


const { json } = pkg;

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();

app.use(
    '/graphql',
    json(),
    cors<cors.CorsRequest>(),
    expressMiddleware(server, {
        context: async ({ req }) => ({ token: req.headers.token }),
    }),
);

await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);

// Connect to the PostgreSQL database
await client.connect();

// await runQuery(createSchemaQuery);
await runQuery(setSearchPathQuery);

// users table

// await runQuery(createUserTableQuery);
// await runQuery(insertDataInToUsersQuery);

// posts table

// await runQuery(createPostTableQuery);
// await runQuery(insertDataInToPostsQuery);

// answers table

// await runQuery(createAnswerTableQuery);
// await runQuery(insertDataInToAnswersQuery);


// comments table

// await runQuery(createCommentTableQuery);
// await runQuery(insertDataInToCommentsQuery);

// votes table

// await runQuery(createVoteTableEnumsQuery);
// await runQuery(createVoteTableQuery);
// await runQuery(insertDataInToVotesQuery);
