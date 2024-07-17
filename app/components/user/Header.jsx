'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import withAuth from '@/app/middleware/withAuth';


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const handleLogin = () => {
    router.push('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <header className="header">
        <div className="logo">Logo</div>
        <div className="nav">
          <div className="search">
            <input type="text" placeholder="Search..." />
          </div>
          <nav className="links">
            <Link href="/about">About</Link>
            <Link href="/destinations">Destinations</Link>
            <Link href="/activities">Activities</Link>
          </nav>
          <button className="loginButton" onClick={handleLogin}>Login</button>
        </div>
        <button className="menuButton" onClick={toggleMenu}>Menu</button>
      </header>
      {isOpen && (
        <div className="offCanvasMenu">
          <Link href="/about" onClick={toggleMenu}>About</Link>
            <Link href="/destinations" onClick={toggleMenu}>Destinations</Link>
            <Link href="/activities" onClick={toggleMenu}>Activities</Link>
        </div>
      )}
    </>
  );
};

export default withAuth(Header,['user']);
