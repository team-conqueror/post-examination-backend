import { getAllPosts } from "../../../db_client/transactions/loaders";
import { queryResultReducer } from "../../reducers/reducer";
export const typeDef = `#graphql
    type BlogView {
        name(id: String!): String!
        posts: [Node]!
    }
`;
export const resolvers = {
    BlogView: {
        name: (_, args) => `Post examination forum demo API ${args.id}`,
        posts: async () => {
            const postRows = await getAllPosts();
            return postRows.map((postRow) => {
                return queryResultReducer(postRow);
            });
        }
    }
};
