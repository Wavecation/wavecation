const Order = require('../models/Order');
const Customer = require('../models/Customer');

exports.createOrder = async (req, res) => {
  const { customer, items } = req.body;
  
  try {
    // 创建客户记录
    const [customerResult] = await pool.query(
      'INSERT INTO customers (name, email, phone, address) VALUES (?, ?, ?, ?)',
      [customer.name, customer.email, customer.phone, customer.address]
    );
    const customerId = customerResult.insertId;
    
    // 计算总金额
    const totalAmount = items.reduce((sum, item) => sum + (item.unit_price * item.quantity), 0);
    
    // 创建订单
    const orderId = await Order.create(customerId, totalAmount);
    
    // 创建订单项并更新库存
    await Order.createItems(orderId, items);
    
    res.json({ 
      orderId,
      status: 'pending'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};