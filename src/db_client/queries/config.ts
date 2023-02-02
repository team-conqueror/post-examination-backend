// create the sechema
export const createSchemaQuery = {
    text: 'CREATE SCHEMA post_exam;',
};

// set path
export const setSearchPathQuery = {
    text: 'SET search_path TO post_exam;',
};

/***
 * PURPOSE: Create users table and insert data
 */
// create table users
export const createUserTableQuery = {
    text: `
    CREATE TABLE users (
      id serial,
      display_name varchar(50) NOT NULL,
      email varchar(50) NOT NULL,
      user_id varchar(50) PRIMARY KEY,
      creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `,
};

// insert data into users
export const insertDataInToUsersQuery = {
    text: `
    WITH generated_data AS (
      SELECT
        'User ' || row_number() OVER () AS display_name,
        'user' || row_number() OVER () || '@example.com' AS email,
        'SE/2017/' || lpad(row_number() OVER ()::text, 3, '0') AS user_id
      FROM generate_series(1, 50)
    )
    INSERT INTO users (display_name, email, user_id)
    SELECT display_name, email, user_id
    FROM generated_data;
    `
};

/***
 * PURPOSE: Create posts table and insert data
 */
// create table posts
export const createPostTableQuery = {
    text: `
    CREATE TABLE posts (
      post_id serial PRIMARY KEY,
      user_id varchar(50) REFERENCES users(user_id),
      creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      body varchar(1000),
      title varchar(100)
    );
  `,
}

// insert data into posts
export const insertDataInToPostsQuery = {
    text: `
    WITH generated_data AS (
      SELECT
        'Lorem Ipsum' AS body,
        'Sample Title ' || row_number() OVER () AS title,
        'SE/2017/' || lpad(row_number() OVER ()::text, 3, '0') AS user_id
      FROM generate_series(1, 50)
    )
    INSERT INTO posts (body, title, user_id)
    SELECT body, title, user_id
    FROM generated_data;
    `
};
