import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Trips = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formSectionRef = useRef(null);
  const toursSectionRef = useRef(null)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    startDate: '',
    endDate: '',
    activity: '',
    accommodation: '',
    transport: '',
    pickupLocation: '',
    boatTicket: 'yes',
    meal: 'yes',
    isMalaysian: 'yes'
  });

  useEffect(() => {
    const scrollToSection = () => {
      if (location.hash === '#custom-trip-form' && formSectionRef.current) {
        formSectionRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
      if (location.hash === '#diving-tours' && toursSectionRef.current) {
        toursSectionRef.current.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    // 延迟确保DOM加载完成
    const timer = setTimeout(scrollToSection, 100);
    return () => clearTimeout(timer);
  }, [location.hash]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 创建订单对象
    const newOrder = {
      id: Date.now(),
      date: new Date().toLocaleString(),
      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: formData.pickupLocation || '无接送地址'
      },
      tripDetails: {
        startDate: formData.startDate,
        endDate: formData.endDate,
        activity: formData.activity,
        accommodation: formData.accommodation,
        transport: formData.transport,
        boatTicket: formData.boatTicket,
        meal: formData.meal,
        isMalaysian: formData.isMalaysian
      },
      completed: false
    };

    // 获取现有订单或初始化空数组
    const existingOrders = JSON.parse(localStorage.getItem('tripOrders') || '[]');
    
    // 添加新订单
    const updatedOrders = [...existingOrders, newOrder];
    
    // 保存到 localStorage
    localStorage.setItem('tripOrders', JSON.stringify(updatedOrders));
    
    // 导航到确认页面，传递更详细的数据
    navigate('/confirmation', { 
      state: { 
        orderId: newOrder.id,
        customerName: formData.name,
        tripDates: `${formData.startDate} 至 ${formData.endDate}`,
        activity: formData.activity,
        accommodation: formData.accommodation
      } 
    });
  };


  return (
    <div 
      className="min-h-screen flex flex-col relative"
      style={{
        backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1664361480733-101e7db6e7da?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJpcHN8ZW58MHx8MHx8fDA%3D)',
        backgroundSize: 'cover',
      }}
    >
      <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm"></div>
      <div className="relative z-10">
        <Header />
        <main className="flex-grow max-w-6xl mx-auto px-4 pt-24 pb-12 w-full">
            <section
             ref={formSectionRef}
             id="custom-trip-form"
             className="scroll-mt-20"
            >
                <h1 className="text-4xl font-bold text-center mb-12 text-blue-800">
                    刁曼岛客制化行程
                </h1>
                
                <div 
                    className="bg-white bg-opacity-90 rounded-xl shadow-lg p-8 mb-16"
                    style={{
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5)',
                    backdropFilter: 'blur(5px)'
                    }}
                >
                    <form onSubmit={handleSubmit} className="space-y-6">
                    {/* 个人信息部分 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            姓名 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="请输入您的姓名"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        />
                        </div>

                        <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            联系电话 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="例如: +60 12-345 6789"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            电子邮箱 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="example@email.com"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        />
                        </div>
                    </div>

                    {/* 出行日期范围 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            出发日期 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            min={new Date().toISOString().split('T')[0]}
                            required
                        />
                        </div>

                        <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            返回日期 <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="endDate"
                            value={formData.endDate}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            min={formData.startDate || new Date().toISOString().split('T')[0]}
                            required
                        />
                        </div>
                    </div>

                    <div className="border-t border-gray-200 my-8"></div>

                    {/* 行程定制部分 */}
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                        行程定制选项
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            玩乐配套 <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="activity"
                            value={formData.activity}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        >
                            <option value="">请选择</option>
                            <option value="OW">开放水域潜水(OW)</option>
                            <option value="AOW">进阶开放水域(AOW)</option>
                            <option value="fundive">欢乐潜水(Fundive)</option>
                            <option value="snorkeling">浮潜</option>
                            <option value="photograph">海边/水下写真约拍</option>
                        </select>
                        </div>

                        <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            住宿 <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="accommodation"
                            value={formData.accommodation}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        >
                            <option value="">请选择</option>
                            <option value="single">单人房</option>
                            <option value="double">双人房</option>
                            <option value="triple">三人房</option>
                            <option value="quad">四人房</option>
                            <option value="dorm">六人拼房</option>
                        </select>
                        </div>
                    </div>

                    {/* 交通选项 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            往返码头交通 <span className="text-red-500">*</span>
                        </label>
                        <div className="flex space-x-4">
                            <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="transport"
                                value="yes"
                                checked={formData.transport === 'yes'}
                                onChange={handleChange}
                                className="h-5 w-5 text-blue-600"
                                required
                            />
                            <span className="ml-2">需要</span>
                            </label>
                            <label className="inline-flex items-center">
                            <input
                                type="radio"
                                name="transport"
                                value="no"
                                checked={formData.transport === 'no'}
                                onChange={handleChange}
                                className="h-5 w-5 text-blue-600"
                            />
                            <span className="ml-2">不需要</span>
                            </label>
                        </div>
                        </div>
                    </div>

                    {/* 接送点 - 动态显示 */}
                    {formData.transport === 'yes' && (
                        <div className="grid grid-cols-1 gap-6">
                        <div>
                            <label className="block text-lg font-medium text-gray-700 mb-2">
                            接送地址
                            </label>
                            <input
                            type="text"
                            name="pickupLocation"
                            value={formData.pickupLocation}
                            onChange={handleChange}
                            placeholder="请输入接送地址"
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            />
                        </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            船票 <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="boatTicket"
                            value={formData.boatTicket}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        >
                            <option value="yes">需要</option>
                            <option value="no">不需要</option>
                        </select>
                        </div>

                        <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            包餐 <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="meal"
                            value={formData.meal}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        >
                            <option value="yes">需要</option>
                            <option value="no">不需要</option>
                        </select>
                        </div>

                        <div>
                        <label className="block text-lg font-medium text-gray-700 mb-2">
                            马来西亚公民 <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="isMalaysian"
                            value={formData.isMalaysian}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-lg"
                            required
                        >
                            <option value="yes">是</option>
                            <option value="no">否</option>
                        </select>
                        </div>
                    </div>

                    <div className="pt-6">
                        <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300"
                        >
                        提交预订请求
                        </button>
                    </div>
                    </form>
                </div>
            </section>

            <section
             ref={toursSectionRef}
             id="diving-tours"
             className="scroll-mt-20"
            >
                {/* Coming Soon 潜水旅游团 */}
                <div 
                    className="relative bg-gradient-to-r from-blue-900 to-blue-600 rounded-xl overflow-hidden mb-16"
                    style={{
                    border: '1px solid rgba(255, 255, 255, 0.5)',
                    boxShadow: '0 0 15px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5)'
                    }}
                >
                    <div className="absolute inset-0 bg-black opacity-30"></div>
                    <div className="relative z-10 p-12 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        潜水旅游团即将开放
                    </h2>
                    <p className="text-xl text-blue-100 mb-8">
                        我们正在筹备更多精彩的潜水旅游团，包括科莫多、马布岛等世界级潜点
                    </p>
                    
                    <div className="flex justify-center">
                        <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full px-8 py-4 inline-flex items-center">
                        <svg className="animate-pulse h-8 w-8 text-yellow-300 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-white text-xl font-semibold">即将推出</span>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Trips;