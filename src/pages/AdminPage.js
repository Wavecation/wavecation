import React from 'react';
import SouvenirForm from '../components/SouvenirForm';
import SouvenirList from '../components/SouvenirList';

const AdminPage = () => (
  <div className="min-h-screen bg-gray-50">
    <h1 className="text-2xl font-bold text-center mt-6">商品管理后台</h1>
    <SouvenirForm />
    <SouvenirList />
  </div>
);

export default AdminPage;
