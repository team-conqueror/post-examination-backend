import {createUser} from "../../../db_client/transactions/loaders.js";
import {getUserDetails} from "../../../service/getUserDetails.js";

export const typeDef = `#graphql

    extend type Mutation {
        register: Node
    }

`;

export const resolver = {
    Mutation: {
        register: async (_: null, __: any, contextValue: any) => {
            const response = await getUserDetails(contextValue);
            const user: any = await response.json();

            await createUser({
                displayName: user.user.user.name,
                email: user.user.user.email,
                userId: user.user.user._id
            });

        }
    }
}