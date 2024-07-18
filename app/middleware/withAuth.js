// // /app/middleware/withAuth.js

// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const withAuth = (WrappedComponent, allowedRoles = []) => {
//   const AuthenticatedComponent = (props) => {
//     const router = useRouter();
//     const [isAuthorized, setIsAuthorized] = useState(false);

//     useEffect(() => {
//       const token = sessionStorage.getItem('token');
//       const role = sessionStorage.getItem('role');
      
//       if (!token) {
//         router.push('/login');
//         return;
//       }

//       if (allowedRoles.length === 0 || (role && allowedRoles.includes(role))) {
//         setIsAuthorized(true);
//       } else {
//         router.push('/login');
//       }
//     }, [router, allowedRoles]);

//     return isAuthorized ? <WrappedComponent {...props} /> : null;
//   };

//   return AuthenticatedComponent;
// };

// export default withAuth;



// 'use client';
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// const withAuth = (WrappedComponent, allowedRoles = []) => {
//   const AuthenticatedComponent = (props) => {
//     const router = useRouter();
//     const [isAuthorized, setIsAuthorized] = useState(false);

//     useEffect(() => {
//       const token = sessionStorage.getItem('token');
//       const role = sessionStorage.getItem('role');

//       // If token or role is not present, redirect to login
//       if (!token || !role) {
//         router.push('/login');
//       } else if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
//         // If role is present but doesn't match allowedRoles, redirect based on role
//         if (role === 'admin') {
//           router.push('/admin/dashboard'); // Redirect admin to their dashboard
//         } else if (role === 'user') {
//           router.push('/'); // Redirect user to their home page
//         }
//       } else {
//         setIsAuthorized(true); // If authorized, render the component
//       }
//     }, [router, allowedRoles]);

//     return isAuthorized ? <WrappedComponent {...props} /> : null;
//   };

//   return AuthenticatedComponent;
// };

// export default withAuth;




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

      // If token or role is not present, redirect to login
      if (!token || !role) {
        router.push('/login');
      } else {
        // Ensure pathname is available
        const pathname = window.location.pathname;

        if (role === 'admin' && pathname === '/') {
          router.push('/login'); // Redirect admin to login if they try to access user route
        } else if (role === 'admin' && pathname.startsWith('/admin')) {
          setIsAuthorized(true); // Allow admin to access admin routes
        } else if (role === 'admin') {
          router.push('/admin/*'); // Redirect admin to their dashboard for any other routes
        } else if (role === 'user' && pathname.startsWith('/admin')) {
          router.push('/login'); // Redirect user to login if they try to access admin route
        } else if (role === 'user') {
          setIsAuthorized(true); // Allow user to access user routes
        } else {
          router.push('/login'); // Default to login if none of the above conditions match
        }
      }
    }, [router]);

    return isAuthorized ? <WrappedComponent {...props} /> : null;
  };

  return AuthenticatedComponent;
};

export default withAuth;
