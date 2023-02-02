import dotenv from 'dotenv';

import {ApolloServer} from '@apollo/server';

import express from 'express';
import * as http from "http";
import {ApolloServerPluginDrainHttpServer} from "@apollo/server/plugin/drainHttpServer";
import {expressMiddleware} from "@apollo/server/express4";
import pkg from 'body-parser';
import {schema} from "./graphql/schema/schema";
import {client, runQuery} from "./db_client/connectivity/connection";
import {createSchemaQuery, createTableQuery, insertDataQuery, setSearchPathQuery} from "./db_client/queries/config";
import {selectDataQuery} from "./db_client/queries/read";

const { json } = pkg;


dotenv.config();

const port: number = Number(process.env.PORT);

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
// await runQuery(createTableQuery);
// await runQuery(insertDataQuery);

