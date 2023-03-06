import {resolveId} from "../../resolvers/resolvers.js";
import {checkUserForDocumentVote, getVoteCountForDocument} from "../../../db_client/transactions/loaders.js";
import {dbIdToNodeId, splitNodeId} from "../../../helpers/resolveId.js";

export const typeDef = `#graphql

    type Answer implements Node {
        id: ID!
        creationDate: String!
        userId: String!
        postId: String!
        body: String!
        votes: Int!
        currentUserVote: UserVote
    }

`;

export const resolvers = {

    Answer: {
        id: resolveId,
        userId: (source: any) => dbIdToNodeId(source.userId, 'users'),
        postId: (source: any) => dbIdToNodeId(source.postId, 'posts'),
        votes: async (source: any) => {
            return await getVoteCountForDocument('answers', source.id)
        },
        currentUserVote: async (source: any, _: any, context: any) => {
            const userId = splitNodeId(context.token).dbId;
            const userVote = await checkUserForDocumentVote(userId, 'answers', source.id);
            return userVote ? userVote.vote_type : null;
        }
    }
};