import { createAnswer } from "../../../db_client/transactions/loaders";
export const typeDef = `#graphql

    input AnswerCreateInputType {
        body: String!
        postId: String!
        userId: String!
    }
    
    extend type Mutation {
        createAnswer(answerCreateInput: AnswerCreateInputType!): Node
    }

`;
export const resolver = {
    Mutation: {
        createAnswer: async (_, args) => {
            return await createAnswer(args.answerCreateInput);
        }
    }
};
