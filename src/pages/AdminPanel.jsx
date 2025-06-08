import React, { useState, useEffect } from 'react';
import { souvenirs } from '../data/souvenirs';

const AdminPanel = () => {
  const [souvenirOrders, setSouvenirOrders] = useState([]);
  const [tripOrders, setTripOrders] = useState([]);
  const [stock, setStock] = useState({});
  const [selectedTab, setSelectedTab] = useState('souvenirOrders');
  const [editingStock, setEditingStock] = useState(null);

  // Helper functions
  const getActivityName = (activityCode) => {
    const activities = {
      'OW': '开放水域潜水(OW)',
      'AOW': '进阶开放水域(AOW)',
      'fundive': '欢乐潜水(Fundive)',
      'snorkeling': '浮潜'
    };
    return activities[activityCode] || activityCode;
  };

  const getAccommodationName = (accommodationCode) => {
    const accommodations = {
      'single': '单人房',
      'double': '双人房',
      'triple': '三人房',
      'quad': '四人房',
      'dorm': '六人拼房'
    };
    return accommodations[accommodationCode] || accommodationCode;
  };

  // Load data from localStorage
  useEffect(() => {
    const loadData = () => {
      const storedSouvenirOrders = localStorage.getItem('souvenirOrders');
      const storedTripOrders = localStorage.getItem('tripOrders');
      const storedStock = localStorage.getItem('souvenirStock');
      
      if (storedSouvenirOrders) {
        setSouvenirOrders(JSON.parse(storedSouvenirOrders));
      }
      
      if (storedTripOrders) {
        setTripOrders(JSON.parse(storedTripOrders));
      }
      
      if (storedStock) {
        setStock(JSON.parse(storedStock));
      } else {
        // Initialize stock
        const initialStock = {};
        souvenirs.forEach(item => {
          initialStock[item.id] = {
            variants: item.colors.map(() => 0),
            total: 0
          };
        });
        setStock(initialStock);
      }
    };
    
    loadData();
  }, []);

  // Stock management functions
  const updateStock = (itemId, variantIndex, newQuantity) => {
    const newStock = { ...stock };
    if (newStock[itemId]) {
      newStock[itemId].variants[variantIndex] = Math.max(0, newQuantity);
      newStock[itemId].total = newStock[itemId].variants.reduce((sum, qty) => sum + qty, 0);
      
      setStock(newStock);
      localStorage.setItem('souvenirStock', JSON.stringify(newStock));
    }
  };

  const startEditingStock = (itemId, variantIndex) => {
    setEditingStock({ itemId, variantIndex });
  };

  const endEditingStock = () => {
    setEditingStock(null);
  };

  const bulkUpdateStock = (itemId) => {
    const item = souvenirs.find(i => i.id === parseInt(itemId));
    if (!item) return;

    const newQuantities = prompt(`请输入${item.name}的所有颜色库存，用逗号分隔:`);
    if (newQuantities) {
      const quantities = newQuantities.split(',').map(qty => parseInt(qty.trim()) || 0);
      const newStock = { ...stock };
      
      if (newStock[itemId] && quantities.length === newStock[itemId].variants.length) {
        newStock[itemId].variants = quantities;
        newStock[itemId].total = quantities.reduce((sum, qty) => sum + qty, 0);
        
        setStock(newStock);
        localStorage.setItem('souvenirStock', JSON.stringify(newStock));
      } else {
        alert('输入的数量与颜色种类不匹配');
      }
    }
  };

  // Souvenir order functions
  const markSouvenirOrderAsCompleted = (orderIndex) => {
    const newOrders = [...souvenirOrders];
    newOrders[orderIndex].completed = true;
    setSouvenirOrders(newOrders);
    localStorage.setItem('souvenirOrders', JSON.stringify(newOrders));
  };

  const deleteSouvenirOrder = (orderIndex) => {
    if (window.confirm('确定要删除此纪念品订单吗？')) {
      const newOrders = [...souvenirOrders];
      newOrders.splice(orderIndex, 1);
      setSouvenirOrders(newOrders);
      localStorage.setItem('souvenirOrders', JSON.stringify(newOrders));
    }
  };

  // Trip order functions
  const markTripOrderAsCompleted = (orderIndex) => {
    const newOrders = [...tripOrders];
    newOrders[orderIndex].completed = true;
    setTripOrders(newOrders);
    localStorage.setItem('tripOrders', JSON.stringify(newOrders));
  };

  const deleteTripOrder = (orderIndex) => {
    if (window.confirm('确定要删除此行程订单吗？')) {
      const newOrders = [...tripOrders];
      newOrders.splice(orderIndex, 1);
      setTripOrders(newOrders);
      localStorage.setItem('tripOrders', JSON.stringify(newOrders));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Wavecation管理后台</h1>
        
        <div className="mb-6">
          <nav className="flex space-x-4">
            <button
              onClick={() => setSelectedTab('souvenirOrders')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                selectedTab === 'souvenirOrders'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              纪念品订单 ({souvenirOrders.length})
            </button>
            <button
              onClick={() => setSelectedTab('tripOrders')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                selectedTab === 'tripOrders'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              行程订单 ({tripOrders.length})
            </button>
            <button
              onClick={() => setSelectedTab('stock')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                selectedTab === 'stock'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-700 hover:bg-gray-200'
              }`}
            >
              库存管理
            </button>
          </nav>
        </div>
        
        {selectedTab === 'souvenirOrders' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">纪念品订单列表</h2>
            
            {souvenirOrders.length === 0 ? (
              <p className="text-gray-500">暂无纪念品订单</p>
            ) : (
              <div className="space-y-6">
                {souvenirOrders.map((order, index) => (
                  <div key={index} className={`border rounded-lg p-4 ${order.completed ? 'bg-gray-50' : 'bg-white'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          订单 #{index + 1} - {new Date(order.date).toLocaleString()}
                          {order.completed && <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">已完成</span>}
                        </h3>
                        <p className="text-sm text-gray-500">客户: {order.customer.name}</p>
                        <p className="text-sm text-gray-500">电话: {order.customer.phone}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">RM {order.total.toFixed(2)}</p>
                        <div className="mt-2 space-x-2">
                          {!order.completed && (
                            <button
                              onClick={() => markSouvenirOrderAsCompleted(index)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                              标记完成
                            </button>
                          )}
                          <button
                            onClick={() => deleteSouvenirOrder(index)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                          >
                            删除订单
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-medium mb-2">商品清单:</h4>
                      <ul className="space-y-2">
                        {order.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="flex justify-between">
                            <span>
                              {item.name} - {item.color} × {item.quantity}
                            </span>
                            <span>RM {(item.price * item.quantity).toFixed(2)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="mt-4 pt-4 border-t">
                      <h4 className="font-medium mb-2">配送地址:</h4>
                      <p className="text-gray-700">{order.customer.address}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {selectedTab === 'tripOrders' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">行程订单列表</h2>
            
            {tripOrders.length === 0 ? (
              <p className="text-gray-500">暂无行程订单</p>
            ) : (
              <div className="space-y-6">
                {tripOrders.map((order, index) => (
                  <div key={order.id} className={`border rounded-lg p-4 ${order.completed ? 'bg-gray-50' : 'bg-white'}`}>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">
                          行程订单 #{index + 1} - {new Date(order.date).toLocaleString()}
                          {order.completed && <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">已完成</span>}
                        </h3>
                        <p className="text-sm text-gray-500">客户: {order.customer.name}</p>
                        <p className="text-sm text-gray-500">电话: {order.customer.phone}</p>
                        <p className="text-sm text-gray-500">邮箱: {order.customer.email}</p>
                      </div>
                      <div className="text-right">
                        <div className="mt-2 space-x-2">
                          {!order.completed && (
                            <button
                              onClick={() => markTripOrderAsCompleted(index)}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                            >
                              标记完成
                            </button>
                          )}
                          <button
                            onClick={() => deleteTripOrder(index)}
                            className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                          >
                            删除订单
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-4 border-t pt-4">
                      <h4 className="font-medium mb-2">行程详情:</h4>
                      <ul className="space-y-2">
                        <li><strong>日期:</strong> {order.tripDetails.startDate} 至 {order.tripDetails.endDate}</li>
                        <li><strong>活动:</strong> {getActivityName(order.tripDetails.activity)}</li>
                        <li><strong>住宿:</strong> {getAccommodationName(order.tripDetails.accommodation)}</li>
                        <li><strong>交通:</strong> {order.tripDetails.transport === 'yes' ? '需要接送' : '不需要接送'}</li>
                        <li><strong>船票:</strong> {order.tripDetails.boatTicket === 'yes' ? '需要' : '不需要'}</li>
                        <li><strong>包餐:</strong> {order.tripDetails.meal === 'yes' ? '需要' : '不需要'}</li>
                        <li><strong>客户类型:</strong> {order.tripDetails.isMalaysian === 'yes' ? '马来西亚公民' : '外国游客'}</li>
                      </ul>
                    </div>
                    
                    {order.tripDetails.transport === 'yes' && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium mb-2">接送地址:</h4>
                        <p className="text-gray-700">{order.customer.address}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {selectedTab === 'stock' && (
          <div className="bg-white shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">库存管理</h2>
            
            <div className="space-y-6">
              {Object.entries(stock).map(([itemId, itemStock]) => {
                const item = souvenirs.find(i => i.id === parseInt(itemId));
                if (!item) return null;
                
                return (
                  <div key={itemId} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <button
                        onClick={() => bulkUpdateStock(item.id)}
                        className="px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded"
                      >
                        批量更新
                      </button>
                    </div>
                    <p className="mb-3">总库存: <span className="font-bold">{itemStock.total}</span></p>
                    
                    <div className="space-y-3">
                      {item.colors.map((color, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="w-1/3">{color.name}</span>
                          <div className="flex items-center">
                            {editingStock?.itemId === parseInt(itemId) && editingStock?.variantIndex === index ? (
                              <>
                                <input
                                  type="number"
                                  value={itemStock.variants[index]}
                                  onChange={(e) => updateStock(parseInt(itemId), index, parseInt(e.target.value) || 0)}
                                  className="w-20 px-2 py-1 border rounded"
                                  min="0"
                                />
                                <button
                                  onClick={endEditingStock}
                                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                >
                                  确认
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => updateStock(parseInt(itemId), index, itemStock.variants[index] - 1)}
                                  disabled={itemStock.variants[index] <= 0}
                                  className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300 disabled:opacity-50"
                                >
                                  -
                                </button>
                                <span 
                                  className="px-4 py-1 bg-gray-100 cursor-pointer"
                                  onClick={() => startEditingStock(parseInt(itemId), index)}
                                >
                                  {itemStock.variants[index]}
                                </span>
                                <button
                                  onClick={() => updateStock(parseInt(itemId), index, itemStock.variants[index] + 1)}
                                  className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                                >
                                  +
                                </button>
                              </>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;