/***
 * PURPOSE: Create answers table and insert data
 */


// create table answers
export const createAnswerTableQuery = {
    text: `
    CREATE TABLE answers (
      answer_id serial PRIMARY KEY,
      user_id varchar(50) REFERENCES users(user_id),
      post_id serial REFERENCES posts(post_id),
      creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      body varchar(1000)
    );
  `,
}

// insert data into posts
export const insertDataInToAnswersQuery = {
    text: `
    WITH generated_data AS (
      SELECT
        'Lorem Ipsum' AS body,
        row_number() OVER () AS post_id,
        'SE/2017/' || lpad(row_number() OVER ()::text, 3, '0') AS user_id
      FROM generate_series(1, 10)
    )
    INSERT INTO answers (body, post_id, user_id)
    SELECT body, post_id, user_id
    FROM generated_data;
    `
};