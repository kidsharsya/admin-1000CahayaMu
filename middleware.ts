import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('access_token')?.value || req.headers.get('authorization')?.replace('Bearer ', '');
  const isAdmin = req.cookies.get('is_admin')?.value === 'true';

  // Halaman yang tidak perlu login
  if (req.nextUrl.pathname.startsWith('/login-admin')) {
    return NextResponse.next();
  }

  // Proteksi semua route /admin/*
  if (req.nextUrl.pathname.startsWith('/admin')) {
    if (!token || !isAdmin) {
      return NextResponse.redirect(new URL('/login-admin', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
