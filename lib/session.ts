import { Conversion } from "./types"

interface Session {
  id: string
  userId?: string
  conversions: Conversion[]
  createdAt: string
}

const SESSION_KEY = 'tts_session'
const SESSION_EXPIRY = 24 * 60 * 60 * 1000 // 24 heures en millisecondes

export function getCurrentSession(): Session | null {
  if (typeof window === 'undefined') return null

  const sessionStr = localStorage.getItem(SESSION_KEY)
  if (!sessionStr) return null

  const session: Session = JSON.parse(sessionStr)
  if (!isSessionValid(session)) {
    localStorage.removeItem(SESSION_KEY)
    return null
  }

  return session
}

export function isSessionValid(session: Session): boolean {
  const createdAt = new Date(session.createdAt).getTime()
  const now = new Date().getTime()
  return now - createdAt < SESSION_EXPIRY
}

export function addConversionToSession(conversion: Conversion): void {
  if (typeof window === 'undefined') return

  const session = getCurrentSession()
  if (!session) {
    const newSession: Session = {
      id: crypto.randomUUID(),
      conversions: [conversion],
      createdAt: new Date().toISOString()
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify(newSession))
  } else {
    session.conversions.unshift(conversion)
    localStorage.setItem(SESSION_KEY, JSON.stringify(session))
  }
} 