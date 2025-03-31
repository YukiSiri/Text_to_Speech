import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    const { firstName, lastName, email, password } = await request.json()

    if (!firstName || !lastName || !email || !password) {
      return NextResponse.json(
          { error: 'Tous les champs sont requis' },
          { status: 400 }
      )
    }

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
          { error: 'Cet email est déjà utilisé' },
          { status: 400 }
      )
    }

    // Hacher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword
      }
    })

// Omettre le mot de passe dans la réponse
    const userResponse = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      // Ajoutez d'autres propriétés nécessaires, sauf le mot de passe
    }

    return NextResponse.json(userResponse, { status: 201 })
  } catch (error) {
    console.error('Erreur d\'inscription:', error)
    return NextResponse.json(
        { error: 'Une erreur est survenue lors de l\'inscription' },
        { status: 500 }
    )
  }
}