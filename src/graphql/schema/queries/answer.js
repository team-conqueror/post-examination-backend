import { resolveId } from "../../resolvers/resolvers";
import { getVoteCountForDocument } from "../../../db_client/transactions/loaders";
import { dbIdToNodeId } from "../../../helpers/resolveId";
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
        userId: (source) => dbIdToNodeId(source.userId, 'users'),
        postId: (source) => dbIdToNodeId(source.postId, 'posts'),
        votes: async (source) => {
            return await getVoteCountForDocument('answer', source.id);
        }
    }
};
