import { dbIdToNodeId } from "../../helpers/resolveId";
export const resolveId = (source) => {
    return dbIdToNodeId(source.id, source.__tableName);
};
