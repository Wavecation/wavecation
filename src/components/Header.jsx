import React, { useState } from 'react';
import logo from '../images/logo_trans.png';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageOpen(false);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguage = () => setIsLanguageOpen(!isLanguageOpen);

  // 处理普通导航（强制刷新）
  const handleNavigation = (path) => {
    window.location.href = path; // 使用window.location.href强制刷新
  };

  // 特殊处理"联系我们"按钮
  const handleContactClick = () => {
    if (window.location.pathname !== '/') {
      // 如果不在首页，导航到首页并添加hash
      window.location.href = '/#contact';
    } else {
      // 如果在首页，滚动到联系部分
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  const navItems = [
    { path: '/', key: 'header.button1', onClick: () => handleNavigation('/') },
    { path: '/Trips', key: 'header.button2', onClick: () => handleNavigation('/Trips') },
    { path: '/souvenirs', key: 'header.button3', onClick: () => handleNavigation('/souvenirs') },
    { path: '/about', key: 'header.button4', onClick: () => handleNavigation('/about') },
    { key: 'header.button5', onClick: handleContactClick }
  ];

  return (
    <header className="flex items-center justify-between px-4 md:px-12 py-1 bg-white shadow-md fixed w-full z-50">
      {/* Logo和品牌名称 */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="logo-no-hover">
          <img src={logo} alt="Logo" className="w-14 h-14" />
        </Link>
        <span className="text-2xl font-bold font-michroma">Wavecation</span>
      </div>

      {/* 桌面导航和语言切换器 */}
      <div className="flex items-center space-x-4">
        <nav className="hidden md:block mr-2">
          <ul className="flex space-x-6 text-gray-700 font-medium font-poppins">
            {navItems.map((item) => (
              <li key={item.path || item.key}>
                <button
                  onClick={item.onClick}
                  className="header-link cursor-pointer"
                >
                  {t(item.key)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* 桌面语言切换器 */}
        <div className="relative hidden md:block">
          <button 
            onClick={toggleLanguage}
            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors"
            aria-label="Change language"
          >
            <FaGlobe className="text-lg" />
            <span className="text-sm">{i18n.language === 'en' ? 'EN' : '中文'}</span>
          </button>
          
          {isLanguageOpen && (
            <div className="absolute right-0 mt-2 w-24 bg-white rounded-md shadow-lg py-1 z-30">
              <button
                onClick={() => changeLanguage('en')}
                className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === 'en' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage('zh')}
                className={`block w-full text-left px-4 py-2 text-sm ${i18n.language === 'zh' ? 'bg-blue-100 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                中文
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 移动端菜单按钮和语言切换器 */}
      <div className="flex items-center md:hidden space-x-3">
        <button 
          onClick={() => changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}
          className="text-gray-700 px-2 py-1 rounded-md border border-gray-300 text-sm"
        >
          {i18n.language === 'en' ? '中文' : 'EN'}
        </button>

        <button 
          className="text-gray-700 focus:outline-none p-2 rounded-full hover:bg-gray-100"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg py-4 px-6">
          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <li key={item.path || item.key}>
                <button
                  onClick={item.onClick}
                  className="block py-2 w-full text-left"
                >
                  {t(item.key)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;