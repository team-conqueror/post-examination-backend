import {createAnswer} from "../../../db_client/transactions/loaders.js";
import {AnswerCreateInputType} from "../../../types/graphql_types/input/answer.js";

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
        createAnswer: async (_: null, args: { answerCreateInput: AnswerCreateInputType }) => {
            return await createAnswer(args.answerCreateInput);
        }
    }

}

