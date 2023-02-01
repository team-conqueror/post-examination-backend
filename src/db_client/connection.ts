import pkg from 'pg';

const { Pool } = pkg;
export const connectDB = async () => {

    return new Pool({
        user: 'neminda',
        database: 'testdbnm',
        password: 'mypassword',
        port: 5432,
        host: '172.17.0.2',
    });
}