import { MainRoutes } from '@/app/lib/routes';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    await supabase.auth.exchangeCodeForSession(code);
    return NextResponse.redirect(`${requestUrl.origin}/${MainRoutes.PASSWORD_RECOVERY}`);
  }

  return NextResponse.redirect(`${requestUrl.origin}/${MainRoutes.LOGIN}`);
}