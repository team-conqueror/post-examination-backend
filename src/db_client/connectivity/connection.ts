import pkg, {QueryConfig} from 'pg';

const { Client } = pkg;

export const client = new Client({
    user: 'neminda',
    database: 'post_examination_db',
    password: 'postexamination',
    port: 5432,
    host: process.env.DATABASE_HOST_URL,
});


export const runQuery = async (query: QueryConfig, params: any = []) => {
    try {
        return await client.query(query, params);
    } catch (err) {
        console.error(err);
    }
}