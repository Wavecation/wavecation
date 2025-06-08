import React from 'react';
import TngQR from '../images/Tng_QR.jpg';

const CartModal = ({
  isOpen,
  onClose,
  cart,
  updateCartItemQuantity,
  removeFromCart,
  total,
  customerInfo,
  setCustomerInfo,
  handleCheckout,
  orderSuccess
}) => {
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-2xl font-bold">购物车</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {orderSuccess ? (
            <div className="py-8 text-center">
              <svg className="mx-auto h-16 w-16 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="mt-4 text-xl font-medium text-gray-900">订单提交成功!</h3>
              <p className="mt-2 text-gray-600">
                感谢您的购买！
              </p>
            </div>
          ) : (
            <>
              {cart.length === 0 ? (
                <div className="py-8 text-center">
                  <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">购物车是空的</h3>
                  <p className="mt-2 text-gray-600">请添加一些商品到购物车</p>
                </div>
              ) : (
                <>
                  <div className="divide-y">
                    {cart.map(item => (
                      <div key={`${item.itemId}-${item.colorIndex}`} className="py-4 flex">
                        <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                        <div className="ml-4 flex-grow">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">{item.color}</p>
                          <p className="font-medium">RM {item.price.toFixed(2)}</p>
                        </div>
                        <div className="flex items-center">
                          <button 
                            onClick={() => updateCartItemQuantity(item.itemId, item.colorIndex, item.quantity - 1)}
                            className="px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="px-3 py-1 bg-gray-100">{item.quantity}</span>
                          <button 
                            onClick={() => updateCartItemQuantity(item.itemId, item.colorIndex, item.quantity + 1)}
                            className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
                          >
                            +
                          </button>
                          <button 
                            onClick={() => removeFromCart(item.itemId, item.colorIndex)}
                            className="ml-4 text-red-500 hover:text-red-700"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>总计:</span>
                      <span>RM {total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">客户信息</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">姓名</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={customerInfo.name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">邮箱</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={customerInfo.email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">电话</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={customerInfo.phone}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">地址</label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={customerInfo.address}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Payment Method Section */}
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">付款方式</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <input
                          id="tng"
                          name="paymentMethod"
                          type="radio"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          checked={customerInfo.paymentMethod === 'tng'}
                          onChange={() => setCustomerInfo(prev => ({
                            ...prev,
                            paymentMethod: 'tng'
                          }))}
                        />
                        <label htmlFor="tng" className="ml-3 block text-sm font-medium text-gray-700">
                          Touch 'n Go eWallet
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="bankTransfer"
                          name="paymentMethod"
                          type="radio"
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                          checked={customerInfo.paymentMethod === 'bankTransfer'}
                          onChange={() => setCustomerInfo(prev => ({
                            ...prev,
                            paymentMethod: 'bankTransfer'
                          }))}
                        />
                        <label htmlFor="bankTransfer" className="ml-3 block text-sm font-medium text-gray-700">
                          银行转账
                        </label>
                      </div>
                    </div>

                    {/* Payment Instructions */}
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">付款说明:</h4>
                      <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                        <li>下单前请完成付款</li>
                        <li>付款时请备注您的订单号或姓名</li>
                        <li>付款成功后，后台会核实付款信息</li>
                        <li>并在1-3个工作日内处理您的订单</li>
                        <li>发货后您将收到包含物流信息的通知</li>
                      </ul>
                    </div>

                    {/* TNG QR Code (shown when TNG is selected) */}
                    {customerInfo.paymentMethod === 'tng' && (
                      <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                        <p className="text-sm font-medium mb-2">请扫描以下TNG二维码付款:</p>
                        
                        <img 
                          src={TngQR} 
                          alt="TNG Payment QR Code" 
                          className="w-128 h-128 object-contain mx-auto"
                        />
                        <p className="text-sm mt-2 font-semibold">总金额: RM {total.toFixed(2)}</p>
                      </div>
                    )}

                    {/* Bank Transfer Info (shown when bank transfer is selected) */}
                    {customerInfo.paymentMethod === 'bankTransfer' && (
                      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <h4 className="font-medium text-sm mb-2">银行转账信息:</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>银行: CIMB BANK</p>
                          <p>账户名: TEE HUI XIN</p>
                          <p>账号: 7637324152</p>
                          <p className="mt-2">转账后请将付款凭证发送至我们的邮箱或WhatsApp</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                    >
                      提交订单
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartModal;