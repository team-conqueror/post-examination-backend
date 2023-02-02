export const createSchemaQuery = { // one time
    text: 'CREATE SCHEMA post_exam;',
};

export const setSearchPathQuery = {
    text: 'SET search_path TO post_exam;',
};

export const createTableQuery = { // one time
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

export const insertDataQuery = { // one time
    text: `
    INSERT INTO users (display_name, email, user_id)
    VALUES ('John Doe', 'johndoe@example.com', 'SE/2017/034'),
           ('Jane Doe', 'janedoe@example.com', 'SE/2017/035'),
           ('Jane Doe', 'janedoe@example.com', 'SE/2017/036');
  `,
};
