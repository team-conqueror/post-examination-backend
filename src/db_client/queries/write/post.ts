export const createPostQuery = {
    text: `INSERT INTO posts (title, body, user_id) VALUES ($1, $2, $3);`
}