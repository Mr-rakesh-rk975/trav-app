import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import adminData from './admin.json';

const JWT_SECRET = process.env.JWT_SECRET;

export function middleware(request) {
  const token = request.cookies.get('token');

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const role = decoded.role;

    if (role === 'admin') {
      return NextResponse.next();
    }

    return NextResponse.redirect(new URL('/', request.url));
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

export const config = {
  matcher: ['/admin/:path*'],
};
