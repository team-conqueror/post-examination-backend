import {createAnswer, createComment} from "../../../db_client/transactions/loaders";
import {CommentCreateInputType} from "../../../types/graphql_types/input/comment";
import {AnswerCreateInputType} from "../../../types/graphql_types/input/answer";

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

