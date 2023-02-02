export const dbIdToNodeId = (dbId : string, tableName : string) : string => {
    return `${tableName}:${dbId}`;
};

export const splitNodeId = (nodeId : string): {tableName: string, dbId: string} => {
    const [tableName, dbId] = nodeId.split(':');
    return { tableName, dbId };
};