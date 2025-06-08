import React from 'react';

const ImageGallery = () => {
  // 10张示例图片URL
  const images = [
    '/images/1-1f970502.jpg',
    '/images/1-18290e18.jpg',
    '/images/GPTempDownload(1).jpg',
    '/images/GPTempDownload(2).jpg',
    '/images/4-1f970502.jpg',
    '/images/2-1f970502.jpg',
    '/images/2-18290e18.jpg',
    '/images/4-18290e18.jpg',
    '/images/3-1f970502.jpg',
    '/images/GPTempDownload.jpg'
  ];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-700">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-8">精彩瞬间</h2>
        
        {/* 第一排图片 */}
        <div className="flex flex-wrap justify-center gap-0 mb-4">
          {images.slice(0, 5).map((image, index) => (
            <div key={`top-${index}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2">
              <div className="aspect-square overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={image}
                  alt={`展示图片 ${index + 1}`}
                  className="w-full h-full object-cover hover:rounded-xl transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* 第二排图片 */}
        <div className="flex flex-wrap justify-center gap-0 mt-4">
          {images.slice(5, 10).map((image, index) => (
            <div key={`bottom-${index}`} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2">
              <div className="aspect-square overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <img
                  src={image}
                  alt={`展示图片 ${index + 6}`}
                  className="w-full h-full object-cover hover:rounded-xl transition-all duration-300"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImageGallery;