import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n'; // 确保i18n配置已正确设置

// 获取根元素
const container = document.getElementById('root');

// 创建根并渲染应用
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);