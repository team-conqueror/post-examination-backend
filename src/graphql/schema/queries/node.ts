import {NodeResolveType} from "../../../types/graphql_types/node.js";

export const typeDef = `#graphql
    interface Node {
        id: ID!
    }
`;

export const resolver = {
    Node: {
        __resolveType(source: NodeResolveType) {
            if (source.__tableName === 'users') {
                return 'User';
            } else if (source.__tableName === 'posts') {
                return 'Post'
            } else if (source.__tableName === 'answers') {
                return 'Answer'
            } else if (source.__tableName === 'comments') {
                return 'Comment'
            }
                return null; // GraphQLError is thrown
        },
    }
};