import React, { useState } from 'react';
import axios from 'axios';

const SouvenirForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    stock: '',
  });

  const [status, setStatus] = useState('');

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/souvenirs', {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock),
      });
      console.log('✅ 成功新增:', res.data);
      setStatus('✅ 商品新增成功！');
      setFormData({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        stock: '',
      });
    } catch (err) {
      console.error('❌ 新增失败:', err);
      setStatus('❌ 新增失败，请检查后端或网络连线');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 border rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">新增纪念品</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="商品名称"
          value={formData.name}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="商品描述"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="价格"
          value={formData.price}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="图片链接"
          value={formData.imageUrl}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="stock"
          placeholder="库存数量"
          value={formData.stock}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          新增商品
        </button>
      </form>
      {status && <p className="mt-4">{status}</p>}
    </div>
  );
};

export default SouvenirForm;
