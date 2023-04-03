import {resolveId} from "../../resolvers/resolvers.js";
import {
    checkUserForDocumentVote,
    getAnswersForPostId,
    getCommentsForPostId,
    getVoteCountForDocument
} from "../../../db_client/transactions/loaders.js";
import {dbIdToNodeId, splitNodeId} from "../../../helpers/resolveId.js";
import {queryResultReducer} from "../../reducers/reducer.js";
import {getUserDetails} from "../../../service/getUserDetails.js";

export const typeDef = `#graphql

    type Post implements Node {
        id: ID!
        creationDate: String!
        body: String!
        title: String!
        userId: String!
        answers: [Node]
        comments: [Node]
        votes: Int!
        currentUserVote: UserVote
    }

`;

export const resolvers = {

    Post: {
        id: resolveId,
        answers: async (source: any) => {
            const answerRows = await getAnswersForPostId(source.id);
            return answerRows.map((answerRow: any) => {
                return queryResultReducer(answerRow);
            });
        },
        userId: (source: any) => dbIdToNodeId(source.userId, 'users'),
        comments: async (source: any) => {
            const commentRows = await getCommentsForPostId(source.id);
            return commentRows.map((commentRow: any) => {
                return queryResultReducer(commentRow);
            });
        },
        votes: async (source: any, _: any, contextValue: any) => {
            return await getVoteCountForDocument('posts', source.id);
        },
        currentUserVote: async (source: any, _: any, context: any) => {
            const response = await getUserDetails(context);
            const user: any = await response.json();

            const userId = user.user.user._id;
            const userVote = await checkUserForDocumentVote(userId, 'posts', source.id);
            return userVote ? userVote.vote_type : null;
        }
    }
};