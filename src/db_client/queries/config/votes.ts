/***
 * PURPOSE: Create votes table and insert data
 */


// create enum type votes
export const createVoteTableEnumsQuery = {
    text: `
    CREATE TYPE vote_type AS ENUM ('up_vote', 'down_vote');
    CREATE TYPE document_type AS ENUM ('post', 'answer');
  `,
}
// create table votes
export const createVoteTableQuery = {
    text: `
    CREATE TABLE votes (
      vote_id serial PRIMARY KEY,
      vote_type vote_type, 
      document_type document_type,
      document_id serial,
      user_id varchar(50) REFERENCES users(user_id)
    );
  `,
}


// insert data into votes
export const insertDataInToVotesQuery = {
    text: `
    INSERT INTO votes (vote_type, document_type, document_id, user_id)
    VALUES ('up_vote', 'post', '1', 'SE/2017/034')
    `
};