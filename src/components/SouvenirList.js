import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SouvenirList = () => {
  const [souvenirs, setSouvenirs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
  });

  const fetchSouvenirs = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/souvenirs');
      setSouvenirs(res.data);
    } catch (err) {
      console.error('❌ 获取商品列表失败:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('确定要删除这件商品吗？')) return;
    try {
      await axios.delete(`http://localhost:5000/api/souvenirs/${id}`);
      setSouvenirs((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error('❌ 删除商品失败:', err);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditData({
      name: item.name,
      description: item.description,
      price: item.price,
      stock: item.stock,
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (id) => {
  try {
    // 数据验证
    if (!editData.name.trim() || isNaN(editData.price) || isNaN(editData.stock)) {
      alert('请填写有效的商品信息！');
      return;
    }

    const response = await axios.put(
      `http://localhost:5000/api/souvenirs/${id}`,
      {
        name: editData.name.trim(),
        description: editData.description.trim(),
        price: parseFloat(editData.price),
        stock: parseInt(editData.stock),
      }
    );
    
    console.log('更新成功:', response.data); // 调试用
    
    setEditingId(null);
    // 立即更新本地状态而不重新请求
    setSouvenirs(prev => prev.map(item => 
      item._id === id ? { ...item, ...response.data } : item
    ));
    
  } catch (err) {
    console.error('❌ 更新失败:', err.response?.data || err.message);
    alert(`更新失败: ${err.response?.data?.message || err.message}`);
  }
};

  useEffect(() => {
    fetchSouvenirs();
  }, []);

  if (loading) return <p className="text-center mt-8">加载中...</p>;

  return (
    <div className="max-w-6xl mx-auto mt-12">
      <h2 className="text-xl font-bold mb-4">已添加的纪念品</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">名称</th>
            <th className="p-2 border">描述</th>
            <th className="p-2 border">价格</th>
            <th className="p-2 border">库存</th>
            <th className="p-2 border">操作</th>
          </tr>
        </thead>
        <tbody>
          {souvenirs.map((item) => (
            <tr key={item._id} className="hover:bg-gray-50">
              {editingId === item._id ? (
                <>
                  <td className="p-2 border">
                    <input
                      type="text"
                      name="name"
                      value={editData.name}
                      onChange={handleEditChange}
                      className="w-full border rounded p-1"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="text"
                      name="description"
                      value={editData.description}
                      onChange={handleEditChange}
                      className="w-full border rounded p-1"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      name="price"
                      value={editData.price}
                      onChange={handleEditChange}
                      className="w-full border rounded p-1"
                    />
                  </td>
                  <td className="p-2 border">
                    <input
                      type="number"
                      name="stock"
                      value={editData.stock}
                      onChange={handleEditChange}
                      className="w-full border rounded p-1"
                    />
                  </td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleUpdate(item._id)}
                      className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600"
                    >
                      保存
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-400 text-white px-2 py-1 rounded hover:bg-gray-500"
                    >
                      取消
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td className="p-2 border">{item.name}</td>
                  <td className="p-2 border">{item.description}</td>
                  <td className="p-2 border">{item.price}</td>
                  <td className="p-2 border">{item.stock}</td>
                  <td className="p-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      编辑
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      删除
                    </button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SouvenirList;
