import React from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';  // 添加这行
import Footer from '../components/Footer';  // 添加这行

const Confirmation = () => {
  const location = useLocation();
  const { state } = location;
  
  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">未找到订单信息</h1>
          <p>请返回重新提交您的预订请求</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow max-w-6xl mx-auto px-4 pt-24 pb-12 w-full">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h1 className="text-3xl font-bold text-center mb-8 text-green-600">
            预订成功!
          </h1>
          
          <div className="space-y-4 max-w-md mx-auto">
            <div className="border-b pb-4">
              <h2 className="text-xl font-semibold mb-2">预订详情</h2>
              <p><strong>订单号:</strong> {state.orderId}</p>
              <p><strong>客户姓名:</strong> {state.customerName}</p>
              <p><strong>行程日期:</strong> {state.tripDates}</p>
              <p><strong>活动类型:</strong> {state.activity}</p>
              <p><strong>住宿类型:</strong> {state.accommodation}</p>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg w-">
              <p>我们的团队将在24小时内与您联系确认详情。</p>
              <p className="mt-2">如有任何疑问，请随时联系我们。</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Confirmation;