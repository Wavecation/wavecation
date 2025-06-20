import React from 'react';
import TngQR from '../images/Tng_QR.jpg';
import { useTranslation } from 'react-i18next';

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
  const { t, i18n } = useTranslation();
  if (!isOpen) return null;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Calculate shipping fee based on region and order total
  const shippingFee = total >= 200 ? 0 : (customerInfo.region === 'east' ? 20 : 10);
  const grandTotal = total + shippingFee; 

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center border-b pb-4">
            <h2 className="text-2xl font-bold">{t('cart.title')}</h2>
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
              <h3 className="mt-4 text-xl font-medium text-gray-900">{t('cart.orderSuccess1')}</h3>
              <p className="mt-2 text-gray-600">
                {t('cart.orderSuccess2')}
              </p>
            </div>
          ) : (
            <>
              {cart.length === 0 ? (
                <div className="py-8 text-center">
                  <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">{t('cart.emptyCart')}</h3>
                  <p className="mt-2 text-gray-600">{t('cart.addItemsPrompt')}</p>
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
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>{t('cart.subtotal')}:</span>
                        <span>RM {total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>
                          {t('cart.shippingFee')} {total >= 200 ? (
                            <span className="text-green-600">({t('cart.freeShippingPromo')})</span>
                          ) : customerInfo.region ? (
                            `(${customerInfo.region === 'east' ? t('cart.eastMalaysia') : t('cart.westMalaysia')})`
                          ) : ''}:
                        </span> 
                        <span>
                          {total >= 200 ? (
                            <span className="text-green-600">RM 0.00</span>
                          ) : (
                            `RM ${shippingFee.toFixed(2)}`
                          )}
                        </span>
                      </div>
                      {total >= 200 && (
                        <div className="text-sm text-green-600">
                          {t('cart.freeShippingMessage')}
                        </div>
                      )}
                      <div className="flex justify-between text-lg font-bold">
                        <span>{t('cart.grandTotal')}:</span>
                        <span>RM {grandTotal.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h3 className="text-lg font-medium mb-4">{t('cart.customerInfo')}</h3>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">{t('cart.name')}</label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={customerInfo.name}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder={t('contact.ans1')}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">{t('cart.email')}</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={customerInfo.email}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder={t('contact.ans2')}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">{t('cart.phone')}</label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={customerInfo.phone}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          placeholder={t('trips.phone_eg')}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="region" className="block text-sm font-medium text-gray-700">{t('cart.shippingFee')}</label>
                        <select
                          id="region"
                          name="region"
                          value={customerInfo.region}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                          required
                          disabled={total >= 200}
                        >
                          <option value="">{t('cart.selectRegion')}</option>
                          <option value="west">{t('cart.westMalaysia')} (RM10)</option>
                          <option value="east">{t('cart.eastMalaysia')} (RM20)</option>
                        </select>
                        {total >= 200 && (
                          <p className="mt-1 text-sm text-gray-500"> {t('cart.noRegionSelectionNeeded')}</p>
                        )}
                      </div>
                      <div className="sm:col-span-2">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">{t('cart.address')}</label>
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
                    <h3 className="text-lg font-medium mb-4">{t('cart.paymentMethod')}</h3>
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
                          {t('cart.bankTransfer')}
                        </label>
                      </div>
                    </div>

                    {/* Payment Instructions */}
                    <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                      <h4 className="font-medium text-sm mb-2">{t('cart.paymentInstructions')}:</h4>
                      <ul className="text-sm text-gray-600 list-disc pl-5 space-y-1">
                        <li>{t('cart.paymentInstruction1')}</li>
                        <li>{t('cart.paymentInstruction2')}</li>
                        <li>{t('cart.paymentInstruction3')}</li>
                        <li>{t('cart.paymentInstruction4')}</li>
                        <li>{t('cart.paymentInstruction5')}</li>
                        {total >= 200 && (
                          <li className="text-green-600 font-medium">{t('cart.paymentInstruction6')}</li>
                        )}
                      </ul>
                    </div>

                    {/* TNG QR Code (shown when TNG is selected) */}
                    {customerInfo.paymentMethod === 'tng' && (
                      <div className="mt-4 p-4 bg-gray-100 rounded-lg text-center">
                        <p className="text-sm font-medium mb-2">{t('cart.scanTNGQR')}:</p>
                        <img 
                          src={TngQR} 
                          alt="TNG Payment QR Code" 
                          className="w-48 h-48 object-contain mx-auto"
                        />
                        <p className="text-sm mt-2 font-semibold">{t('cart.totalAmount')}: RM {grandTotal.toFixed(2)}</p>
                        {total >= 200 && (
                          <p className="text-sm text-green-600 mt-1">{t('cart.includesFreeShipping')}</p>
                        )}
                      </div>
                    )}

                    {/* Bank Transfer Info (shown when bank transfer is selected) */}
                    {customerInfo.paymentMethod === 'bankTransfer' && (
                      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <h4 className="font-medium text-sm mb-2">{t('cart.bankTransferInfo')}:</h4>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{t('cart.bank')}: CIMB BANK</p>
                          <p>{t('cart.accountName')}: TEE HUI XIN</p>
                          <p>{t('cart.accountNumber')}: 7637324152</p>
                          <p className="mt-2">{t('cart.sendPaymentProof')}</p>
                          {total >= 200 && (
                            <p className="text-green-600 font-medium mt-1">{t('cart.paymentInstruction6')}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-6">
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors font-medium"
                    >
                      {t('cart.checkout')} (RM {grandTotal.toFixed(2)})
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