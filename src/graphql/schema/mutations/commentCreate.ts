import {createComment} from "../../../db_client/transactions/loaders";
import {CommentCreateInputType} from "../../../types/graphql_types/input/comment";

export const typeDef = `#graphql

    input CommentCreateInputType {
        body: String!
        postId: String!
        userId: String!
    }
    
    extend type Mutation {
        createComment(commentCreateInput: CommentCreateInputType!): Node
    }

`;

export const resolver = {

    Mutation: {
        createComment: async (_: null, args: { commentCreateInput: CommentCreateInputType }) => {
            return await createComment(args.commentCreateInput);
        }
    }

}

