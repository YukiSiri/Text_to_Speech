import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.NEXTAUTH_SECRET
    });

    // Rediriger les utilisateurs connectés depuis login/signup vers account
    if ((req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/sign-up') && token) {
        return NextResponse.redirect(new URL('/account', req.url));
    }

    // Rediriger les utilisateurs non connectés vers login
    const protectedRoutes = ['/account', '/history'];
    if (protectedRoutes.some(path => req.nextUrl.pathname.startsWith(path)) && !token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/account/:path*', '/history/:path*', '/login', '/sign-up']
};