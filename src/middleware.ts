import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (token && !request.nextUrl.pathname.startsWith('/app')) {
    return Response.redirect(new URL('/app/home', request.url));
  }

  if (!token && !request.nextUrl.pathname.startsWith('/login')) {
    return Response.redirect(new URL('/login', request.url));
  }
  return null;
}

export const config = {
  matcher: ['/app/:path*', '/login'],
};
