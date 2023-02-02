/***
 * Usage: defines db queries for users table
 */

export const selectAllDataQuery = {
    text: 'SELECT * FROM users;',
};

export const selectUserByIdQuery = {
    text: `SELECT * FROM users WHERE user_id = $1;`
}