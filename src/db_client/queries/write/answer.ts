export const createAnswerQuery = {
    text: `INSERT INTO answers (body, post_id, user_id) VALUES ($1, $2, $3);`
}