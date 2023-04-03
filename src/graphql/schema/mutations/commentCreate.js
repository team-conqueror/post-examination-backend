import { createComment } from "../../../db_client/transactions/loaders";
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
        createComment: async (_, args) => {
            return await createComment(args.commentCreateInput);
        }
    }
};
