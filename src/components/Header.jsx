import React, { useState, useRef, useEffect } from 'react';
import logo from '../images/logo_trans.png';
import { FaBars, FaTimes, FaGlobe } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [isTripsHovered, setIsTripsHovered] = useState(false);
  const dropdownRef = useRef(null);
  const hoverTimerRef = useRef(null);
  const navigate = useNavigate();
  const [isMobileTripsOpen, setIsMobileTripsOpen] = useState(false); // 仅用于移动端
  const [isDesktopTripsHovered, setIsDesktopTripsHovered] = useState(false); // 仅用于桌面端

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsLanguageOpen(false);
  };

  const handleNavClick = (path) => {
    navigate(path); // 使用 react-router 的导航
    setIsMenuOpen(false); // 关闭菜单
    setIsMobileTripsOpen(false); // 关闭下拉
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleLanguage = () => setIsLanguageOpen(!isLanguageOpen);

  // 处理普通导航（强制刷新）
  const handleNavigation = (path) => {
    window.location.href = path;
    setIsMenuOpen(false);
  };

  // 特殊处理"联系我们"按钮
  const handleContactClick = () => {
    if (window.location.pathname !== '/') {
      window.location.href = '/#contact';
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  // 鼠标进入下拉菜单区域
  const handleMouseEnter = () => {
    clearTimeout(hoverTimerRef.current);
    setIsTripsHovered(true);
  };

  // 鼠标离开下拉菜单区域
  const handleMouseLeave = () => {
    hoverTimerRef.current = setTimeout(() => {
      setIsTripsHovered(false);
    }, 300); // 300ms延迟关闭
  };

  // 点击文档其他地方关闭下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsTripsHovered(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      clearTimeout(hoverTimerRef.current);
    };
  }, []);

  const navItems = [
    { path: '/', key: 'header.button1', onClick: () => handleNavigation('/') },
    { 
      key: 'header.button2',
      isDropdown: true,
      dropdownItems: [
        { path: '/trips#custom-trip-form', key: 'header.customTrip' },
        { path: '/diving-tours', key: 'header.divingTours' }
      ]
    },
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
              <li 
                key={item.path || item.key} 
                className="relative"
                onMouseEnter={item.isDropdown ? handleMouseEnter : undefined}
                onMouseLeave={item.isDropdown ? handleMouseLeave : undefined}
                ref={item.isDropdown ? dropdownRef : null}
              >
                {item.isDropdown ? (
                  <div className="relative">
                    <button
                      onClick={() => {
                        if (!isTripsHovered) {
                          handleNavigation('/trips');
                        }
                      }}
                      className="header-link cursor-pointer transition-colors duration-200"
                    >
                      {t(item.key)}
                    </button>
                    
                    {isTripsHovered && (
                      <div 
                        className="absolute left-1/2 transform -translate-x-1/2 mt-1 w-40 bg-white rounded-md shadow-lg py-1 z-30 border border-gray-100"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        {item.dropdownItems.map((dropdownItem) => (
                          <Link
                            key={dropdownItem.path}
                            to={dropdownItem.path}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 text-center"
                            onClick={() => {
                              setIsMenuOpen(false);
                              setIsTripsHovered(false);
                            }}
                          >
                            {t(dropdownItem.key)}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={item.onClick}
                    className="header-link cursor-pointer transition-colors duration-200"
                  >
                    {t(item.key)}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </nav>

        {/* 桌面语言切换器 */}
        <div className="relative hidden md:block">
          <button 
            onClick={toggleLanguage}
            className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 transition-colors duration-200"
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
      <div className="flex items-center md:hidden space-x-4">
        {/* 语言切换按钮 */}
        <button 
          onClick={() => changeLanguage(i18n.language === 'en' ? 'zh' : 'en')}
          className="text-gray-700 px-2 py-1 rounded-md border border-gray-300 text-sm hover:bg-gray-100 transition-colors duration-200"
        >
          {i18n.language === 'en' ? '中文' : 'EN'}
        </button>

        {/* 汉堡菜单按钮 */}
        <button 
          className={`text-gray-700 focus:outline-none p-2 rounded-full transition-colors duration-200 ${
            isMenuOpen 
              ? 'hover:bg-gray-100 hover:text-red-600'
              : 'hover:bg-gray-100 hover:text-blue-600'
          }`}
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
                {item.isDropdown ? (
                  <div className="relative">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsMobileTripsOpen(!isMobileTripsOpen);
                      }}
                      className="flex justify-between items-center py-2 w-full text-left"
                    >
                      {t(item.key)}
                      
                    </button>

                    {isMobileTripsOpen && (
                      <div className="pl-4 mt-1">
                        {item.dropdownItems.map((dropdownItem) => (
                          <button
                            key={dropdownItem.path}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleNavClick(dropdownItem.path); // 使用统一跳转方法
                            }}
                            className="block py-2 text-gray-700 hover:text-blue-600 text-sm w-full text-left"
                          >
                            {t(dropdownItem.key)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavClick(item.path);
                    }}
                    className="block py-2 w-full text-left hover:text-blue-600"
                  >
                    {t(item.key)}
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;