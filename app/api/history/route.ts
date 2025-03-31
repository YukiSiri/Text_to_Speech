// Dans app/api/history/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"

// Méthode GET existante...

export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse("Non autorisé", { status: 401 })
    }

    const history = await prisma.conversion.findMany({
      where: {
        user: {
          email: session.user.email
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(history)
  } catch (error) {
    console.error("Erreur lors de la récupération de l'historique:", error)
    return new NextResponse("Erreur serveur", { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse("Non autorisé", { status: 401 })
    }

    const body = await request.json()
    const { text, voice, speed, pitch, audioUrl } = body

    if (!text || !voice || !speed || !pitch || !audioUrl) {
      return new NextResponse("Données manquantes", { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return new NextResponse("Utilisateur non trouvé", { status: 404 })
    }

    const conversion = await prisma.conversion.create({
      data: {
        text,
        voice,
        speed,
        pitch,
        audioUrl,
        userId: user.id
      }
    })

    return NextResponse.json(conversion)
  } catch (error) {
    console.error("Erreur lors de la création de la conversion:", error)
    return new NextResponse("Erreur serveur", { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return new NextResponse("Non autorisé", { status: 401 })
    }

    const body = await request.json()
    const { id } = body

    if (!id) {
      return new NextResponse("ID manquant", { status: 400 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return new NextResponse("Utilisateur non trouvé", { status: 404 })
    }

    const conversion = await prisma.conversion.findUnique({
      where: { id }
    })

    if (!conversion) {
      return new NextResponse("Conversion non trouvée", { status: 404 })
    }

    if (conversion.userId !== user.id) {
      return new NextResponse("Non autorisé", { status: 403 })
    }

    await prisma.conversion.delete({
      where: { id }
    })

    return new NextResponse(null, { status: 204 })
  } catch (error) {
    console.error("Erreur lors de la suppression de la conversion:", error)
    return new NextResponse("Erreur serveur", { status: 500 })
  }
}