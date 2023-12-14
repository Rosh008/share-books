import { MainRoutes } from '@/app/lib/routes';
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {data: {session}} = await supabase.auth.getSession()

  if(!session && !req.nextUrl.pathname.includes(MainRoutes.LOGIN)){
    const url = req.nextUrl.clone();
    url.pathname = MainRoutes.LOGIN;
    return NextResponse.redirect(url)
  }

  if(session && req.nextUrl.pathname.includes(MainRoutes.LOGIN)){
    const url = req.nextUrl.clone();
    url.pathname = MainRoutes.HOME;
    return NextResponse.redirect(url)
  }
  return res
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
  