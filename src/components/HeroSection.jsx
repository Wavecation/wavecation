import React from 'react';
import { useTranslation } from 'react-i18next';

const HeroSection = () => {
  const { t, i18n } = useTranslation(); // 正确解构 t 和 i18n

  // 定义 changeLanguage 函数
  const changeLanguage = async (lng) => {
    try {
      await i18n.changeLanguage(lng);
      console.log('Language changed to:', lng);
    } catch (err) {
      console.error('Failed to change language:', err);
    }
  };

  return (
    <section 
      className="h-[100vh] bg-cover bg-center bg-fixed flex flex-col items-center justify-center text-white text-center relative"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      
      <div className="z-10">
        <p className="font-poppins text-white text-lg font-medium">
          {t('hero.subtitle')}
        </p>
        <h2 className="font-poppins text-3xl font-medium my-5 leading-loose">
          {t('hero.title')}
        </h2>
        <a
          href="#services"
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded border border-gray-400 transition"
        >
          {t('hero.button')}
        </a>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>

    </section>
  );
};

export default HeroSection;