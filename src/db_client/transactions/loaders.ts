import {runQuery} from "../connectivity/connection";
import {selectAllDataQuery, selectPostByIdQuery, selectUserByIdQuery} from "../queries/read";
import {UserType} from "../../types/userType";
import {QueryResult} from "pg";
import {splitNodeId} from "../../helpers/resolveId";


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

    }

}

export const getAllUsers = async (): Promise<QueryResult<UserType>|any> => {

    const users = await runQuery(selectAllDataQuery);
    return users?.rows

}