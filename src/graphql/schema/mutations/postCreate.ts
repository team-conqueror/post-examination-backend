import {PostCreateInputType} from "../../../types/graphql_types/input/post.js";
import {createPost} from "../../../db_client/transactions/loaders.js";

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
        createPost: async (_: null, args: { postCreateInput: PostCreateInputType }) => {
            return await createPost(args.postCreateInput);
        }
    }

}

