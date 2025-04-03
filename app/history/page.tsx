"use client"

import { useState, useEffect, useCallback } from "react"
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
import { Play, Pause, Download, Volume2, Trash2, Loader2 } from 'lucide-react'
import { format } from "date-fns"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { toast } from "sonner"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

interface HistoryItem {
  id: number
  text: string
  voice: string
  speed: number
  pitch: number
  createdAt: string
  audioUrl: string
}

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [playingId, setPlayingId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const { user, loading } = useAuth()
  const router = useRouter()

  const fetchHistory = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/history');
      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login');
          return;
        }
        throw new Error('Erreur lors de la récupération de l\'historique');
      }
      const data = await response.json();
      setHistory(data);
    } catch (error) {
      console.error('Erreur:', error);
      toast.error('Erreur lors de la récupération de l\'historique');
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      fetchHistory();
    }
  }, [user, loading, router, fetchHistory]);

  // const handlePlay = (id: number) => {
  //   const item = history.find((item) => item.id === id);
    
  //   if (!item) {
  //     console.error(`Aucun élément trouvé pour l'ID: ${id}`);
  //     return;
  //   }

  
  //   console.log(`Lecture du fichier: ${item.audioUrl}`);
  
  //   const audio = new Audio(item.audioUrl);
  //   audio.play().catch((error) => console.error("Erreur lors de la lecture de l'audio:", error));
  
  //   setPlayingId((prev) => (prev === id ? null : id));
  // };

  const handleDownload = (id: number) => {
    const item = history.find(item => item.id === id)
    if (item) {
      const link = document.createElement("a")
      link.href = item.audioUrl
      link.download = `texte-voix-${id}.mp3`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch('/api/history', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        if (response.status === 401) {
          router.push('/login')
          return
        }
        throw new Error('Erreur lors de la suppression')
      }

      setHistory(history.filter(item => item.id !== id))
      toast.success('Conversion supprimée avec succès')
    } catch (error) {
      console.error('Erreur:', error)
      toast.error('Erreur lors de la suppression')
    }
  }

  const getVoiceBadgeColor = (voice: string) => {
    switch (voice) {
      case 'fr-FR':
        return 'bg-blue-500'
      case 'en-US':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  if (loading || isLoading) {
    return (
      <div className="flex min-h-screen justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex min-h-screen items-center flex-col">
      <Nav />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold">Historique des conversions</h1>
                <p className="text-muted-foreground">
                  Retrouvez toutes vos conversions texte vers parole
                </p>
              </div>
              <Link href="/text-to-speech">
                <Button>
                  <Volume2 className="mr-2 h-4 w-4" />
                  Nouvelle conversion
                </Button>
              </Link>
            </div>

            {history.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Volume2 className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Aucune conversion</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Vous n&apos;avez pas encore effectué de conversion. Commencez par convertir votre premier texte !
                  </p>
                  <Link href="/text-to-speech">
                    <Button>
                      <Volume2 className="mr-2 h-4 w-4" />
                      Convertir un texte
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Liste des conversions</CardTitle>
                  <CardDescription>
                    Gérez vos conversions et téléchargez les fichiers audio
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Texte</TableHead>
                        <TableHead>Voix</TableHead>
                        <TableHead>Vitesse</TableHead>
                        <TableHead>Hauteur</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {history.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            {format(new Date(item.createdAt), 'dd/MM/yyyy HH:mm')}
                          </TableCell>
                          <TableCell className="max-w-[300px] truncate">
                            {item.text}
                          </TableCell>
                          <TableCell>
                            <Badge className={getVoiceBadgeColor(item.voice)}>
                              {item.voice}
                            </Badge>
                          </TableCell>
                          <TableCell>{item.speed}x</TableCell>
                          <TableCell>{item.pitch}x</TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              {/* <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handlePlay(item.id)}
                              >
                                {playingId === item.id ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </Button> */}
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDownload(item.id)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDelete(item.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
