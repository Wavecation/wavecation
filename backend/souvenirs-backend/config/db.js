// 数据库连接配置

const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'souvenirs_shop',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  port: process.env.DB_PORT || 3306
});

pool.getConnection()
  .then(conn => {
    console.log('✅ 成功连接到MySQL数据库');
    conn.release();
  })
  .catch(err => {
    console.error('❌ 数据库连接失败:', err.message);
  });

module.exports = pool;