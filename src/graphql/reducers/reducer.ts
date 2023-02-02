import {UserSchemaType, UserType} from "../../types/userType";

export const userReducer = (dbVal: UserSchemaType | null): UserType => {
    return dbVal ?
        {
            id: dbVal.id,
            email: dbVal.email,
            userId: dbVal.user_id,
            displayName: dbVal.display_name,
            creationDate: dbVal.creation_date
        } :
        {
            id: '',
            email: '',
            userId: '',
            displayName: '',
            creationDate: ''
        };
}