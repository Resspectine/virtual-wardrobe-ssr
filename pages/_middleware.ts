import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  if (url.pathname !== '/login' && url.pathname !== '/register' && !req.cookies.Authentication) {
    url.pathname = '/login';

    return NextResponse.redirect(url);
  }

  if ((url.pathname === '/login' || url.pathname === '/register') && req.cookies.Authentication) {
    url.pathname = '/main';

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
