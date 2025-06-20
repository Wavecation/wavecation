// API请求封装
import React, { useEffect } from 'react';
// src/api/index.js
const API_BASE_URL = 'http://localhost:5000/api';

export const testConnection = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/test`);
    if (!response.ok) throw new Error(`HTTP错误! 状态码: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('API连接测试失败:', error);
    throw error;
  }
};


// 获取所有产品
export const fetchProducts = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error(`获取产品失败! 状态码: ${response.status}`);
    const data = await response.json();
    
    // 转换数据格式以适应前端需求
    return data.map(product => ({
      ...product,
      variants: product.variants || [] // 确保variants总是数组
    }));
  } catch (error) {
    console.error('获取产品数据时出错:', error);
    throw error;
  }
};

// 获取库存数据
export const fetchStock = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/stock`);
    
    if (!response.ok) {
      throw new Error(`库存请求失败! 状态码: ${response.status}`);
    }
    
    const data = await response.json();
    
    // 转换为前端需要的格式
    const formattedStock = {};
    Object.keys(data).forEach(productId => {
      formattedStock[productId] = {
        total: data[productId].variants.reduce((sum, v) => sum + v.quantity, 0),
        variants: data[productId].variants.map(v => v.quantity)
      };
    });
    
    return formattedStock;
  } catch (error) {
    console.error('获取库存失败:', error);
    throw error;
  }
};

// 创建订单
export const createOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

