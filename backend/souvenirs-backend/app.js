// backend/app.js
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express(); // ✅ 先初始化 app

// 中间件
app.use(cors({
  origin: 'http://localhost:3000', // 前端开发地址
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}));
app.use(express.json());

// 路由
const productRoutes = require('./routes/productRoutes');
app.use('/api/products', productRoutes);

// 启动服务器
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`后端服务运行在 http://localhost:${PORT}`);
});
