import {
    checkUserForDocumentVote,
    createVote,
    getVoteCountForDocument
} from "../../../db_client/transactions/loaders.js";
import {VoteCreateInputType} from "../../../types/graphql_types/input/vote.js";
import {splitNodeId} from "../../../helpers/resolveId.js";

export const typeDef = `#graphql

    type VoteCreateReturnType {
        votes: Int!
        currentUserVote: UserVote
    }

    input VoteCreateInputType {
        documentId: String!
        userId: String!
        voteType: String!
    }
    
    extend type Mutation {
        createVote(voteCreateInput: VoteCreateInputType!): VoteCreateReturnType!
    }

`;

export const resolver = {

    Mutation: {
        createVote: async (_: null, args: { voteCreateInput: VoteCreateInputType }) => {
            const userId = splitNodeId(args.voteCreateInput.userId).dbId;
            const {tableName: documentType, dbId: documentId} = splitNodeId(args.voteCreateInput.documentId);

            await createVote(userId, documentType, documentId, args.voteCreateInput.voteType);

            const votes = await getVoteCountForDocument(documentType, documentId);
            const userVote = await checkUserForDocumentVote(userId, documentType, documentId);
            const currentUserVote = userVote ? userVote.vote_type : null;

            return {
                votes: votes,
                currentUserVote: currentUserVote
            };
        }
    }

}

