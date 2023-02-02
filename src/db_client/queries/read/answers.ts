/***
 * Usage: defines db queries for answers table
 */

export const selectAllDataQuery = {
    text: 'SELECT * FROM answers;',
};

export const selectAnswerByIdQuery = {
    text: `SELECT * FROM answers WHERE answer_id = $1;`
}
export const selectAnswersByPostIdQuery = {
    text: `SELECT * FROM answers WHERE post_id = $1;`
}