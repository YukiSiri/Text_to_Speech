import { PrismaClient } from '@prisma/client'

// Éviter les instances multiples en développement
const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient()

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