
// // /app/middleware/middleware.js

// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';
// import adminData from './admin.json';

// const JWT_SECRET = process.env.JWT_SECRET;

// export function middleware(request) {
//   const token = request.cookies.get('token');

//   if (!token) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const role = decoded.role;

//     if (role === 'admin') {
//       return NextResponse.next();
//     }

//     return NextResponse.redirect(new URL('/', request.url));
//   } catch (error) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
// }

// export const config = {
//   matcher: ['/admin/:path*'],
// };






// import { NextResponse } from 'next/server';
// import jwt from 'jsonwebtoken';

// const JWT_SECRET = process.env.JWT_SECRET;

// export function middleware(request) {
//   const token = request.cookies.get('token') || request.headers.get('x-token');
  
//   if (!token) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }

//   try {
//     const decoded = jwt.verify(token, JWT_SECRET);
//     const role = decoded.role;

//     if ((role === 'admin' && request.nextUrl.pathname.startsWith('/admin')) || 
//         (role === 'user' && !request.nextUrl.pathname.startsWith('/admin'))) {
//       return NextResponse.next();
//     }

//     return NextResponse.redirect(new URL('/login', request.url));
//   } catch (error) {
//     return NextResponse.redirect(new URL('/login', request.url));
//   }
// }

// export const config = {
//   matcher: ['/admin/:path*', '/:path*'],
// };




// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  const token = req.cookies.get('token');
  const role = req.cookies.get('role');

  const url = req.nextUrl.clone();

  if (!token || !role) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  if (role === 'admin' && url.pathname === '/') {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  } else if (role === 'admin' && url.pathname.startsWith('/admin')) {
    // Allow admin to access admin routes
    return NextResponse.next();
  } else if (role === 'admin') {
    url.pathname = '/admin/dashboard';
    return NextResponse.redirect(url);
  } else if (role === 'user' && url.pathname.startsWith('/admin')) {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  } else if (role === 'user') {
    // Allow user to access user routes
    return NextResponse.next();
  } else {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
}

export const config = {
  matcher: ['/admin/:path*', '/'],
};
