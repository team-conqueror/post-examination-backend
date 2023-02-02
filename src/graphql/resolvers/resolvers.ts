import {dbIdToNodeId} from "../../helpers/resolveId";

export const resolveId = (source: any) => {
    return dbIdToNodeId(source.id, source.__tableName);
}