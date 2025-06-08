import React, { useState } from 'react';
import { SlSocialInstagram } from "react-icons/sl";
import {  FaWhatsapp } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { FiArrowDown } from "react-icons/fi"; 
import { RiBook2Line } from "react-icons/ri";;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const contactMethods = [
    {
      name: 'Instagram',
      icon: <SlSocialInstagram className="text-2xl" />,
      url: 'https://www.instagram.com/wavecation_',
      color: 'bg-pink-100 text-pink-600 hover:bg-pink-200'
    },
    {
      name: 'WhatsApp',
      icon: <FaWhatsapp className="text-2xl" />,
      url: 'https://wa.me/60169423719',
      color: 'bg-green-100 text-green-600 hover:bg-green-200'
    },
    {
      name: 'Email',
      icon: <IoIosMail className="text-3xl" />,
      url: 'mailto:wavecation07@email.com',
      color: 'bg-blue-100 text-blue-600 hover:bg-blue-200'
    },
    {
      name: '小红书',
      icon: <RiBook2Line className="text-2xl" />,
      url: 'https://www.xiaohongshu.com/user/profile/wavecation',
      color: 'bg-red-100 text-red-600 hover:bg-red-200'
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch('/api/save-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-12 bg-cyan-900">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-white text-3xl font-bold text-center mb-8">联络我们</h2>

        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          {/* 左侧联络方式容器 */}
          <div className="lg:w-1/3 flex flex-col">
            <div className="flex justify-center items-center mb-4">
              <FiArrowDown className="text-xl text-white mr-2" />
              <span className="text-white font-medium">点击下方按钮获取联系方式</span>
              <FiArrowDown className="text-xl text-white ml-2" />
            </div>
            
            <div className="grid grid-cols-2 gap-4 flex-grow">
              {contactMethods.map((method, index) => (
                <a
                  key={index}
                  href={method.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex flex-col items-center justify-center p-4 rounded-lg shadow-sm transition-all duration-300 ${method.color} hover:shadow-md h-full`}
                >
                  <span className={`p-3 rounded-full ${method.color.split(' ')[0]} flex items-center justify-center mb-2`}>
                    <span className="text-2xl">
                      {method.icon}
                    </span>
                  </span>
                  <span className="text-sm font-medium">{method.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* 右侧联系表单 */}
          <div className="lg:w-2/3 bg-white p-6 rounded-lg shadow-md flex flex-col">
            <h3 className="text-xl font-bold mb-4">给我们留言</h3>
            <form onSubmit={handleSubmit} className="min-h-[300px] space-y-4 flex-grow flex flex-col">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  姓名
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入您的姓名"
                  required
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  电子邮箱
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入您的电子邮箱"
                  required
                />
              </div>

              <div className="flex-grow">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  留言内容
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full h-[120px] px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="请输入您的留言内容"
                  required
                ></textarea>
              </div>
              
              {submitStatus === 'success' && (
                <div className="p-3 bg-green-100 text-green-700 rounded-md">
                  留言已成功提交！感谢您的反馈。
                </div>
              )}
              {submitStatus === 'error' && (
                <div className="p-3 bg-red-100 text-red-700 rounded-md">
                  提交失败，请稍后再试或通过其他方式联系我们。
                </div>
              )}
              
              <div className="mt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors duration-300 mt-auto ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? '提交中...' : '提交留言'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;