import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { SITE_UNDER_CONSTRUCTION } from '@/lib/construction';

export function middleware(request: NextRequest) {
  if (!SITE_UNDER_CONSTRUCTION) return NextResponse.next();

  if (request.nextUrl.pathname.startsWith('/api')) {
    return NextResponse.json({ error: 'unavailable' }, { status: 503 });
  }

  if (request.nextUrl.pathname !== '/') {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|brand/|lab/).*)'],
};
