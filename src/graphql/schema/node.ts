import {NodeResolveType} from "../../types/graphql_types/node";

export const typeDef = `#graphql
    interface Node {
        id: ID!
    }
`;

export const resolver = {
    Node: {
        __resolveType(source: NodeResolveType){
            if(source.__tableName === 'users'){
                return 'User';
            }
            return null; // GraphQLError is thrown
        },
    }
};