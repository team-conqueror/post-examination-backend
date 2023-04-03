/***
 * Usage: defines db queries for comments table
 */
export const selectAllDataQuery = {
    text: 'SELECT * FROM comments;',
};
export const selectCommentByIdQuery = {
    text: `SELECT * FROM comments WHERE comment_id = $1;`
};
export const selectCommentByPostIdQuery = {
    text: `SELECT * FROM comments WHERE post_id = $1;`
};
