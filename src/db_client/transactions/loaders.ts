import {runQuery} from "../connectivity/connection";
import {selectDataQuery} from "../queries/read";
import {UserType} from "../../types/userType";
import {QueryResult} from "pg";

export const getAllUsers = async (): Promise<QueryResult<UserType>|any> => {

    const users = await runQuery(selectDataQuery);
    return users?.rows

}