const pool = require('../config/db');

class Product {
  static async findAll() {
    const [rows] = await pool.query(`
      SELECT p.id, p.name_en, p.name_zh, 
             pv.id AS variant_id, pv.color_name_en, pv.color_name_zh, 
             pv.price, pv.image_path, i.quantity
      FROM products p
      JOIN product_variants pv ON p.id = pv.product_id
      JOIN inventory i ON pv.id = i.variant_id
    `);
    return rows;
  }
}

module.exports = Product;