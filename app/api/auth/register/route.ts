import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'
import { Prisma } from '@prisma/client'

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json();
    console.log('Données reçues:', { firstName, lastName, email });

    // Vérifiez que tous les champs sont présents
    if (!firstName || !lastName || !email || !password) {
      console.error('Tous les champs sont requis');
      return NextResponse.json({ error: 'Tous les champs sont requis' }, { status: 400 });
    }

    // Vérifiez si l'utilisateur existe déjà
    console.log('Vérification de l\'existence de l\'utilisateur...');
    const existingUser = await prisma.user.findUnique({ 
      where: { email },
      select: { id: true, email: true }
    });

    if (existingUser) {
      console.error('Cet email est déjà utilisé:', email);
      return NextResponse.json({ error: 'Cet email est déjà utilisé' }, { status: 400 });
    }

    // Créez l'utilisateur
    console.log('Hachage du mot de passe...');
    const hashedPassword = await bcrypt.hash(password, 10);
    
    console.log('Création de l\'utilisateur...');
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        createdAt: true
      }
    });

    console.log('✅ Utilisateur créé avec succès:', user);
    return NextResponse.json(user);
  } catch (error) {
    console.error('❌ Erreur lors de l\'inscription:', error);
    
    // Gestion spécifique des erreurs Prisma
    if (error instanceof Prisma.PrismaClientInitializationError) {
      return NextResponse.json(
        { error: 'Impossible de se connecter à la base de données. Vérifiez que le serveur PostgreSQL est en cours d\'exécution.' },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { error: 'Une erreur est survenue lors de l\'inscription' },
      { status: 500 }
    );
  }
}