import {resolveId} from "../resolvers/resolvers";

export const typeDef = `#graphql

    type User implements Node {
        id: ID!
        displayName: String!
        email: String!
        creationDate: String!
        userId: String!
    }
 
`;

export const resolvers = {

    User: {
        id: resolveId
        // users: async (_: null): Promise<UserType[]> => {
        //     const users = await getAllUsers();
        //     return users.map((user: UserSchemaType) => {
        //         return userReducer(user);
        //     });
        // },
    }
};