import {resolveId} from "../resolvers/resolvers";

export const typeDef = `#graphql

type Comment implements Node {
    id: ID!
    creationDate: String!
    userId: String!
    postId: String!
    body: String!
}

`;

export const resolvers = {

    Comment: {
        id: resolveId
    }
};