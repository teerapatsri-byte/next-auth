import mysql from "mysql2/promise";

export const connect = await mysql.createConnection({
  uri: process.env.DATABASE_URL,
});
