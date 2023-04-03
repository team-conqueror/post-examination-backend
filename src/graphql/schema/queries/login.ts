import fetch from "node-fetch";
import {getNodeById} from "../../../db_client/transactions/loaders.js";
import {queryResultReducer} from "../../reducers/reducer.js";
import {getUserDetails} from "../../../service/getUserDetails.js";

export const typeDef = `#graphql

    type Login {
        login: Node
    }

`;

export const resolver = {
    Login: {
        login: async (_: null, __: any, contextValue: any) => {
            const response = await getUserDetails(contextValue);
            const user: any = await response.json();

            const result = await getNodeById(`users:${user.user.user._id}`);

            if (result.row) {
                return queryResultReducer(result);
            } else {
                return result.row;
            }
        },
    }
}