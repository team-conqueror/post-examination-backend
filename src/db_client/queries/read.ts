// table: users
export const selectAllDataQuery = {
    text: 'SELECT * FROM users;',
};

export const selectUserByIdQuery = {
    text: `SELECT * FROM users WHERE user_id = $1;`
}

// table: posts
export const selectPostByIdQuery = {
    text: `SELECT * FROM posts WHERE post_id = $1;`
}
