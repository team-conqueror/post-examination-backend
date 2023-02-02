import {getAllPosts} from "../../db_client/transactions/loaders";
import {queryResultReducer} from "../reducers/reducer";

export const typeDef = `#graphql
    type BlogView {
        name(id: String!): String!
        posts: [Node]!
    }
`;

export const resolvers = {
    BlogView: {
        name: (_: null, args: {id: string}) => `Post examination forum demo API ${args.id}`,
        posts: async () => {
            const postRows = await getAllPosts();
            return postRows.map((postRow: any) => {
               return queryResultReducer(postRow);
            });
        }
    }
}