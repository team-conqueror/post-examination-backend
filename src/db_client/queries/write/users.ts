export const createUserQuery = {
    text: `INSERT INTO users (display_name, email, user_id) VALUES ($1, $2, $3);`
}