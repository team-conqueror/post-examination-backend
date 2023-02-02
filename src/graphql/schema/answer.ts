import {resolveId} from "../resolvers/resolvers";

export const typeDef = `#graphql

    type Answer implements Node {
        id: ID!
        creationDate: String!
        userId: String!
        postId: String!
        body: String!
        
    }

`;

export const resolvers = {

    Answer: {
        id: resolveId
    }
};