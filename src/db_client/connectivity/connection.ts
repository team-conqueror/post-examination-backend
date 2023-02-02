import pkg, {QueryConfig} from 'pg';

const { Client } = pkg;

export const client = new Client({
    user: 'neminda',
    database: 'testdbnm',
    password: 'mypassword',
    port: 5432,
    host: '172.17.0.2',
});


export const runQuery = async (query: QueryConfig, params: any = []) => {
    try {
        return await client.query(query, params);
    } catch (err) {
        console.error(err);
    }
}