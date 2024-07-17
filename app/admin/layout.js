'use client'
import React from 'react';
import AdminNavbar from '../components/admin/AdminNavbar';
import AdminFooter from '../components/admin/AdminFooter';
import withAuth from '../middleware/withAuth';

const AdminLayout = ({ children }) => {
  return (
    <>
      <AdminNavbar />
      <main>{children}</main>
      <AdminFooter />
    </>
  );
};

export default withAuth(AdminLayout);
