import {runQuery} from "../connectivity/connection";
import {UserType} from "../../types/userType";
import {QueryResult} from "pg";
import {splitNodeId} from "../../helpers/resolveId";
import {selectPostByIdQuery} from "../queries/read/posts";
import {selectAllDataQuery, selectUserByIdQuery} from "../queries/read/users";
import {selectAnswerByIdQuery, selectAnswersByPostIdQuery} from "../queries/read/answers";


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
    }
    else if (tableName === 'posts') {
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
    }

}


export const getAnswersForPostId = async (postId: string): Promise<QueryResult<UserType>|any> => {

    const answers = await runQuery(selectAnswersByPostIdQuery, [postId]);
    return answers?.rows.map((row: any) => {
        return {
            __tableName: 'answers',
            row: row
        };
    });

}
export const getAllUsers = async (): Promise<QueryResult<UserType>|any> => {

    const users = await runQuery(selectAllDataQuery);
    return users?.rows

}