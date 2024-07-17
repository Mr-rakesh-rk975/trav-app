'use client';
import withAuth from '@/app/middleware/withAuth';
import React from 'react';


const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Your Company. All rights reserved.</p>
      <p>Contact us at: contact@yourcompany.com</p>
    </footer>
  );
};

export default withAuth(Footer,['user']);
