import { createPost } from "../../../db_client/transactions/loaders";
export const typeDef = `#graphql

    input PostCreateInputType {
        title: String!
        body: String!
        userId: String!
    }

    extend type Mutation {
        createPost(postCreateInput: PostCreateInputType!): Node
    }

`;
export const resolver = {
    Mutation: {
        createPost: async (_, args) => {
            return await createPost(args.postCreateInput);
        }
    }
};
