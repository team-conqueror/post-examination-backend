import {queryResultReducer} from "../../reducers/reducer.js";
import {getNodeById} from "../../../db_client/transactions/loaders.js";

export const typeDef = `#graphql
    type Query {
        node(id: ID!): Node!
        blog: BlogView!
        login: Login!
    }
`;

export const resolver = {
    Query: {
        node: async (_:null, args: {id: string}) => {
            const result = await getNodeById(args.id);
            return queryResultReducer(result);
        },
        blog: () => {
            return 'empty';
        },
        login: () => {
            return 'empty';
        }
    }
}