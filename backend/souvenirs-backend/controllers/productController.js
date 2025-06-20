// 创建控制器

// productController.js
const pool = require('../config/db');

exports.getAllProducts = async (req, res) => {
  try {
    const [products] = await pool.query(`
      SELECT 
        p.id,
        p.name_en,
        p.name_zh,
        pv.id AS variant_id,
        pv.color_name_en,
        pv.color_name_zh,
        pv.price,
        pv.image_path,
        i.quantity
      FROM products p
      JOIN product_variants pv ON p.id = pv.product_id
      JOIN inventory i ON pv.id = i.variant_id
    `);
    
    // 格式化为前端需要的结构
    const formattedProducts = products.reduce((acc, row) => {
      if (!acc[row.id]) {
        acc[row.id] = {
          id: row.id,
          name_en: row.name_en,
          name_zh: row.name_zh,
          variants: []
        };
      }
      acc[row.id].variants.push({
        id: row.variant_id,
        color_name_en: row.color_name_en,
        color_name_zh: row.color_name_zh,
        price: row.price,
        image_path: row.image_path,
        quantity: row.quantity
      });
      return acc;
    }, {});

    res.json(Object.values(formattedProducts));
  } catch (err) {
    console.error('Database query failed:', err);
    res.status(500).json({ 
      error: 'Database error',
      details: err.message  // 返回具体错误信息
    });
  }
};