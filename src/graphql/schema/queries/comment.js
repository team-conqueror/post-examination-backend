import { resolveId } from "../../resolvers/resolvers";
import { dbIdToNodeId } from "../../../helpers/resolveId";
export const typeDef = `#graphql

type Comment implements Node {
    id: ID!
    creationDate: String!
    userId: String!
    postId: String!
    body: String!
}

`;
export const resolvers = {
    Comment: {
        id: resolveId,
        userId: (source) => dbIdToNodeId(source.userId, 'users'),
        postId: (source) => dbIdToNodeId(source.postId, 'posts')
    }
};
