import React from 'react';
import logo from '../images/logo_trans.png';

const Header = () => {
  const handleContactClick = () => {
    // 强制刷新到首页的contact部分
    window.location.href = '/#contact';
  };

  // 统一处理所有需要强制刷新的导航
  const handleForceRefresh = (path) => (e) => {
    e.preventDefault();
    window.location.href = path;
  };

  return (
    <header className="flex items-center justify-between px-12 py-1 bg-white shadow-md fixed w-full z-50">
      <div className="flex items-center space-x-4">
        {/* Logo部分 */}
        <div className="logo-wrapper">
          <a 
            href="/" 
            className="logo-no-hover"
            onClick={handleForceRefresh('/')}
          >
            <img 
              src={logo} 
              alt="Logo" 
              className="w-14 h-14" 
            />
          </a>
        </div>
        <span className="text-2xl font-bold font-michroma">Wavecation</span>
      </div>
      <nav>
        <ul className="flex space-x-8 text-gray-700 font-medium font-poppins">
          {/* 首页链接 */}
          <li>
            <a 
              href="/" 
              className="home-link"
              onClick={handleForceRefresh('/')}
            >
              首页
            </a>
          </li>
          {/* 旅游配套链接 */}
          <li>
            <a 
              href="/Trips" 
              className="header-link"
              onClick={handleForceRefresh('/Trips')}
            >
              旅游配套
            </a>
          </li>
          {/* 纪念品链接 */}
          <li>
            <a 
              href="/souvenirs" 
              className="header-link"
              onClick={handleForceRefresh('/souvenirs')}
            >
              纪念品
            </a>
          </li>
          {/* 关于我们链接 */}
          <li>
            <a 
              href="/about" 
              className="header-link"
              onClick={handleForceRefresh('/about')}
            >
              关于我们
            </a>
          </li>
          {/* 联系方式链接 */}
          <li>
            <a 
              href="#contact" 
              className="header-link"
              onClick={handleContactClick}
            >
              联系方式
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;