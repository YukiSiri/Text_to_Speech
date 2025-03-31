import { PrismaClient } from '@prisma/client'

// Empêcher plusieurs instances de Prisma Client en développement
// à cause du rechargement à chaud (hot-reloading)
const globalForPrisma = global as unknown as { prisma: PrismaClient | undefined }

export const prisma = globalForPrisma.prisma ?? new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: {
      url: process.env.DATABASE_URL?.replace(':5432', ':5433') ||
          "postgresql://postgres:rootroot@localhost:5433/text_to_speech"
    },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Fonction pour tester la connexion à la base de données
export async function testDatabaseConnection() {
  try {
    await prisma.$connect()
    console.log('✅ Connexion à la base de données réussie')
    return true
  } catch (error) {
    console.error('❌ Erreur de connexion à la base de données:', error)
    return false
  }
}