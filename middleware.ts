import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  function middleware(req) {
    // Si l'utilisateur est sur la page de connexion ou d'inscription et qu'il est déjà connecté
    if (
      (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/sign-up') &&
      req.nextauth.token
    ) {
      return NextResponse.redirect(new URL('/account', req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // Ne pas vérifier l'authentification pour les pages de connexion et d'inscription
        if (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/sign-up') {
          return true
        }
        // Vérifier l'authentification pour les autres routes protégées
        return !!token
      },
    },
  }
)

export const config = {
  matcher: ['/account/:path*', '/history/:path*', '/login', '/sign-up']
} 