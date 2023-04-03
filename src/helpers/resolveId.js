export const dbIdToNodeId = (dbId, tableName) => {
    return `${tableName}:${dbId}`;
};
export const splitNodeId = (nodeId) => {
    const [tableName, dbId] = nodeId.split(':');
    return { tableName, dbId };
};
