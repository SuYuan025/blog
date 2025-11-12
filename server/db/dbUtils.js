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

// 数据库连接函数
const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('连接成功');
    connection.release();
  } catch (error) {
    console.error('连接失败:', error);
  }
};

// 封装常用的数据库方法
const db = {
  // 查询多条语句
  async all(sql, params = []) {
    try {
      const [rows] = await pool.execute(sql, params)
      return { success: true, data: rows }
    } catch (error) {
      return { success: false, error: error.message }
    }
  },

  // 执行更新、插入、删除操作
  async run(sql, params = []) {
    try {
      const [result] = await pool.execute(sql, params);
      return { success: true, data: result };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}

module.exports = { connectDB, genId, db };
