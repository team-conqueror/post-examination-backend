import {NodeByIdReturnType} from "../../types/db_resolve_types/node";


export const queryResultReducer = (result: NodeByIdReturnType) => {
    let graphNode;
    if (result.__tableName === 'users') {
        graphNode = userReducer(result);
    } else if (result.__tableName === 'posts') {
        graphNode = postReducer(result)
    } else if (result.__tableName === 'answers') {
        graphNode = answerReducer(result)
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

export const postReducer = (result: any): NodeByIdReturnType => {
    return result ?
        {
            id: result.row.post_id,
            creationDate: result.row.creation_date,
            body: result.row.body,
            title: result.row.title,
            userId: result.row.user_id,
            __tableName: result.__tableName
        } :
        {
            id: '',
            creationDate: '',
            body: '',
            title: '',
            userId: '',
            __tableName: ''
        };
}

export const answerReducer = (result: any): NodeByIdReturnType => {
    return result ?
        {
            id: result.row.answer_id,
            creationDate: result.row.creation_date,
            userId: result.row.user_id,
            postId: result.row.post_id,
            body: result.row.body,
            __tableName: result.__tableName
        } :
        {
            id: '',
            creationDate: '',
            body: '',
            title: '',
            userId: '',
            __tableName: ''
        };
}
