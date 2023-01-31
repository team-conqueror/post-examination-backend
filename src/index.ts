import dotenv from 'dotenv';

import {ApolloServer} from '@apollo/server';
import {startStandaloneServer} from '@apollo/server/standalone';
import {connectDB} from "./db_client/connection";



dotenv.config();

const port: number = Number(process.env.PORT);

// Construct a schema, using GraphQL schema language
const typeDefs = `#graphql
  type Query {
    hello: String
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
    Query: {
        hello: () => 'Hello world! 3',
    },
};

const server = new ApolloServer({typeDefs, resolvers});

const {url} = await startStandaloneServer(server, {
    listen: {port: port},
});

console.log(`🚀  Server ready at: ${url}`);



const pool = connectDB();

async function insertData() {
    const [name, color] = ["blue", "red"];
    try {
        const res = await (await pool).query(
            "INSERT INTO shark (name, color) VALUES ($1, $2)",
            [name, color]
        );
        console.log(`Added a shark with the name ${name}`);
    } catch (error) {
        console.error(error)
    }
    console.log(name, color);
}

insertData().then(r => console.log('done inserting'))
