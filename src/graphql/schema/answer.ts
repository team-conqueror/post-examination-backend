import {resolveId} from "../resolvers/resolvers";
import {getVoteCountForDocument} from "../../db_client/transactions/loaders";
import {dbIdToNodeId} from "../../helpers/resolveId";

export const typeDef = `#graphql

    type Answer implements Node {
        id: ID!
        creationDate: String!
        userId: String!
        postId: String!
        body: String!
        votes: Int!
    }

`;

export const resolvers = {

    Answer: {
        id: resolveId,
        userId: (source: any) => dbIdToNodeId(source.userId, 'users'),
        postId: (source: any) => dbIdToNodeId(source.postId, 'posts'),
        votes: async (source: any) => {
            return await getVoteCountForDocument('answer', source.id)
        }
    }
};