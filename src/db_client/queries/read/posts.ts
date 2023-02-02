/***
 * Usage: defines db queries for posts table
 */

export const selectAllDataQuery = {
    text: 'SELECT * FROM posts;',
};

export const selectPostByIdQuery = {
    text: `SELECT * FROM posts WHERE post_id = $1;`
}
