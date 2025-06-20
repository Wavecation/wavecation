const pool = require('../config/db');

class Order {
  static async create(customerId, totalAmount) {
    const [result] = await pool.query(
      'INSERT INTO orders (customer_id, total_amount, status) VALUES (?, ?, ?)',
      [customerId, totalAmount, 'pending']
    );
    return result.insertId;
  }

  static async createItems(orderId, items) {
    for (const item of items) {
      await pool.query(
        'INSERT INTO order_items (order_id, variant_id, quantity, unit_price) VALUES (?, ?, ?, ?)',
        [orderId, item.variant_id, item.quantity, item.unit_price]
      );
      
      // 更新库存
      await pool.query(
        'UPDATE inventory SET quantity = quantity - ? WHERE variant_id = ?',
        [item.quantity, item.variant_id]
      );
    }
  }
}

module.exports = Order;