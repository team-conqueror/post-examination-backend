import {dbIdToNodeId} from "../../helpers/resolveId.js";

export const resolveId = (source: any) => {
    return dbIdToNodeId(source.id, source.__tableName);
}