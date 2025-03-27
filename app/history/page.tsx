"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, Download, Volume2, Trash2 } from 'lucide-react'
import { format } from "date-fns"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"

// Mock data for demonstration purposes
const mockHistory = [
  {
    id: "1",
    text: "Bienvenue sur notre convertisseur texte-voix. Voici un exemple de la qualité vocale que vous pouvez attendre de notre service.",
    voice: "female",
    speed: 1.0,
    pitch: 1.0,
    createdAt: new Date(2023, 2, 15, 14, 30),
    audioUrl: "/placeholder.mp3"
  },
  {
    id: "2",
    text: "L&apos;intelligence artificielle transforme notre façon d&apos;interagir avec la technologie. Les interfaces vocales deviennent de plus en plus naturelles et réactives.",
    voice: "male",
    speed: 1.2,
    pitch: 0.9,
    createdAt: new Date(2023, 2, 14, 10, 15),
    audioUrl: "/placeholder.mp3"
  },
  {
    id: "3",
    text: "Ceci est un test de l&apos;option voix robotique. Notez la différence avec les voix plus naturelles.",
    voice: "robotic",
    speed: 0.8,
    pitch: 1.3,
    createdAt: new Date(2023, 2, 13, 16, 45),
    audioUrl: "/placeholder.mp3"
  },
  {
    id: "4",
    text: "Le rapide renard brun saute par-dessus le chien paresseux. Cette phrase contient toutes les lettres de l&apos;alphabet français.",
    voice: "child",
    speed: 1.1,
    pitch: 1.5,
    createdAt: new Date(2023, 2, 12, 9, 20),
    audioUrl: "/placeholder.mp3"
  },
  {
    id: "5",
    text: "Merci d&apos;utiliser notre service de conversion texte-voix. Nous espérons que vous le trouverez utile pour vos projets.",
    voice: "elderly",
    speed: 0.9,
    pitch: 0.7,
    createdAt: new Date(2023, 2, 11, 13, 10),
    audioUrl: "/placeholder.mp3"
  }
]

export default function HistoryPage() {
  const [history, setHistory] = useState(mockHistory)
  const [playingId, setPlayingId] = useState<string | null>(null)

  const handlePlay = (id: string) => {
    if (playingId === id) {
      setPlayingId(null)
    } else {
      setPlayingId(id)
    }
  }

  const handleDownload = (id: string) => {
    const item = history.find(item => item.id === id)
    if (item) {
      // In a real app, this would download the actual audio file
      const link = document.createElement("a")
      link.href = item.audioUrl
      link.download = `texte-voix-${id}.mp3`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleDelete = (id: string) => {
    setHistory(history.filter(item => item.id !== id))
  }

  const getVoiceBadgeColor = (voice: string) => {
    switch (voice) {
      case "female":
        return "bg-pink-100 text-pink-800 hover:bg-pink-100"
      case "male":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "robotic":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
      case "child":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
      case "elderly":
        return "bg-purple-100 text-purple-800 hover:bg-purple-100"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-100"
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen flex-col">
      <Nav/>
      
      <main className="flex-1 justify-center items-center container py-8">
        <div className="mx-auto max-w-6xl">
          <Card>
            <CardHeader>
              <CardTitle>Historique des conversions</CardTitle>
              <CardDescription>
                Consultez et gérez vos conversions texte-voix précédentes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {history.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Texte</TableHead>
                      <TableHead>Paramètres</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {history.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          <div className="line-clamp-2">{item.text}</div>
                        </TableCell>
                        <TableCell>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-2">
                              <Badge className={getVoiceBadgeColor(item.voice)} variant="outline">
                                {item.voice === "female" ? "Femme" :
                                 item.voice === "male" ? "Homme" :
                                 item.voice === "robotic" ? "Robotique" :
                                 item.voice === "child" ? "Enfant" :
                                 item.voice === "elderly" ? "Personne âgée" : item.voice}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                Vitesse: {item.speed.toFixed(1)} | Hauteur: {item.pitch.toFixed(1)}
                              </span>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          {format(item.createdAt, "d MMM yyyy HH:mm")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handlePlay(item.id)}
                              title={playingId === item.id ? "Pause" : "Lecture"}
                            >
                              {playingId === item.id ? (
                                <Pause className="h-4 w-4" />
                              ) : (
                                <Play className="h-4 w-4" />
                              )}
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDownload(item.id)}
                              title="Télécharger"
                            >
                              <Download className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => handleDelete(item.id)}
                              title="Supprimer"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                          {playingId === item.id && (
                            <div className="mt-2 flex items-center justify-end gap-2">
                              <Volume2 className="h-4 w-4 text-primary animate-pulse" />
                              <div className="flex gap-1">
                                {Array.from({ length: 3 }).map((_, i) => (
                                  <div 
                                    key={i} 
                                    className="h-4 w-1 animate-pulse rounded-full bg-primary" 
                                    style={{ 
                                      animationDelay: `${i * 0.1}s`,
                                      animationDuration: '0.8s'
                                    }} 
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-12 text-center">
                  <Volume2 className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-4 text-lg font-medium">Aucun historique de conversion</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Vous n&apos;avez pas encore converti de texte en parole.
                  </p>
                  <div className="mt-6">
                    <Link href="/text-to-speech">
                      <Button>Convertir du texte en parole</Button>
                    </Link>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer/>
    </div>
  )
}
