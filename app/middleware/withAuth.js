'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent, allowedRoles = []) => {
  const AuthenticatedComponent = (props) => {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
      const token = sessionStorage.getItem('token');
      const role = sessionStorage.getItem('role');
      
      if (!token) {
        router.push('/login');
        return;
      }

      if (allowedRoles.length === 0 || (role && allowedRoles.includes(role))) {
        setIsAuthorized(true);
      } else {
        router.push('/login');
      }
    }, [router, allowedRoles]);

    return isAuthorized ? <WrappedComponent {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
