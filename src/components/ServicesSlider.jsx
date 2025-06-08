import React, { useState, useRef } from 'react';
import ServiceCard from './ServiceCard';
import { useNavigate } from 'react-router-dom';

const ServicesSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);
  const navigate = useNavigate();

  const services = [
    {
      title: "个性化旅游安排",
      description: "我们为每位客户提供量身定制的旅游方案，以满足您的特定需求和喜好。无论是潜水还是浮潜，我们都会为您安排最佳体验。",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      buttonText: "立即咨询",
      bgColor: "bg-white",
      onClick: () => window.location.href = '/trips'
    },
    {
      title: "丰富的纪念品",
      description: "在Wavecation，我们提供各种精美的纪念品，如钥匙圈、手链、吊绳等，帮助您留住旅行的美好回忆。",
      image: "https://images.unsplash.com/photo-1698423955414-fee71b18e0b6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      buttonText: "浏览商品",
      bgColor: "bg-white",
      onClick: () => window.location.href = '/souvenirs'
    },
    {
      title: "潜水旅游团",
      description: "参加我们的潜水旅游团，探索世界各地的迷人景点，享受安全、便捷的旅行体验。",
      image: "https://images.unsplash.com/photo-1625542405819-b811c3416b5e?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Ds",
      buttonText: "查看行程",
      bgColor: "bg-white",
      onClick: () => {
        // 强制刷新并跳转到 diving-tours 区块
        window.location.href = '/trips#diving-tours';
        // 确保页面加载后执行滚动
        setTimeout(() => {
          const element = document.getElementById('diving-tours');
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
      }
    },
    {
      title: "海边/水下写真拍摄",
      description: "由认证潜水摄影师为您捕捉海底精彩瞬间，提供高清水下写真及视频拍摄，记录您的海洋探索之旅。",
      image: "/images/underwater_photograph.jpg",
      buttonText: "预约拍摄",
      bgColor: "bg-white",
      onClick: () => window.location.href = '/trips'
    }
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === services.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? services.length - 1 : prevIndex - 1
    );
  };

  return (
    <section 
      id="services" 
      className="relative overflow-hidden h-[600px] w-full py-12 scroll-mt-24"
    >
      <div className="h-full w-full grid grid-cols-1">
        <div 
          ref={sliderRef}
          className="h-full col-start-1 row-start-1 transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(${currentIndex * -100}%)` }}
        >
          <div className="h-full flex">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="w-full h-full flex-shrink-0"
              >
                <ServiceCard service={service} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {currentIndex > 0 && (
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-amber-50/80 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-125 transition-all duration-300"
          aria-label="上一张"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {currentIndex < services.length - 1 && (
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-amber-50/80 rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:scale-125 transition-all duration-300"
          aria-label="下一张"
        >
          <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {services.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-gray-800 scale-125' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default ServicesSlider;