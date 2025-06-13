// middleware.js
import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;

  // Handle dashboard subdomain
  if (hostname.startsWith('dashboard.')) {
    url.pathname = `/dashboard${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  // Handle superadmin subdomain
  if (hostname.startsWith('superadmin.')) {
    url.pathname = `/superadmin${url.pathname}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|robots.txt|sitemap.xml).*)'],
};
