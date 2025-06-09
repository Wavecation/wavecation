import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import CartModal from '../components/CartModal';
import { useTranslation } from 'react-i18next';

// 导入所有图片
import mantaLightGrey from '../images/manta_light_grey.jpg';
import mantaDarkGrey from '../images/manta_dark_grey.jpg';
import mantaStaryBlue from '../images/manta_stary_blue.jpg';
import mantaStaryGreen from '../images/manta_stary_green.jpg';
import whaleSharkDarkGrey from '../images/ws_dark_grey.jpg';
import whaleSharkLightBlue from '../images/ws_light_blue.jpg';
import whaleSharkDarkBlue from '../images/ws_dark_blue.jpg';
import orca from '../images/orca.jpg';
import hammerLightGrey from '../images/hammer_light_grey.jpg';
import hammerBlue from '../images/hammer_blue.jpg';


// 模拟API调用
const fetchStockData = async () => {
  const storedStock = localStorage.getItem('souvenirStock');
  if (storedStock) {
    return JSON.parse(storedStock);
  }
  
  // 默认库存数据
  const defaultStock = {
    1: { total: 100, variants: [25, 25, 25, 25] }, // Manta
    2: { total: 80, variants: [30, 25, 25] },      // Whale Shark
    3: { total: 50, variants: [50] },              // Orca
    4: { total: 60, variants: [30, 30] }           // Hammerhead
  };
  
  localStorage.setItem('souvenirStock', JSON.stringify(defaultStock));
  return defaultStock;
};

const updateStockData = async (newStock) => {
  localStorage.setItem('souvenirStock', JSON.stringify(newStock));
};

const fetchOrders = async () => {
  const orders = localStorage.getItem('souvenirOrders');
  return orders ? JSON.parse(orders) : [];
};


const Souvenirs = () => {
  const { t } = useTranslation();
  const souvenirs = [
    {
      id: 1,
      name: '蝠鲼 Manta',
      colors: [
        { name: t('souvenirs.colors.classicLightGrey'), price: 38.00, image: mantaLightGrey },
        { name: t('souvenirs.colors.classicDarkGrey'), price: 38.00, image: mantaDarkGrey },
        { name: t('souvenirs.colors.starryBlue'), price: 45.00, image: mantaStaryBlue },
        { name: t('souvenirs.colors.starryGreen'), price: 45.00, image: mantaStaryGreen },
      ]
    },
    {
      id: 2,
      name: '鲸鲨 Whale Shark',
      colors: [
        { name: t('souvenirs.colors.lightGrey'), price: 35.00, image: whaleSharkDarkGrey },
        { name: t('souvenirs.colors.lightBlue'), price: 35.00, image: whaleSharkLightBlue },
        { name: t('souvenirs.colors.darkBlue'), price: 35.00, image: whaleSharkDarkBlue },
      ]
    },
    {
      id: 3,
      name: '虎鲸 Orca',
      colors: [
        { name: t('souvenirs.colors.classicBlackWhite'), price: 35.00, image: orca },
      ]
    },
    {
      id: 4,
      name: '锤头鲨 Hammerhead',
      colors: [
        { name: t('souvenirs.colors.lightGrey'), price: 45.00, image: hammerLightGrey },
        { name: t('souvenirs.colors.carbonBlue'), price: 45.00, image: hammerBlue },
      ]
    }
  ];
  const [selectedColors, setSelectedColors] = useState({});
  const [quantities, setQuantities] = useState({});
  const [stock, setStock] = useState({});
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: ''
  });
  const [showQuantityInput, setShowQuantityInput] = useState({});
  const [quantityInput, setQuantityInput] = useState({});
  const [orders, setOrders] = useState([]);
  const [showOrders, setShowOrders] = useState(false);
  const [cartAnimation, setCartAnimation] = useState(false);

  // 初始化库存数据
  useEffect(() => {
    const loadData = async () => {
      const stockData = await fetchStockData();
      const orderData = await fetchOrders();
      setStock(stockData);
      setOrders(orderData);
      
      // 初始化数量和颜色选择
      const initialQuantities = {};
      const initialColors = {};
      const initialQuantityInput = {};
      souvenirs.forEach(item => {
        initialQuantities[item.id] = 1;
        initialColors[item.id] = 0;
        initialQuantityInput[item.id] = '1';
      });
      setQuantities(initialQuantities);
      setSelectedColors(initialColors);
      setQuantityInput(initialQuantityInput);
    };
    
    loadData();
  }, []);

  const handleColorSelect = (itemId, colorIndex) => {
    setSelectedColors(prev => ({
      ...prev,
      [itemId]: colorIndex
    }));
  };

  const handleQuantityChange = (itemId, change) => {
    setQuantities(prev => {
      const current = prev[itemId] || 1;
      const newQuantity = Math.max(1, current + change);
      
      // 检查库存
      const itemStock = stock[itemId];
      if (itemStock) {
        const variantIndex = selectedColors[itemId] || 0;
        const maxAvailable = itemStock.variants[variantIndex];
        if (newQuantity > maxAvailable) {
          alert(`${t('alerts.insufficientStock')} ${maxAvailable} ${t('alerts.unit')}`);
          return prev;
        }
      }
      
      return {
        ...prev,
        [itemId]: newQuantity
      };
    });
  };

  const handleQuantityInputChange = (itemId, e) => {
    const value = e.target.value;
    setQuantityInput(prev => ({
      ...prev,
      [itemId]: value
    }));
  };

  const handleQuantityInputSubmit = (itemId) => {
    const value = parseInt(quantityInput[itemId], 10);
    if (isNaN(value) || value < 1) {
      alert(t('alerts.invalidQuantity'));
      return;
    }
    
    // 检查库存
    const itemStock = stock[itemId];
    if (itemStock) {
      const variantIndex = selectedColors[itemId] || 0;
      const maxAvailable = itemStock.variants[variantIndex];
      if (value > maxAvailable) {
        alert(`${t('alerts.insufficientStock')} ${maxAvailable} ${t('alerts.unit')}`);
        return;
      }
    }
    
    setQuantities(prev => ({
      ...prev,
      [itemId]: value
    }));
    setShowQuantityInput(prev => ({
      ...prev,
      [itemId]: false
    }));
  };

  const addToCart = (itemId) => {
    const item = souvenirs.find(i => i.id === itemId);
    if (!item) return;
    
    const colorIndex = selectedColors[itemId] || 0;
    const quantity = quantities[itemId] || 1;
    const color = item.colors[colorIndex];
    
    // 检查库存
    const itemStock = stock[itemId];
    if (itemStock) {
      const variantStock = itemStock.variants[colorIndex];
      if (quantity > variantStock) {
        alert(`${t('alerts.insufficientStock')} ${variantStock} ${t('alerts.unit')}`);
        return;
      }
    }
    
    const cartItem = {
      id: `${itemId}-${colorIndex}`,
      itemId,
      name: item.name,
      color: color.name,
      price: color.price,
      image: color.image,
      quantity,
      colorIndex
    };
    
    setCart(prev => {
      // 检查是否已经存在相同商品
      const existingIndex = prev.findIndex(
        i => i.itemId === itemId && i.colorIndex === colorIndex
      );
      
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      
      return [...prev, cartItem];
    });
    
    // 触发购物车动画
    setCartAnimation(true);
    setTimeout(() => setCartAnimation(false), 1000);
  };

  const updateCartItemQuantity = (itemId, colorIndex, newQuantity) => {
    if (newQuantity < 1) return;
    
    // 检查库存
    const itemStock = stock[itemId];
    if (itemStock) {
      const variantStock = itemStock.variants[colorIndex];
      if (newQuantity > variantStock) {
        alert(`${t('alerts.insufficientStock')} ${variantStock} ${t('alerts.unit')}`);
        return;
      }
    }
    
    setCart(prev =>
      prev.map(item =>
        item.itemId === itemId && item.colorIndex === colorIndex
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (itemId, colorIndex) => {
    setCart(prev =>
      prev.filter(item => !(item.itemId === itemId && item.colorIndex === colorIndex))
    );
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = async () => {
    // 验证客户信息
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      alert(t('alerts.completeInfo'));
      return;
    }
    
    // 更新库存
    const newStock = { ...stock };
    cart.forEach(item => {
      if (newStock[item.itemId]) {
        newStock[item.itemId].variants[item.colorIndex] -= item.quantity;
        newStock[item.itemId].total -= item.quantity;
      }
    });
    
    await updateStockData(newStock);
    setStock(newStock);
    
    // 创建订单
    const order = {
      id: Date.now().toString(),
      customer: customerInfo,
      items: cart,
      total: calculateTotal(),
      date: new Date().toISOString(),
      status: '待付款'
    };
    
    // 保存订单
    const updatedOrders = [...orders, order];
    localStorage.setItem('souvenirOrders', JSON.stringify(updatedOrders));
    setOrders(updatedOrders);
    
    // 清空购物车
    setCart([]);
    setOrderSuccess(true);
    setTimeout(() => {
      setIsCartOpen(false);
      setOrderSuccess(false);
    }, 3000);
  };

  const deleteOrder = async (orderId) => {
    if (window.confirm('确定要删除此订单吗？')) {
      const updatedOrders = orders.filter(order => order.id !== orderId);
      localStorage.setItem('souvenirOrders', JSON.stringify(updatedOrders));
      setOrders(updatedOrders);
    }
  };

  return (
    <div className="m-0 p-0">
      <Header />
      <main className="pt-16 pb-12">
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-center my-6">{t('souvenirs.title')}</h1>
          <h2 className="text-2xl font-semibold text-center mb-6">{t('souvenirs.subtitle')}</h2>
          <p className="text-lg text-center mb-12">{t('souvenirs.desc')}</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {souvenirs.map(item => {
              const colorIndex = selectedColors[item.id] || 0;
              const quantity = quantities[item.id] || 1;
              const currentPrice = item.colors 
                ? `RM ${item.colors[colorIndex].price.toFixed(2)}` 
                : item.price;
              
              // 获取库存信息
              const itemStock = stock[item.id];
              const variantStock = itemStock?.variants?.[colorIndex] || 0;
              
              return (
                <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full mb-0">
                  <div className="aspect-square overflow-hidden mb-0">
                    <img  
                      src={item.colors ? item.colors[colorIndex].image : item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover hover:animate-pulse"
                    />
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
                    
                    {item.colors && (
                      <div className="my-2">
                        <p className="text-sm font-medium text-gray-700">{t('souvenirs.color')}：</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {item.colors.map((color, index) => (
                            <button
                              key={`${item.id}-${index}`}
                              onClick={() => handleColorSelect(item.id, index)}
                              className={`px-2 py-1 text-xs rounded ${
                                colorIndex === index
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-200 hover:bg-gray-300'
                              } ${itemStock?.variants?.[index] === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                              disabled={itemStock?.variants?.[index] === 0}
                            >
                              {color.name} {itemStock?.variants?.[index] === 0 ? `(${t('souvenirs.soldOut')})` : ''}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">{t('souvenirs.quantity')}：</p>
                      {showQuantityInput[item.id] ? (
                        <div className="flex items-center mt-1">
                          <input
                            type="number"
                            min="1"
                            max={variantStock}
                            value={quantityInput[item.id]}
                            onChange={(e) => handleQuantityInputChange(item.id, e)}
                            className="w-16 px-2 py-1 border rounded"
                          />
                          <button 
                            onClick={() => handleQuantityInputSubmit(item.id)}
                            className="ml-2 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            {t('souvenirs.confirm')}
                          </button>
                          <button 
                            onClick={() => setShowQuantityInput(prev => ({...prev, [item.id]: false}))}
                            className="ml-1 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            {t('souvenirs.cancel')}
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center mt-1">
                          <button 
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                            disabled={quantity <= 1}
                          >
                            -
                          </button>
                          <span 
                            className="px-4 py-1 bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setShowQuantityInput(prev => ({...prev, [item.id]: true}));
                              setQuantityInput(prev => ({...prev, [item.id]: quantity.toString()}));
                            }}
                          >
                            {quantity}
                          </span>
                          <button 
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="px-3 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                            disabled={quantity >= variantStock}
                          >
                            +
                          </button>
                          <span className="ml-2 text-sm text-gray-500">
                            {variantStock > 0 ? `${t('souvenirs.stock')} : ${variantStock}` : t('souvenirs.soldOut')}
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-auto">
                      <p className="text-lg font-bold text-blue-600 mb-4 h-8 flex items-center">
                        {currentPrice}
                      </p>
                      <button 
                        onClick={() => addToCart(item.id)}
                        className={`w-full py-2 rounded-md transition-colors ${
                          variantStock > 0
                            ? 'bg-blue-600 text-white hover:bg-blue-700'
                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        }`}
                        disabled={variantStock === 0}
                      >
                        {variantStock > 0 ? t('souvenirs.button') : t('souvenirs.soldOut')}
                      </button>
                    </div>
                  </div>
                </div>
                
              );
            })}
            <p className="text-xs text-gray-500 text-center flex mt-0">
            {t('souvenirs.freeShipping')}
            </p>
          </div>
        </section>
      </main>
      
      {/* 购物车图标 */}
      <div 
        className={`fixed top-20 right-4 z-50 w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white cursor-pointer shadow-lg transition-transform ${cartAnimation ? 'animate-bounce' : ''}`}
        onClick={() => setIsCartOpen(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        {cart.length > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
            {cart.reduce((total, item) => total + item.quantity, 0)}
          </span>
        )}
      </div>
      
      {/* 购物车模态框 */}
      <CartModal 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        updateCartItemQuantity={updateCartItemQuantity}
        removeFromCart={removeFromCart}
        total={calculateTotal()}
        customerInfo={customerInfo}
        setCustomerInfo={setCustomerInfo}
        handleCheckout={handleCheckout}
        orderSuccess={orderSuccess}
      />
      
      <Footer />
    </div>
  );
};

export default Souvenirs;