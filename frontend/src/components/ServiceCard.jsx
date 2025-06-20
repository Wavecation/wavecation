import React, { useState } from 'react';

const ServiceCard = ({ service }) => {
    const [isHovered, setIsHovered] = useState(false);
                   
  return (
    <div className={`w-full h-full ${service.bgColor} flex items-center justify-center`}>
      <div className="w-full max-w-7xl mx-auto px-4 flex flex-col lg:flex-row items-center justify-center gap-12">
        <div className="lg:w-1/2 w-full text-center lg:text-left px-4 items-center justify-center">
          <h3 className="font-serif font-extrabold text-center text-2xl md:text-3xl mb-6">
            {service.title}
          </h3>
          <p className="font-serif text-lg text-center leading-relaxed mb-8 max-w-2xl">
            {service.description}
          </p>
          <div className="flex justify-center mt-6">
            <button
            onClick={service.onClick}
            className="bg-gray-800 hover:bg-black text-white font-bold py-3 px-6 rounded border border-gray-400 transition duration-300 text-center inline-block"
          > 
            {service.buttonText}
          </button>

          </div>
          
        </div>
        
        <div 
          className="lg:w-1/2 w-full max-w-2xl flex items-center justify-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="relative aspect-video w-full rounded-xl shadow-2xl overflow-hidden">
            <img 
              src={service.image} 
              alt={service.title} 
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`} 
            />
            {/* 图片容器也添加hover缩放效果 */}
            <div className={`absolute inset-0 transition-all duration-700 ${
              isHovered ? 'scale-[1.03]' : 'scale-100'
            }`}>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;