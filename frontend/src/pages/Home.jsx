import React, { useEffect } from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ServicesSlider from '../components/ServicesSlider';
import ImageGallery from '../components/ImageGallery';
import QuoteSection from '../components/QuoteSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // 处理滚动到指定位置
  const scrollToTarget = (targetId) => {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      const offset = 80; // 导航栏高度 + 额外间距
      const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
      
      // 添加高亮效果
      targetElement.classList.add('highlight-target');
      setTimeout(() => {
        targetElement.classList.remove('highlight-target');
      }, 1500);
    }
  };

  // 处理从其他页面跳转过来时的滚动
  useEffect(() => {
    // 检查URL中的hash（直接访问带hash的URL情况）
    if (location.hash) {
      setTimeout(() => {
        scrollToTarget(location.hash);
      }, 100);
    }
    
    // 检查导航状态中的scrollTo（从其他页面点击联系人链接情况）
    if (location.state?.scrollTo) {
      setTimeout(() => {
        scrollToTarget(location.state.scrollTo);
        // 清除状态，避免重复滚动
        navigate(location.pathname, { replace: true, state: {} });
      }, 100);
    }
  }, [location, navigate]);

  // 设置点击事件监听器
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const targetId = e.currentTarget.getAttribute('href');
      
      // 处理锚点链接（如联系人链接）
      if (targetId?.startsWith('#')) {
        e.preventDefault();
        
        if (location.pathname === '/') {
          // 当前在首页，直接滚动
          scrollToTarget(targetId);
        } else {
          // 不在首页，导航到首页并传递滚动目标
          navigate('/', { state: { scrollTo: targetId } });
        }
      }
      
      // 处理首页链接（强制刷新）
      if (e.currentTarget.classList.contains('home-link')) {
        e.preventDefault();
        window.location.href = '/';
      }
    };

    // 为所有锚点链接添加监听
    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => {
      anchor.addEventListener('click', handleAnchorClick);
    });

    // 为所有首页链接添加监听
    const homeLinks = document.querySelectorAll('.home-link');
    homeLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    return () => {
      anchors.forEach(anchor => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
      homeLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
    };
  }, [location, navigate]);

  return (
    <div className="m-0 p-0">
      <Header />
      <main className="pt-16">
        <HeroSection />
        <ServicesSlider />
        <ImageGallery />
        <QuoteSection />
        <ContactSection id="contact" /> {/* 确保联系人部分有id="contact" */}
      </main>
      <Footer />
    </div>
  );
};

export default Home;