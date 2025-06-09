import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './i18n'; 

const container = document.getElementById('root');

// 创建根并渲染应用
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);