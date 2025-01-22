import mysql from 'mysql2/promise';
import 'dotenv/config'

export const connectDb = async() => {
    try {
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            database: process.env.DB_NAME,
        });

        console.log("db connected...")

        return connection;
     
    } catch (err) {
        console.log(err);
    }
}