export const selectUserByIdQuery = {
    text: `SELECT * FROM users WHERE user_id = $1;`
}
export const selectAllDataQuery = {
    text: 'SELECT * FROM users;',
};