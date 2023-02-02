import {resolveId} from "../resolvers/resolvers";

export const typeDef = `#graphql

    type Post implements Node {
        id: ID!
        creationDate: String!
        body: String!
        title: String!
        userId: String!
    }

`;

export const resolvers = {

    Post: {
        id: resolveId
    }
};