import {makeExecutableSchema} from "@graphql-tools/schema";
import {typeDef as NodeInterface, resolver as NodeInterfaceResolver} from "./schema/node";
import {typeDef as Query, resolver as QueryResolver} from './schema/query';
import {typeDef as User, resolvers as UserResolver} from "./schema/user";
import {typeDef as Post, resolvers as PostResolver} from "./schema/post";
import {typeDef as Answer, resolvers as AnswerResolver} from "./schema/answer";
import {typeDef as Comment, resolvers as CommentResolver} from "./schema/comment";
import pkg from 'lodash';


const { merge } = pkg;
export const schema = makeExecutableSchema({
    typeDefs: [NodeInterface, Query, User, Post, Answer, Comment],
    resolvers: merge(NodeInterfaceResolver, QueryResolver, UserResolver, PostResolver, AnswerResolver, CommentResolver),
});