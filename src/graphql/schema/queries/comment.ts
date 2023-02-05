import {resolveId} from "../../resolvers/resolvers.js";
import {dbIdToNodeId} from "../../../helpers/resolveId.js";

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
        id: resolveId,
        userId: (source: any) => dbIdToNodeId(source.userId, 'users'),
        postId: (source: any) => dbIdToNodeId(source.postId, 'posts')
    }
};