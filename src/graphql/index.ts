import {makeExecutableSchema} from "@graphql-tools/schema";
import pkg from 'lodash';

import {typeDef as NodeInterface, resolver as NodeInterfaceResolver} from "./schema/queries/node.js";
import {typeDef as Query, resolver as QueryResolver} from './schema/queries/query.js';
import {typeDef as User, resolvers as UserResolver} from "./schema/queries/user.js";
import {typeDef as Post, resolvers as PostResolver} from "./schema/queries/post.js";
import {typeDef as Answer, resolvers as AnswerResolver} from "./schema/queries/answer.js";
import {typeDef as Comment, resolvers as CommentResolver} from "./schema/queries/comment.js";
import {typeDef as BlogView, resolvers as BlogViewResolver} from "./schema/queries/blog.js";

import {typeDef as Mutation, resolver as MutationResolver} from "./schema/mutations/mutation.js";
import {typeDef as PostCreate, resolver as PostCreateResolver} from "./schema/mutations/postCreate.js";
import {typeDef as CommentCreate, resolver as CommentCreateResolver} from "./schema/mutations/commentCreate.js";
import {typeDef as AnswerCreate, resolver as AnswerCreateResolver} from "./schema/mutations/answerCreate.js";



const {merge} = pkg;
export const schema = makeExecutableSchema({
    typeDefs: [NodeInterface, Query, User, Post, Answer, Comment, BlogView, Mutation, PostCreate, CommentCreate, AnswerCreate],
    resolvers: merge(NodeInterfaceResolver, QueryResolver, UserResolver, PostResolver, AnswerResolver, CommentResolver, BlogViewResolver, MutationResolver, PostCreateResolver, CommentCreateResolver, AnswerCreateResolver),
});