import {createVote} from "../../../db_client/transactions/loaders.js";
import {VoteCreateInputType} from "../../../types/graphql_types/input/vote.js";

export const typeDef = `#graphql

    input VoteCreateInputType {
        documentId: String!
        userId: String!
        voteType: String!
    }
    
    extend type Mutation {
        createVote(voteCreateInput: VoteCreateInputType!): Int!
    }

`;

export const resolver = {

    Mutation: {
        createVote: async (_: null, args: { voteCreateInput: VoteCreateInputType }) => {
            return await createVote(args.voteCreateInput);
        }
    }

}

