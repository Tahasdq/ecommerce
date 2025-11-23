import { NextResponse,NextRequest } from 'next/server';

export  function middleware(request: NextRequest) {
    console.log("middleware called")
    const pathname = request.nextUrl.pathname
   

    if(request.nextUrl.pathname=="/logout") {
      const response =  NextResponse.redirect(new URL ("/login" , request.url))
        response.cookies.delete('authToken')
      return response
    }
    const isAuthenticated = request.cookies.get('authToken')?.value

    // if user is not authenticated and trying to access path other than login or resgiter then rediect them to login
    if(!isAuthenticated && !(pathname === '/login' || pathname === '/register')){
        return NextResponse.redirect(new URL('/login', request.url))
    }

    // if user  not authenticated and trying to access login or resgiter then rediect them to home
    if(isAuthenticated  && (pathname === '/login' || pathname === '/register')){
        return NextResponse.redirect(new URL('/', request.url))
    }
    

    // if user not authenticated and trying to access login or resgiter then they can
  return NextResponse.next()
}

// ✅ This matcher skips internal/static routes automatically
export const config = {
  matcher: ['/((?!_next|favicon.ico|api).*)'],
}