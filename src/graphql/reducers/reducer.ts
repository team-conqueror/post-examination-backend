import {UserSchemaType, UserType} from "../../types/userType";
import {QueryResult} from "pg";
import {NodeByIdReturnType} from "../../types/db_resolve_types/node";


export const queryResultReducer = (result: NodeByIdReturnType) => {
    let graphNode;
    if (result.__tableName === 'users') {
        graphNode = userReducer(result);
    }
    return graphNode;
}

export const userReducer = (result: any): NodeByIdReturnType => {
    return result ?
        {
            id: result.row.id,
            email: result.row.email,
            userId: result.row.user_id,
            displayName: result.row.display_name,
            creationDate: result.row.creation_date,
            __tableName: result.__tableName
        } :
        {
            id: '',
            email: '',
            userId: '',
            displayName: '',
            creationDate: '',
            __tableName: ''
        };
}

