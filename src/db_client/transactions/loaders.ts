import {runQuery} from "../connectivity/connection.js";
import {UserType} from "../../types/userType.js";
import {QueryResult} from "pg";
import {splitNodeId} from "../../helpers/resolveId.js";
import {selectAllPostsQuery, selectPostByIdQuery} from "../queries/read/posts.js";
import {selectAllDataQuery, selectUserByIdQuery} from "../queries/read/users.js";
import {selectAnswerByIdQuery, selectAnswersByPostIdQuery} from "../queries/read/answers.js";
import {selectCommentByIdQuery, selectCommentByPostIdQuery} from "../queries/read/comments.js";
import {selectUserVoteByDocumentIdQuery, selectVoteTypeByDocumentIdQuery} from "../queries/read/votes.js";
import {PostCreateInputType} from "../../types/graphql_types/input/post.js";
import {CommentCreateInputType} from "../../types/graphql_types/input/comment.js";
import {createPostQuery} from "../queries/write/post.js";
import {createCommentQuery} from "../queries/write/comment.js";
import {AnswerCreateInputType} from "../../types/graphql_types/input/answer.js";
import {createAnswerQuery} from "../queries/write/answer.js";
import {VoteCreateInputType} from "../../types/graphql_types/input/vote.js";
import {
    alterUserVoteForDocumentIdQuery,
    createVoteForDocumentIdQuery,
    removeUserVoteForDocumentIdQuery
} from "../queries/write/vote.js";


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


export const checkUserForDocumentVote = async (userId: string, documentType: string, documentId: string): Promise<any> => {

    return await runQuery(selectUserVoteByDocumentIdQuery, [userId, documentType, documentId])
        .then((result: any) => {
            return result?.rows[0];
        })

}

export const doesUserVoteTypeMatch = (dbVoteType: string, newVoteType: string): boolean => {
    return dbVoteType === newVoteType
}
export const createVote = async (voteCreateInput: VoteCreateInputType): Promise<any> => {

    const userVote = await checkUserForDocumentVote(voteCreateInput.userId, voteCreateInput.documentType, voteCreateInput.documentId);

    if (userVote) {
        console.log(userVote)

        // ToDo: check for new request's vote type; if both vote types are same remove the record, or alter the vote type

        if (doesUserVoteTypeMatch(userVote.vote_type, voteCreateInput.voteType)) {
            // ToDo: remove the record

            await runQuery(removeUserVoteForDocumentIdQuery, [voteCreateInput.userId, voteCreateInput.documentType, voteCreateInput.documentId]);
            console.log('removed ')
        } else {
            // ToDo: update the record

            await runQuery(alterUserVoteForDocumentIdQuery, [voteCreateInput.voteType, voteCreateInput.userId, voteCreateInput.documentType, voteCreateInput.documentId])
            console.log('altered')
        }
    } else {
        console.log(`no votes ${userVote}`)

        // ToDo: create vote type for the user_id for the document_id

        await runQuery(createVoteForDocumentIdQuery, [voteCreateInput.voteType, voteCreateInput.documentType, voteCreateInput.documentId, voteCreateInput.userId])
        console.log('created new')

    }

}

export const getAllUsers = async (): Promise<QueryResult<UserType> | any> => {

    const users = await runQuery(selectAllDataQuery);
    return users?.rows

}