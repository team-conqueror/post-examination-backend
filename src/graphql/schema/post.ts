import {resolveId} from "../resolvers/resolvers";

export const typeDef = `#graphql

    type Post implements Node {
        id: ID!
        creationDate: String!
        body: String!
        title: String!
        userId: String!
    }

`;

export const resolvers = {

    Post: {
        id: resolveId
        // users: async (_: null): Promise<UserType[]> => {
        //     const users = await getAllUsers();
        //     return users.map((user: UserSchemaType) => {
        //         return userReducer(user);
        //     });
        // },
    }
};