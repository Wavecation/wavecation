import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t, i18n } = useTranslation();

  return (
    <div className="m-0 p-0">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-96 bg-blue-900 flex items-center justify-center text-white overflow-hidden">
          {/* 背景层 */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1499540633125-484965b60031?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
            }}
          ></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: "'Michroma', sans-serif" }}>
              {t('about.heroTitle')}
            </h1>
            <p className="text-xl max-w-2xl mx-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
              {t('about.heroDesc')}
            </p>
          </div>
        </section>

        {/* Freedom Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Michroma', sans-serif" }}>
                  {t('about.freedomTitle')}
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                  {t('about.freedomP1')}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                  {t('about.freedomP2')}
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  {t('about.photoCredit')}: <a href="https://images.unsplash.com/photo-1489914169085-9b54fdd8f2a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="underline">Jakob Owens</a> on Unsplash
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1489914169085-9b54fdd8f2a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt={t('about.freedomTitle')} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Deep Travel Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-last md:order-first rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1496950866446-3253e1470e8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt={t('about.deepTitle')} 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Michroma', sans-serif" }}>
                  {t('about.deepTitle')}
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                  {t('about.deepP1')}
                </p>
                <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                  {t('about.deepP2')}
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  {t('about.photoCredit')}: <a href="https://images.unsplash.com/photo-1496950866446-3253e1470e8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" target="_blank" rel="noopener noreferrer" className="underline">ian dooley</a> on Unsplash
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ocean Conservation Section */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Michroma', sans-serif" }}>
                  {t('about.oceanTitle')}
                </h2>
                <p className="text-lg mb-6 leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                  {t('about.oceanP1')}
                </p>
                <p className="text-lg mb-6 leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                  {t('about.oceanP2')}
                </p> 
                <p className="text-lg leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                  {t('about.oceanP3')}
                </p>  
                <p className="text-sm text-blue-200 mt-4">
                  {t('about.photoCredit')}: <a href="https://images.unsplash.com/photo-1674467262285-70f999856c48?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="underline">Anna Ansone</a> on Unsplash
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1674467262285-70f999856c48?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt={t('about.oceanTitle')} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-8" style={{ fontFamily: "'Michroma', sans-serif" }}>
              {t('about.ctaTitle')}
            </h2>
            <p className="text-xl text-gray-700 mb-8" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
              {t('about.ctaDesc')}
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;