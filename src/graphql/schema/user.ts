import {getAllUsers} from "../../db_client/transactions/loaders";
import {userReducer} from "../reducers/reducer";
import {UserSchemaType, UserType} from "../../types/userType";

export const typeDef = `#graphql

    type User {
        id: ID
        displayName: String
        email: String
        creationDate: String
        userId: String
    }

    extend type Query {
        users: [User]
    }
 
`;

export const resolvers = {

    Query: {
        users: async (_: null): Promise<UserType[]> => {
            const users = await getAllUsers();
            return users.map((user: UserSchemaType) => {
                return userReducer(user);
            });
        },
    }
};