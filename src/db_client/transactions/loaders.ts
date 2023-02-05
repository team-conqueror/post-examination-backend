import {runQuery} from "../connectivity/connection.js";
import {UserType} from "../../types/userType.js";
import {QueryResult} from "pg";
import {splitNodeId} from "../../helpers/resolveId.js";
import {selectAllPostsQuery, selectPostByIdQuery} from "../queries/read/posts.js";
import {selectAllDataQuery, selectUserByIdQuery} from "../queries/read/users.js";
import {selectAnswerByIdQuery, selectAnswersByPostIdQuery} from "../queries/read/answers.js";
import {selectCommentByIdQuery, selectCommentByPostIdQuery} from "../queries/read/comments.js";
import {selectVoteTypeByDocumentIdQuery} from "../queries/read/votes.js";
import {PostCreateInputType} from "../../types/graphql_types/input/post.js";
import {CommentCreateInputType} from "../../types/graphql_types/input/comment.js";
import {createPostQuery} from "../queries/write/post.js";
import {createCommentQuery} from "../queries/write/comment.js";
import {AnswerCreateInputType} from "../../types/graphql_types/input/answer.js";
import {createAnswerQuery} from "../queries/write/answer.js";


export const getNodeById = async (nodeId: string) => {

    const {tableName, dbId} = splitNodeId(nodeId);

    if (tableName === 'users') {
        return runQuery(selectUserByIdQuery, [dbId])
            .then((result) => {
                return {
                    __tableName: tableName,
                    row: result?.rows[0]
                };
            })
    } else if (tableName === 'posts') {
        return runQuery(selectPostByIdQuery, [dbId])
            .then((result) => {
                return {
                    __tableName: tableName,
                    row: result?.rows[0]
                };
            })
    } else if (tableName === 'answers') {
        return runQuery(selectAnswerByIdQuery, [dbId])
            .then((result) => {
                return {
                    __tableName: tableName,
                    row: result?.rows[0]
                };
            })
    } else if (tableName === 'comments') {
        return runQuery(selectCommentByIdQuery, [dbId])
            .then((result) => {
                return {
                    __tableName: tableName,
                    row: result?.rows[0]
                };
            })
    }

}


export const getAnswersForPostId = async (postId: string): Promise<QueryResult<UserType> | any> => {

    const answers = await runQuery(selectAnswersByPostIdQuery, [postId]);
    return answers?.rows.map((row: any) => {
        return {
            __tableName: 'answers',
            row: row
        };
    });

}

export const getCommentsForPostId = async (postId: string): Promise<QueryResult<UserType> | any> => {

    const answers = await runQuery(selectCommentByPostIdQuery, [postId]);
    return answers?.rows.map((row: any) => {
        return {
            __tableName: 'comments',
            row: row
        };
    });

}

export const getVoteCountForDocument = async (documentType: string, documentId: string): Promise<any> => {
    const upVotes = await runQuery(selectVoteTypeByDocumentIdQuery, [documentType, documentId, 'up_vote'])
        .then((result: any) => {
            return result?.rows[0].count;
        });
    const downVotes = await runQuery(selectVoteTypeByDocumentIdQuery, [documentType, documentId, 'down_vote'])
        .then((result: any) => {
            return result?.rows[0].count;
        });
    return upVotes - downVotes

}


export const getAllPosts = async (): Promise<any> => {
    const posts = await runQuery(selectAllPostsQuery)
    return posts?.rows.map((row: any) => {
        return {
            __tableName: 'posts',
            row: row
        };
    });
}

export const createPost = async (postCreateInput: PostCreateInputType): Promise<any> => {

    const userId = splitNodeId(postCreateInput.userId).dbId;

    const post = await runQuery(createPostQuery, [postCreateInput.title, postCreateInput.body, userId]);

    //ToDo: return the newly created post
}

export const createComment = async (commentCreateInput: CommentCreateInputType): Promise<any> => {

    const postId = splitNodeId(commentCreateInput.postId).dbId;
    const userId = splitNodeId(commentCreateInput.userId).dbId;

    const comment = await runQuery(createCommentQuery, [commentCreateInput.body, postId, userId]);

    //ToDo: return the newly created comment
}

export const createAnswer = async (answerCreateInput: AnswerCreateInputType): Promise<any> => {

    const postId = splitNodeId(answerCreateInput.postId).dbId;
    const userId = splitNodeId(answerCreateInput.userId).dbId;

    const answer = await runQuery(createAnswerQuery, [answerCreateInput.body, postId, userId]);

    //ToDo: return the newly created answer
}

export const getAllUsers = async (): Promise<QueryResult<UserType> | any> => {

    const users = await runQuery(selectAllDataQuery);
    return users?.rows

}