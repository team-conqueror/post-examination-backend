import { runQuery } from "../connectivity/connection";
import { splitNodeId } from "../../helpers/resolveId";
import { selectAllPostsQuery, selectPostByIdQuery } from "../queries/read/posts";
import { selectAllDataQuery, selectUserByIdQuery } from "../queries/read/users";
import { selectAnswerByIdQuery, selectAnswersByPostIdQuery } from "../queries/read/answers";
import { selectCommentByIdQuery, selectCommentByPostIdQuery } from "../queries/read/comments";
import { selectVoteTypeByDocumentIdQuery } from "../queries/read/votes";
import { createPostQuery } from "../queries/write/post";
import { createCommentQuery } from "../queries/write/comment";
import { createAnswerQuery } from "../queries/write/answer";
export const getNodeById = async (nodeId) => {
    const { tableName, dbId } = splitNodeId(nodeId);
    if (tableName === 'users') {
        return runQuery(selectUserByIdQuery, [dbId])
            .then((result) => {
            return {
                __tableName: tableName,
                row: result?.rows[0]
            };
        });
    }
    else if (tableName === 'posts') {
        return runQuery(selectPostByIdQuery, [dbId])
            .then((result) => {
            return {
                __tableName: tableName,
                row: result?.rows[0]
            };
        });
    }
    else if (tableName === 'answers') {
        return runQuery(selectAnswerByIdQuery, [dbId])
            .then((result) => {
            return {
                __tableName: tableName,
                row: result?.rows[0]
            };
        });
    }
    else if (tableName === 'comments') {
        return runQuery(selectCommentByIdQuery, [dbId])
            .then((result) => {
            return {
                __tableName: tableName,
                row: result?.rows[0]
            };
        });
    }
};
export const getAnswersForPostId = async (postId) => {
    const answers = await runQuery(selectAnswersByPostIdQuery, [postId]);
    return answers?.rows.map((row) => {
        return {
            __tableName: 'answers',
            row: row
        };
    });
};
export const getCommentsForPostId = async (postId) => {
    const answers = await runQuery(selectCommentByPostIdQuery, [postId]);
    return answers?.rows.map((row) => {
        return {
            __tableName: 'comments',
            row: row
        };
    });
};
export const getVoteCountForDocument = async (documentType, documentId) => {
    const upVotes = await runQuery(selectVoteTypeByDocumentIdQuery, [documentType, documentId, 'up_vote'])
        .then((result) => {
        return result?.rows[0].count;
    });
    const downVotes = await runQuery(selectVoteTypeByDocumentIdQuery, [documentType, documentId, 'down_vote'])
        .then((result) => {
        return result?.rows[0].count;
    });
    return upVotes - downVotes;
};
export const getAllPosts = async () => {
    const posts = await runQuery(selectAllPostsQuery);
    return posts?.rows.map((row) => {
        return {
            __tableName: 'posts',
            row: row
        };
    });
};
export const createPost = async (postCreateInput) => {
    const userId = splitNodeId(postCreateInput.userId).dbId;
    const post = await runQuery(createPostQuery, [postCreateInput.title, postCreateInput.body, userId]);
    //ToDo: return the newly created post
};
export const createComment = async (commentCreateInput) => {
    const postId = splitNodeId(commentCreateInput.postId).dbId;
    const userId = splitNodeId(commentCreateInput.userId).dbId;
    const comment = await runQuery(createCommentQuery, [commentCreateInput.body, postId, userId]);
    //ToDo: return the newly created comment
};
export const createAnswer = async (answerCreateInput) => {
    const postId = splitNodeId(answerCreateInput.postId).dbId;
    const userId = splitNodeId(answerCreateInput.userId).dbId;
    const answer = await runQuery(createAnswerQuery, [answerCreateInput.body, postId, userId]);
    //ToDo: return the newly created answer
};
export const getAllUsers = async () => {
    const users = await runQuery(selectAllDataQuery);
    return users?.rows;
};
