import {makeExecutableSchema} from "@graphql-tools/schema";
import {typeDef as NodeInterface, resolver as NodeInterfaceResolver} from "./schema/node";
import {typeDef as Query, resolver as QueryResolver} from './schema/query';
import {typeDef as User, resolvers as UserResolvers, } from "./schema/user";
import {typeDef as Post, resolvers as PostResolvers, } from "./schema/post";
import {typeDef as Answer, resolvers as AnswerResolvers, } from "./schema/answer";
import pkg from 'lodash';


const { merge } = pkg;
export const schema = makeExecutableSchema({
    typeDefs: [NodeInterface, Query, User, Post, Answer],
    resolvers: merge(NodeInterfaceResolver, QueryResolver, UserResolvers, PostResolvers, AnswerResolvers),
});