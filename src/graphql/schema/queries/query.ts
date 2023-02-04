import {queryResultReducer} from "../../reducers/reducer";
import {getNodeById} from "../../../db_client/transactions/loaders";

export const typeDef = `#graphql
    type Query {
        node(id: ID!): Node!
        blog: BlogView!
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
        }
    }
}