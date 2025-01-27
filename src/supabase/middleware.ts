import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';
import { getUserRole } from '@/actions/auth';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request
          });
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options));
        }
      }
    }
  );

  // Do not run code between createServerClient and
  // supabase.auth.getUser(). A simple mistake could make it very hard to debug
  // issues with users being randomly logged out.

  // IMPORTANT: DO NOT REMOVE auth.getUser()

  const {
    data: { user }
  } = await supabase.auth.getUser();

  // !user: 유저가 없고
  // my-page 로 접근한다면 -> 강제로 로그인 페이지로 이동한다.
  if (!user && request.nextUrl.pathname.startsWith('/my-page')) {
    // no user, potentially respond by redirecting the user to the login page
    const url = request.nextUrl.clone();
    url.pathname = '/sign-in';
    return NextResponse.redirect(url);
  }

  // 이미 로그인을 했는데,
  // 로그인 혹은 회원가입 페이지로 이동한다면?
  // 강제로 메인페이지로 이동한다.
  if (
    user &&
    (request.nextUrl.pathname.startsWith('/sign-in') ||
      request.nextUrl.pathname.startsWith('/sign-up/business') ||
      request.nextUrl.pathname.startsWith('/sign-up'))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/';
    return NextResponse.redirect(url);
  }

  const { data: userRole } = await getUserRole(user?.id);
  // 이미 로그인을 했고,
  // 유저의 역할이 user 인데,
  // 비즈니스 혹은 어드민 마이페이지로 접근하면
  // 강제로 user 마이페이지로 간다.
  if (
    user &&
    userRole?.role === 'user' &&
    (request.nextUrl.pathname.startsWith('/my-page/business') || request.nextUrl.pathname.startsWith('/my-page/admin'))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/my-page/user';
    return NextResponse.redirect(url);
  }
  // 이미 로그인을 했고,
  // 유저의 역할이 business 인데,
  // 유저 혹은 어드민 마이페이지로 접근하면
  // 강제로 business 마이페이지로 간다.

  if (
    user &&
    userRole?.role === 'business' &&
    (request.nextUrl.pathname.startsWith('/my-page/user') || request.nextUrl.pathname.startsWith('/my-page/admin'))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = '/my-page/business';
    return NextResponse.redirect(url);
  }

  // 이미 로그인을 했고,
  // 유저의 역할이 admin 인데,
  // 비즈니스 혹은 유저 마이페이지로 접근하면
  // 강제로 admin 마이페이지로 간다.

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  // If you're creating a new response object with NextResponse.next() make sure to:
  // 1. Pass the request in it, like so:
  //    const myNewResponse = NextResponse.next({ request })
  // 2. Copy over the cookies, like so:
  //    myNewResponse.cookies.setAll(supabaseResponse.cookies.getAll())
  // 3. Change the myNewResponse object to fit your needs, but avoid changing
  //    the cookies!
  // 4. Finally:
  //    return myNewResponse
  // If this is not done, you may be causing the browser and server to go out
  // of sync and terminate the user's session prematurely!

  return supabaseResponse;
}
