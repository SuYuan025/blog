const mysql = require('mysql2/promise');
const GenId = require('../utils/SnowFlake.js');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123123',
  database: 'blog',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const genId = new GenId({ WorkerId: 1 });

const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('MySQL Connected');
    connection.release();
  } catch (error) {
    console.error('Error connecting to MySQL:', error);
  }
};

module.exports = { db: pool, connectDB, genId };
