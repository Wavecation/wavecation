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

const Souvenirs = () => {
  const { t } = useTranslation();
  const [selectedColors, setSelectedColors] = useState({});
  const [quantities, setQuantities] = useState({});
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
  const [cartAnimation, setCartAnimation] = useState(false);

  // 本地产品数据
  const products = [
    {
      id: 1,
      name_en: "Manta Ray Plush",
      name_zh: "魔鬼鱼玩偶",
      variants: [
        {
          id: 101,
          color_name_en: "Light Grey",
          color_name_zh: "浅灰色",
          price: 35.00,
          image_path: mantaLightGrey,
          quantity: 0
        },
        {
          id: 102,
          color_name_en: "Dark Grey",
          color_name_zh: "深灰色",
          price: 35.00,
          image_path: mantaDarkGrey,
          quantity: 0
        },
        {
          id: 103,
          color_name_en: "Stary Blue",
          color_name_zh: "星空蓝",
          price: 45.00,
          image_path: mantaStaryBlue,
          quantity: 0
        },
        {
          id: 104,
          color_name_en: "Stary Green",
          color_name_zh: "星空绿",
          price: 45.00,
          image_path: mantaStaryGreen,
          quantity: 0
        }
      ]
    },
    {
      id: 2,
      name_en: "Whale Shark Plush",
      name_zh: "鲸鲨玩偶",
      variants: [
        {
          id: 201,
          color_name_en: "Dark Grey",
          color_name_zh: "深灰色",
          price: 35.00,
          image_path: whaleSharkDarkGrey,
          quantity: 0
        },
        {
          id: 202,
          color_name_en: "Light Blue",
          color_name_zh: "浅蓝色",
          price: 35.00,
          image_path: whaleSharkLightBlue,
          quantity: 0
        },
        {
          id: 203,
          color_name_en: "Dark Blue",
          color_name_zh: "深蓝色",
          price: 35.00,
          image_path: whaleSharkDarkBlue,
          quantity: 0
        }
      ]
    },
    {
      id: 3,
      name_en: "Orca Plush",
      name_zh: "虎鲸玩偶",
      variants: [
        {
          id: 301,
          color_name_en: "Classic",
          color_name_zh: "经典款",
          price: 35.00,
          image_path: orca,
          quantity: 0
        }
      ]
    },
    {
      id: 4,
      name_en: "Hammerhead Shark Plush",
      name_zh: "锤头鲨玩偶",
      variants: [
        {
          id: 401,
          color_name_en: "Light Grey",
          color_name_zh: "浅灰色",
          price: 45.00,
          image_path: hammerLightGrey,
          quantity: 0
        },
        {
          id: 402,
          color_name_en: "Blue",
          color_name_zh: "蓝色",
          price: 45.00,
          image_path: hammerBlue,
          quantity: 0
        }
      ]
    }
  ];

  // 初始化数量和颜色选择
  useEffect(() => {
    const initialQuantities = {};
    const initialColors = {};
    const initialQuantityInput = {};
    
    products.forEach(item => {
      initialQuantities[item.id] = 1;
      initialColors[item.id] = 0;
      initialQuantityInput[item.id] = '1';
    });
    
    setQuantities(initialQuantities);
    setSelectedColors(initialColors);
    setQuantityInput(initialQuantityInput);
  }, []);

  // 颜色选择处理
  const handleColorSelect = (itemId, colorIndex) => {
    setSelectedColors(prev => ({
      ...prev,
      [itemId]: colorIndex
    }));
  };

  // 数量变更处理
  const handleQuantityChange = (itemId, change) => {
    setQuantities(prev => {
      const current = prev[itemId] || 1;
      const newQuantity = Math.max(1, current + change);
      
      // 检查库存
      const product = products.find(p => p.id === itemId);
      if (product) {
        const variantIndex = selectedColors[itemId] || 0;
        const maxAvailable = product.variants[variantIndex].quantity;
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

  // 数量输入框变更处理
  const handleQuantityInputChange = (itemId, e) => {
    const value = e.target.value;
    setQuantityInput(prev => ({
      ...prev,
      [itemId]: value
    }));
  };

  // 数量输入提交处理
  const handleQuantityInputSubmit = (itemId) => {
    const value = parseInt(quantityInput[itemId], 10);
    if (isNaN(value) || value < 1) {
      alert(t('alerts.invalidQuantity'));
      return;
    }
    
    // 检查库存
    const product = products.find(p => p.id === itemId);
    if (product) {
      const variantIndex = selectedColors[itemId] || 0;
      const maxAvailable = product.variants[variantIndex].quantity;
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

  // 添加到购物车
  const addToCart = (itemId) => {
    const product = products.find(p => p.id === itemId);
    if (!product) return;
    
    const colorIndex = selectedColors[itemId] || 0;
    const quantity = quantities[itemId] || 1;
    const variant = product.variants[colorIndex];
    
    // 检查库存
    if (quantity > variant.quantity) {
      alert(`${t('alerts.insufficientStock')} ${variant.quantity} ${t('alerts.unit')}`);
      return;
    }
    
    const cartItem = {
      id: `${itemId}-${variant.id}`,
      itemId,
      variantId: variant.id,
      name: product.name_zh ? `${product.name_zh} ${product.name_en}` : product.name_en,
      color: variant.color_name_zh ? variant.color_name_zh : variant.color_name_en,
      price: variant.price,
      image: variant.image_path,
      quantity,
      colorIndex
    };
    
    setCart(prev => {
      // 检查是否已经存在相同商品
      const existingIndex = prev.findIndex(
        i => i.itemId === itemId && i.variantId === variant.id
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

  // 更新购物车商品数量
  const updateCartItemQuantity = (itemId, variantId, newQuantity) => {
    if (newQuantity < 1) return;
    
    // 检查库存
    const product = products.find(p => p.id === itemId);
    if (product) {
      const cartItem = cart.find(item => item.itemId === itemId && item.variantId === variantId);
      if (cartItem) {
        const variant = product.variants[cartItem.colorIndex];
        if (newQuantity > variant.quantity) {
          alert(`${t('alerts.insufficientStock')} ${variant.quantity} ${t('alerts.unit')}`);
          return;
        }
      }
    }
    
    setCart(prev =>
      prev.map(item =>
        item.itemId === itemId && item.variantId === variantId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // 从购物车移除商品
  const removeFromCart = (itemId, variantId) => {
    setCart(prev =>
      prev.filter(item => !(item.itemId === itemId && item.variantId === variantId))
    );
  };

  // 计算总价
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // 结账处理
  const handleCheckout = () => {
    // 验证客户信息
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone || !customerInfo.address) {
      alert(t('alerts.completeInfo'));
      return;
    }
    
    // 模拟订单处理
    setTimeout(() => {
      // 更新库存 (纯前端演示，不会持久化)
      const updatedProducts = products.map(product => {
        const cartItems = cart.filter(item => item.itemId === product.id);
        if (cartItems.length === 0) return product;
        
        const updatedVariants = product.variants.map(variant => {
          const cartItem = cartItems.find(item => item.variantId === variant.id);
          if (!cartItem) return variant;
          
          return {
            ...variant,
            quantity: variant.quantity - cartItem.quantity
          };
        });
        
        return {
          ...product,
          variants: updatedVariants
        };
      });
      
      // 在实际应用中，这里应该发送订单数据到服务器
      console.log('Order submitted:', {
        customer: customerInfo,
        items: cart,
        total: calculateTotal()
      });
      
      // 清空购物车
      setCart([]);
      setOrderSuccess(true);
      
      setTimeout(() => {
        setIsCartOpen(false);
        setOrderSuccess(false);
      }, 3000);
    }, 1000);
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
            {products.map(product => {
              const colorIndex = selectedColors[product.id] || 0;
              const quantity = quantities[product.id] || 1;
              const variant = product.variants[colorIndex];
              const currentPrice = variant ? `RM ${variant.price.toFixed(2)}` : '';
              const variantStock = variant?.quantity || 0;
              
              return (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col h-full mb-0">
                  <div className="aspect-square overflow-hidden mb-0">
                    {variant && (
                      <img  
                        src={variant.image_path} 
                        alt={product.name_en}
                        className="w-full h-full object-cover hover:animate-pulse"
                      />
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold mb-2">
                      {product.name_zh ? `${product.name_zh} ${product.name_en}` : product.name_en}
                    </h3>
                    
                    {product.variants && (
                      <div className="my-2">
                        <p className="text-sm font-medium text-gray-700">{t('souvenirs.color')}：</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {product.variants.map((variant, index) => (
                            <button
                              key={`${product.id}-${variant.id}`}
                              onClick={() => handleColorSelect(product.id, index)}
                              className={`px-2 py-1 text-xs rounded ${
                                colorIndex === index
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-200 hover:bg-gray-300'
                              } ${variant.quantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                              disabled={variant.quantity === 0}
                            >
                              {variant.color_name_zh ? variant.color_name_zh : variant.color_name_en} 
                              {variant.quantity === 0 ? `(${t('souvenirs.soldOut')})` : ''}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-2">
                      <p className="text-sm font-medium text-gray-700">{t('souvenirs.quantity')}：</p>
                      {showQuantityInput[product.id] ? (
                        <div className="flex items-center mt-1">
                          <input
                            type="number"
                            min="1"
                            max={variantStock}
                            value={quantityInput[product.id]}
                            onChange={(e) => handleQuantityInputChange(product.id, e)}
                            className="w-16 px-2 py-1 border rounded"
                          />
                          <button 
                            onClick={() => handleQuantityInputSubmit(product.id)}
                            className="ml-2 px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                          >
                            {t('souvenirs.confirm')}
                          </button>
                          <button 
                            onClick={() => setShowQuantityInput(prev => ({...prev, [product.id]: false}))}
                            className="ml-1 px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                          >
                            {t('souvenirs.cancel')}
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center mt-1">
                          <button 
                            onClick={() => handleQuantityChange(product.id, -1)}
                            className="px-3 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                            disabled={quantity <= 1}
                          >
                            -
                          </button>
                          <span 
                            className="px-4 py-1 bg-gray-100 cursor-pointer"
                            onClick={() => {
                              setShowQuantityInput(prev => ({...prev, [product.id]: true}));
                              setQuantityInput(prev => ({...prev, [product.id]: quantity.toString()}));
                            }}
                          >
                            {quantity}
                          </span>
                          <button 
                            onClick={() => handleQuantityChange(product.id, 1)}
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
                        onClick={() => addToCart(product.id)}
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
