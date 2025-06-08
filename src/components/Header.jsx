import React, { useState } from 'react';
import logo from '../images/logo_trans.png';
import { FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleContactClick = () => {
    window.location.href = '/#contact';
  };

  const handleForceRefresh = (path) => (e) => {
    e.preventDefault();
    window.location.href = path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-12 py-1 bg-white shadow-md fixed w-full z-50">
      {/* Logo和品牌名称 */}
      <div className="flex items-center space-x-4">
        <div className="logo-wrapper group">
          <a 
            href="/" 
            className="logo-no-hover"
            onClick={handleForceRefresh('/')}
          >
            <img 
              src={logo} 
              alt="Logo" 
              className="w-14 h-14 transition-transform duration-300 group-hover:scale-110" 
            />
          </a>
        </div>
        <span className="text-2xl font-bold font-michroma hidden sm:block hover:text-blue-500 transition-colors duration-300">
          Wavecation
        </span>
      </div>

      {/* 桌面导航 - 大屏幕显示 */}
      <nav className="hidden md:block">
        <ul className="flex space-x-8 text-gray-700 font-medium font-poppins">
          <li>
            <a 
              href="/" 
              className="home-link px-2 py-1 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
              onClick={handleForceRefresh('/')}
            >
              首页
            </a>
          </li>
          <li>
            <a 
              href="/Trips" 
              className="header-link px-2 py-1 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
              onClick={handleForceRefresh('/Trips')}
            >
              旅游配套
            </a>
          </li>
          <li>
            <a 
              href="/souvenirs" 
              className="header-link px-2 py-1 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
              onClick={handleForceRefresh('/souvenirs')}
            >
              纪念品
            </a>
          </li>
          <li>
            <a 
              href="/about" 
              className="header-link px-2 py-1 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
              onClick={handleForceRefresh('/about')}
            >
              关于我们
            </a>
          </li>
          <li>
            <a 
              href="#contact" 
              className="header-link px-2 py-1 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
              onClick={handleContactClick}
            >
              联系方式
            </a>
          </li>
        </ul>
      </nav>

      {/* 移动端汉堡菜单按钮 */}
      <button 
        className="md:hidden text-gray-700 focus:outline-none p-2 rounded-full hover:bg-gray-100 transition-colors duration-300"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <FaTimes size={24} className="hover:text-red-500 transition-colors duration-300" />
        ) : (
          <FaBars size={24} className="hover:text-blue-500 transition-colors duration-300" />
        )}
      </button>

      {/* 移动端菜单 - 小屏幕显示 */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg py-4 px-6 animate-slideDown">
          <ul className="flex flex-col space-y-3 text-gray-700 font-medium font-poppins">
            <li>
              <a 
                href="/" 
                className="block py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                onClick={(e) => { handleForceRefresh('/')(e); toggleMenu(); }}
              >
                首页
              </a>
            </li>
            <li>
              <a 
                href="/Trips" 
                className="block py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                onClick={(e) => { handleForceRefresh('/Trips')(e); toggleMenu(); }}
              >
                旅游配套
              </a>
            </li>
            <li>
              <a 
                href="/souvenirs" 
                className="block py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                onClick={(e) => { handleForceRefresh('/souvenirs')(e); toggleMenu(); }}
              >
                纪念品
              </a>
            </li>
            <li>
              <a 
                href="/about" 
                className="block py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                onClick={(e) => { handleForceRefresh('/about')(e); toggleMenu(); }}
              >
                关于我们
              </a>
            </li>
            <li>
              <a 
                href="#contact" 
                className="block py-2 px-3 rounded-md hover:bg-blue-50 hover:text-blue-600 transition-all duration-300"
                onClick={(e) => { handleContactClick(e); toggleMenu(); }}
              >
                联系方式
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;