// routes/api.js
const express = require('express');
const router = express.Router();
const db = require('../database'); // 您的数据库连接

/**
 * 获取库存数据
 * 根据您的数据库结构，需要连接 products 和 product_variants 表
 */
router.get('/stock', async (req, res) => {
  try {
    const query = `
      SELECT 
        p.id AS product_id,
        p.name_en,
        p.name_zh,
        v.id AS variant_id,
        v.color_name_en,
        v.color_name_zh,
        v.price,
        v.image_path,
        v.quantity AS stock_quantity
      FROM products p
      JOIN product_variants v ON p.id = v.product_id
    `;
    
    const [results] = await db.query(query);
    
    // 格式化数据匹配前端需求
    const stockData = {};
    results.forEach(item => {
      if (!stockData[item.product_id]) {
        stockData[item.product_id] = {
          name_en: item.name_en,
          name_zh: item.name_zh,
          variants: []
        };
      }
      stockData[item.product_id].variants.push({
        id: item.variant_id,
        color_name_en: item.color_name_en,
        color_name_zh: item.color_name_zh,
        price: item.price,
        image_path: item.image_path,
        quantity: item.stock_quantity
      });
    });
    
    res.json(stockData);
  } catch (error) {
    console.error('数据库查询失败:', error);
    res.status(500).json({ error: '获取库存数据失败' });
  }
});