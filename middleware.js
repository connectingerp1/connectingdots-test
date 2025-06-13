import { NextResponse } from 'next/server';

export function middleware(request) {
  const hostname = request.headers.get('host') || '';
  const url = request.nextUrl;

  console.log("🌐 Hostname:", hostname);
  console.log("➡️ Requested URL:", url.pathname);

  // Handle dashboard subdomain
  if (hostname.startsWith('dashboard.')) {
    url.pathname = `/dashboard${url.pathname}`;
    console.log("🔁 Rewriting to:", url.pathname);
    return NextResponse.rewrite(url);
  }

  // Handle superadmin subdomain
  if (hostname.startsWith('superadmin.')) {
    url.pathname = `/superadmin${url.pathname}`;
    console.log("🔁 Rewriting to:", url.pathname);
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next|favicon.ico|robots.txt|sitemap.xml|api).*)',
  ],
};
