import {resolveId} from "../resolvers/resolvers";
import {getVoteCountForDocument} from "../../db_client/transactions/loaders";

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
        votes: async (source: any) => {
            return await getVoteCountForDocument('answer', source.id)
        }
    }
};