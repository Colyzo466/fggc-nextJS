import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // Protect all /api routes except /api/auth/*
  if (request.nextUrl.pathname.startsWith('/api') && !request.nextUrl.pathname.startsWith('/api/auth')) {
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    // Optionally: verify JWT here
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*'],
};
