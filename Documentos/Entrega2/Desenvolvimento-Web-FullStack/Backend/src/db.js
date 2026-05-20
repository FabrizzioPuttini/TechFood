import 'dotenv/config';
import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  // 👇 Linhas adicionadas para permitir a conexão segura com o TiDB Cloud 👇
  ssl: {
    rejectUnauthorized: true
  }
});

export default pool;