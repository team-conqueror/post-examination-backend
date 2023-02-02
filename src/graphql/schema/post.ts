import {resolveId} from "../resolvers/resolvers";
import {getAnswersForPostId, getCommentsForPostId, getVoteCountForDocument} from "../../db_client/transactions/loaders";
import {dbIdToNodeId} from "../../helpers/resolveId";
import {queryResultReducer} from "../reducers/reducer";

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
    }

`;

export const resolvers = {

    Post: {
        id: resolveId,
        answers: async (source: any) => {
            const answerRows = await getAnswersForPostId(source.id);
            return answerRows.map((answerRow: any) => {
                return queryResultReducer(answerRow)
            });
        },
        userId: (source: any) => dbIdToNodeId(source.userId, 'users'),
        comments: async (source: any) => {
            const commentRows = await getCommentsForPostId(source.id);
            return commentRows.map((commentRow: any) => {
                return queryResultReducer(commentRow)
            });
        },
        votes: async (source: any, _: any, contextValue: any) => {
            return await getVoteCountForDocument('post', source.id)
        }
    }
};