import {resolveId} from "../resolvers/resolvers";
import {getAnswersForPostId, getCommentsForPostId, getNodeById} from "../../db_client/transactions/loaders";
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
        comments: async (source: any) => {
            const commentRows = await getCommentsForPostId(source.id);
            return commentRows.map((commentRow: any) => {
                return queryResultReducer(commentRow)
            });
        }
    }
};