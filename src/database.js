import mysql from 'mysql2/promise';
import 'dotenv/config'

export const connectDb = async() => {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'nodejs2pm',
        });

        console.log("db connected...")

        return connection;
     
    } catch (err) {
        console.log(err);
    }
}