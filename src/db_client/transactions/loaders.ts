import {runQuery} from "../connectivity/connection";
import {selectAllDataQuery, selectUserByIdQuery} from "../queries/read";
import {UserType} from "../../types/userType";
import {QueryResult} from "pg";
import {splitNodeId} from "../../helpers/resolveId";
import {result} from "lodash";


export const getNodeById = async (nodeId: string) => {

    const {tableName, dbId} = splitNodeId(nodeId);

    if (tableName === 'users') {

        const user = runQuery(selectUserByIdQuery, [dbId])
            .then((result) => {
                return {
                    __tableName: tableName,
                    row: result?.rows[0]
                };
            });
        return user


    }

}

export const getAllUsers = async (): Promise<QueryResult<UserType>|any> => {

    const users = await runQuery(selectAllDataQuery);
    return users?.rows

}