import React from 'react';
import { useTranslation } from 'react-i18next';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Sparkles, AlertTriangle } from 'lucide-react'; // optional icon
import { motion } from 'framer-motion';
import { FiArrowDown } from "react-icons/fi"; 

const Bubble = () => {
  const size = 15 + Math.random() * 50; // 15-65px大小
  const duration = 12 + Math.random() * 20; // 12-32秒完成动画
  const delay = Math.random() * 10; // 0-10秒延迟

  return (
    <motion.div
      className="absolute rounded-full bg-blue-200 opacity-20 will-change-transform"
      style={{  
        left: `${Math.random() * 100}%`,
        bottom: '-50px',
        width: `${size}px`,
        height: `${size}px`,
        filter: 'blur(1px)'
      }}
      initial={{ y: 0, opacity: 0.2, scale: 1 }}
      animate={{ 
        y: '-120vh', 
        opacity: 0, 
        scale: 0.7,
        x: `${Math.random() * 20 - 10}px` // 添加轻微水平晃动
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

const DivingTours = () => {
  const { t } = useTranslation();

  const includes = t('tours.includesList', { returnObjects: true });
  const excludes = t('tours.excludesList', { returnObjects: true });

  const tours = [
    {
      id: 1,
      title: t('tours.bali.title'),
      date: '21-26 Nov 2025',
      locations: ['Amed', 'Nusa Penida', 'Nusa Lembongan'],
      accommodations: [
        { name: 'The Griya Villas & Spa', location: 'Amed', nights: 3, rating: 4.5 },
        { name: 'Penida Bambu Green', location: 'Nusa Penida', nights: 2, rating: 4.2 },
        { name: 'Lembongan Beach Club', location: 'Nusa Lembongan', nights: 1, rating: 4.3 }
      ],
      dives: {
        total: 12,
        boat: 5,
        shore: 6,
        night: 1
      },
      includes: [
        t('tours.includesHotel'),
        t('tours.includesEquipment'),
        t('tours.includesLunch'),
        t('tours.includesTshirt')
      ],
      requirements: t('tours.requirementsAow'),
      noCertOption: t('tours.noCertOption'),
      price: {
        earlyBird: 2399,
        normal: 2599,
        earlyBirdUntil: '1 Aug 2025'
      },
      excludes: [
        t('tours.excludesFlights'),
        t('tours.excludesInsurance'),
        t('tours.excludesTransport'),
        t('tours.excludesLandTours'),
        t('tours.excludesExpenses')
      ],
      contact: t('tours.contact')
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-gray-50">
      <Header />
      
      <main className="flex-grow h-[80vh]">
        {/* Hero Section */}
        <section 
          className="h-[100vh] bg-cover bg-center bg-fixed flex flex-col items-center justify-center text-white relative"
          style={{ 
            backgroundImage: "url('https://media.istockphoto.com/id/179680401/photo/underwater-photograph-of-a-manta-ray-and-shoal-of-fish.webp?a=1&b=1&s=612x612&w=0&k=20&c=W3x1EBO7QVm9VKWhu5sQ0vE1xE3zEQg8sB-qzwU--MU=')",
            backgroundColor: '#0a1a2f' // fallback dark blue
          }}
        >
          {/* Dark overlay with blue tint instead of pure black */}
          <div className="absolute inset-0 bg-blue-900/60"></div>
          
          <div className="z-10 px-4 w-full max-w-4xl">
            {/* English Title - Bold and modern */}
              <div className="z-10 w-full max-w-4xl text-left space-y-8"> {/* Increased spacing container */}
                {/* Main Title */}
                <div className="ml-8 mb-2">
                  <p className="text-white font-extrabold text-2xl md:text-3xl ">
                    21/11 - 26/11
                  </p>
                </div>

                <h1 className="font-bold text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-blue-100">
                    {t('tours.bali.title')}
                  </span>
                </h1>
                
                {/* Locations - with increased spacing */}
                <p className="font-medium text-xl md:text-2xl text-blue-100/90 tracking-wider mt-8"> {/* mt-8 for larger gap */}
                  {t('tours.locations')}
                </p>

                {/* Dive Package - Modified gradient */}
                <div className="flex items-end justify-between">
                  <div className="relative">
                  <h2 className="font-bold text-4xl md:text-5xl lg:text-6xl leading-tight">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-300">
                      {t('tours.divePackage')}
                    </span>
                  </h2>
                  <div className="absolute -bottom-3 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent w-full"></div>
                  </div> 
                  
                </div>
              </div>
                        
            {/* Call-to-action button (optional) */}
            <button 
              onClick={() => {
                const section = document.getElementById('toursInfo');
                if (section) {
                  section.scrollIntoView({ behavior: 'smooth' }); // 平滑滚动
                }
              }}
              className="mt-12 px-8 py-3 bg-transparent border-2 border-cyan-300 text-cyan-300 rounded-full text-lg font-semibold hover:bg-cyan-300 hover:text-blue-900 transition-all duration-300">
              {t('tours.button')}
            </button>
          </div>

          {/* Watermark/small text at bottom */}
          <div className="absolute bottom-8 left-0 right-0 text-center">
            <p className="text-blue-200 text-sm font-light tracking-widest">
              UNFORGETTABLE WAVECATION
            </p>
          </div>
        </section>

        <section id='toursInfo'
        className="relative bg-gradient-to-r from-red-50 via-white to-yellow-50 py-12 px-6 md:px-20 overflow-hidden">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Left: Big Early Bird label */}
            <div className="md:w-1/2 flex items-center justify-start">
              <div className="border-4 border-red-600 bg-white px-6 py-4 text-red-600 font-extrabold text-4xl md:text-5xl rotate-[-2deg] shadow-md rounded-xl">
                {t('tours.earlyBird')}
              </div>
            </div>

            {/* Right: Pricing block */}
            <div className="md:w-1/2 bg-white rounded-xl shadow-xl p-6 text-right space-y-3 border-l-4 border-red-500">
              <p className="text-lg font-semibold text-gray-700 bg-yellow-100 px-2 py-1 inline-block rounded-md">
                {t('tours.normalPrice')}: <span className="line-through text-gray-500">RM2599</span>
              </p>

              <p className="text-4xl md:text-5xl font-extrabold text-red-600 tracking-tight">
                RM2399 <span className="inline-block align-middle text-3xl ml-2">❗❗</span>
              </p>

              <p className="text-sm text-gray-500 italic">{t('tours.validUntil')} 1/8/2025</p>
            </div>
          </div>

          {/* Optional: floating icon or sparkles */}
          <Sparkles className="absolute bottom-6 left-6 text-red-300 w-8 h-8 rotate-12 animate-pulse" />
          <AlertTriangle className="absolute top-6 right-8 text-yellow-400 w-10 h-10 animate-bounce" />
        </section>

        <section className="relative bg-white px-6 md:px-20 py-6">
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* 渐变背景 */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-cyan-800"></div>
            
            {/* 使用Framer Motion的气泡动画 */}
            <div className="absolute inset-0">
              {[...Array(30)].map((_, index) => (
                <Bubble key={`bubble-${index}`} index={index} />
              ))}
            </div>
            
            {/* 静态装饰气泡 */}
            <div className="absolute bottom-10 left-10 w-32 h-32 opacity-10">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle cx="50" cy="50" r="20" fill="#a5d8ff"/>
                <circle cx="120" cy="80" r="30" fill="#4dabf7"/>
              </svg>
            </div>
            
            {/* 波浪装饰 */}
            <div className="absolute bottom-0 w-full h-12 md:h-16 overflow-hidden">
              <svg viewBox="0 0 1200 120" className="w-full h-full text-blue-200">
                <path fill="currentColor" opacity="0.2" d="M0,0V46.3C47.4,35.2,146,20,300,20S552.6,35.2,600,46.3V0H0Z"/>
              </svg>
            </div>
          </div>
          
          <div className="max-w-6xl mx-auto relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
                <span className="text-green-500">✨</span> 配套详情 Package Details
              </h2>
            </div>

            <div className="relative flex flex-col md:flex-row gap-8">
              

              {/* 费用包含 */}
              <div className="md:w-1/2 relative z-10 bg-white rounded-2xl shadow-lg p-8 border-t-4 border-green-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-green-100 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{t('tours.includesTitle')}</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  {includes.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="flex-shrink-0 w-5 h-5 text-green-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 费用不含 */}
              <div className="md:w-1/2 relative z-10 bg-white rounded-2xl shadow-lg p-8 border-t-4 border-red-500 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-6">
                  <div className="bg-red-100 p-3 rounded-full mr-4">
                    <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">{t('tours.excludesTitle')}</h3>
                </div>
                <ul className="space-y-3 text-gray-700">
                  {excludes.map((item, index) => (
                    <li key={index} className="flex items-start">
                      <svg className="flex-shrink-0 w-5 h-5 text-red-500 mt-1 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* 特别提醒横幅 */}
          <div className="relative z-20 mt-12">
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 text-gray-700 text-center p-4 rounded-lg mx-auto max-w-3xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                </svg>
                <span>{t('tours.reminder')}</span>
              </div>
            </div>
          </div>
        </section>
        
        <section className="relative bg-white py-16 px-4 sm:px-6">
          <div className="max-w-full mx-auto">
            {/* 标题部分 */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
                <span className="text-blue-500">🏨</span> 度假村展示 Resort Showcase
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('tours.resort')}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    
              {/* 四宫格 - 使用Bird Resort不同区域照片 */}
              <div className="grid grid-cols-2 gap-2 aspect-square">
                {[
                  'birdRoom1',
                  'birdPool',
                  'birdRoom3',
                  'birdRoom4'
                ].map((imgName, index) => (
                  <div key={index} className="overflow-hidden shadow-md relative group">
                    <img
                      src={`/images/${imgName}.jpg`}
                      alt={`Resort ${['房间', '泳池边', '阳台', '泳池'][index]}`}
                      className="w-full h-full object-cover transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src="/images/placeholder-square.jpg"
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 aspect-square">
                {[
                  'birdPlay1',
                  'birdRestaurant1',
                  'birdPlay2',  
                  'birdGear'
                ].map((imgName, index) => (
                  <div key={index} className="overflow-hidden shadow-md relative group">
                    <img
                      src={`/images/${imgName}.jpg`}
                      alt={`Resort ${['娱乐区', '餐厅', '娱乐区', '潜水装备'][index]}`}
                      className="w-full h-full object-cover transition-transform duration-300"
                      loading="lazy"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src="/images/placeholder-square.jpg"
                      }}
                    />
                  </div>
                ))}
              </div>     
            </div>
          </div>
        </section>

        <section className="relative bg-white py-0 px-4 sm:px-6">
          <div className="max-w-full mx-auto">
            {/* 标题 */}
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-4">
                <span className="text-blue-500">🤿</span> 潜水点 Dive Sites
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {t('tours.diveSites')}
              </p>
            </div>

            {/* Ameh */}  
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-6">
                    {t('tours.amed')}
                  </h2>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                    {t('tours.amedP1')}
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                    {t('tours.amedP2')}
                  </p>
                </div>
                <div className=" overflow-hidden">
                  <img 
                    src="../images/amehSites.jpg" 
                    alt={t('tours.ameh')} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Tulamben */}  
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className=" overflow-hidden">
                  <img 
                    src="../images/tulambenSites.jpg" 
                    alt={t('tours.tulamben')} 
                    className="w-full h-auto object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-4xl font-bold mb-6">
                    {t('tours.tulamben')}
                  </h2>
                  <p className="text-lg text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                    {t('tours.tulambenP1')}
                  </p>
                  <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                    {t('tours.tulambenP2')}
                  </p>
                </div>
                
              </div>
            </div>  
          </div>
        </section>

        <section className="bg-blue-950 text-white py-16 px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t('tours.contactTitle')}
            </h2>

            <p className="text-lg mb-6">
              📌 {t('tours.requirementLabel')} 
              <span className="font-semibold text-cyan-300">{t('tours.requirements.aow', 'AOW 潜水证照')}</span>
            </p>

            <p className="text-lg mb-10">
              {t('tours.noCertOffer')}
            </p>

            <div className="flex justify-center items-center mb-6">
              <FiArrowDown className="text-xl text-white mr-2" />
              <span className="text-white font-medium">{t('tours.contact')}</span>
              <FiArrowDown className="text-xl text-white ml-2" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/60169423719" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full text-lg transition-all"
              >
                📲 {t('tours.contactZync')}
              </a>
              <a
                href="https://wa.me/60146112764" 
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-3 rounded-full text-lg transition-all"
              >
                📲 {t('tours.contactAmber')}
              </a>
            </div>
          </div>
        </section>


      </main>
      
      <Footer />
    </div>
  );
};

export default DivingTours;