export const createCommentQuery = {
    text: `INSERT INTO comments (body, post_id, user_id) VALUES ($1, $2, $3);`
}