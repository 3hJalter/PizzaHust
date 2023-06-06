import React from 'react';
import { Outlet } from 'react-router-dom';
import { AdminHeader } from './AdminHeader.jsx';

const AdminLayout = () => {
  return (
    <div className="py-4 px-8 flex flex-col min-h-screen">
      <AdminHeader />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
