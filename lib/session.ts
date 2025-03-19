import { Session, User, Conversion, SessionResponse } from '@/types/tts';

const SESSION_KEY = 'tts_session';
const USER_KEY = 'tts_user';

export function getCurrentSession(): Session | null {
  if (typeof window === 'undefined') return null;
  
  const sessionStr = localStorage.getItem(SESSION_KEY);
  if (!sessionStr) return null;

  try {
    const session = JSON.parse(sessionStr);
    return {
      ...session,
      createdAt: new Date(session.createdAt),
      lastActive: new Date(session.lastActive),
      conversions: session.conversions.map((conv: any) => ({
        ...conv,
        createdAt: new Date(conv.createdAt)
      }))
    };
  } catch (error) {
    console.error('Erreur lors de la lecture de la session:', error);
    return null;
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem(USER_KEY);
  if (!userStr) return null;

  try {
    const user = JSON.parse(userStr);
    return {
      ...user,
      createdAt: new Date(user.createdAt)
    };
  } catch (error) {
    console.error('Erreur lors de la lecture de l\'utilisateur:', error);
    return null;
  }
}

export function createSession(user: User): Session {
  const session: Session = {
    id: crypto.randomUUID(),
    userId: user.id,
    createdAt: new Date(),
    lastActive: new Date(),
    conversions: []
  };

  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  localStorage.setItem(USER_KEY, JSON.stringify(user));

  return session;
}

export function updateSession(session: Session): void {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function addConversionToSession(conversion: Conversion): void {
  const session = getCurrentSession();
  if (!session) return;

  session.conversions.unshift(conversion);
  session.lastActive = new Date();
  updateSession(session);
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(USER_KEY);
}

export function isSessionValid(): boolean {
  const session = getCurrentSession();
  if (!session) return false;

  const now = new Date();
  const lastActive = new Date(session.lastActive);
  const hoursDiff = (now.getTime() - lastActive.getTime()) / (1000 * 60 * 60);

  return hoursDiff < 24; // Session valide pendant 24 heures
} 