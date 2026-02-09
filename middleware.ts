import { NextResponse, NextRequest } from 'next/server';

export async  function middleware (request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminToken = request.cookies.get('adminToken')?.value;
  const customerToken  = request.cookies.get('customerToken')?.value;

  if (pathname === '/login' || pathname === '/register') {
    if (adminToken) {
      return NextResponse.redirect(new URL('/admin', request.url));
    }
    return NextResponse.next();
  }

  // Handle logout for both
  if (pathname === '/logout') {
    if(adminToken){
      const response = NextResponse.redirect(new URL('/login', request.url));
      response.cookies.delete('adminToken');
      return response;
    }
    const response = NextResponse.redirect(new URL('/', request.url));

    response.cookies.delete('customerToken'); 
    return response;
  }
  
  //pathname vs pathname.startsWith
  if (adminToken && pathname=="/") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
  if (adminToken && pathname === "/login" || pathname === "/register") {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  if (!adminToken && pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }


  //customer specific
  if(customerToken && pathname.startsWith("admin")){
      return NextResponse.redirect(new URL('/', request.url));
  }
  if (customerToken && pathname === "/login" || pathname === "/register") {
    return NextResponse.redirect(new URL("/", request.url));
  }



  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'],
};
