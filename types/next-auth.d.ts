import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface User {
    id: string
    email: string
    firstName: string
    lastName: string
  }

  interface Session {
    user: User
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string
    firstName: string
    lastName: string
  }
} 