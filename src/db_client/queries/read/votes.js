/***
 * Usage: defines db queries for votes table
 */
export const selectAllDataQuery = {
    text: 'SELECT * FROM votes;',
};
export const selectVoteByIdQuery = {
    text: `SELECT * FROM votes WHERE answer_id = $1;`
};
export const selectVoteTypeByDocumentIdQuery = {
    text: `SELECT COUNT(*) FROM votes WHERE document_type = $1 AND document_id = $2 AND vote_type = $3;`
};
