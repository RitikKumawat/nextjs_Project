import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    
    const token = request.cookies.get('token')?.value || ''
    const path = request.nextUrl.pathname
    const isPublicPath = path==='/login' || path==='/signup'|| path==="/verifyemail"
    if(token && isPublicPath) 
        return NextResponse.redirect(new URL('/', request.nextUrl))
    if(!token && !isPublicPath) 
        return NextResponse.redirect(new URL('/login', request.nextUrl))
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
        '/',
        '/profile',
        '/login',
        '/signup',
        '/profile/:id*',
        '/verifyemail'
  ],
}