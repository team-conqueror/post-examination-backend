export const createVoteForDocumentIdQuery = {
    text: `INSERT INTO votes (vote_type, document_type, document_id, user_id) VALUES ($1, $2, $3, $4);`
}

export const alterUserVoteForDocumentIdQuery = {
    text: `UPDATE votes SET vote_type = $1 WHERE user_id = $2 AND document_type = $3 AND document_id = $4;`
}

export const removeUserVoteForDocumentIdQuery = {
    text: `DELETE FROM votes WHERE user_id = $1 AND document_type = $2 AND document_id = $3;`
}
