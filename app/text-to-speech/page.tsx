"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Play, Pause, Download, Volume2, Loader2, RefreshCw } from 'lucide-react'
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

export default function TextToSpeechPage() {
  const [text, setText] = useState("")
  const [voice, setVoice] = useState("female")
  const [speed, setSpeed] = useState([1])
  const [pitch, setPitch] = useState([1])
  const [isConverting, setIsConverting] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioUrl, setAudioUrl] = useState("")
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleConvert = () => {
    if (!text.trim()) return
    
    setIsConverting(true)
    
    // Simulate API call to convert text to speech
    setTimeout(() => {
      setIsConverting(false)
      setAudioUrl("https://example.com/audio.mp3") // This would be the actual URL in a real app
    }, 1500)
  }

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleDownload = () => {
    // In a real app, this would download the actual audio file
    const link = document.createElement("a")
    link.href = audioUrl
    link.download = "text-to-speech.mp3"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  const getSpeedLabel = (speed: number) => {
    if (speed <= 0.5) return "Lent"
    if (speed >= 1.5) return "Rapide"
    return "Normal"
  }

  const getPitchLabel = (pitch: number) => {
    if (pitch <= 0.5) return "Grave"
    if (pitch >= 1.5) return "Aigu"
    return "Moyen"
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <header className="sticky top-0 z-40 w-full border-b bg-background">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <Volume2 className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Convertisseur Texte-Voix</span>
          </div>
          <Link href="/" className="text-sm font-medium hover:text-primary">
            Retour à l&apos;accueil
          </Link>
        </div>
      </header>
      
      <main className="flex-1 container py-8">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle>Convertisseur Texte-Voix</CardTitle>
              <CardDescription>
                Entrez votre texte ci-dessous et personnalisez les paramètres de la voix pour le convertir en parole.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="text-input">Texte à convertir</Label>
                <Textarea
                  id="text-input"
                  placeholder="Entrez le texte que vous souhaitez convertir en parole..."
                  className="min-h-[150px] resize-y"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="voice-select">Voix</Label>
                  <Select value={voice} onValueChange={setVoice}>
                    <SelectTrigger id="voice-select">
                      <SelectValue placeholder="Sélectionnez une voix" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">Femme</SelectItem>
                      <SelectItem value="male">Homme</SelectItem>
                      <SelectItem value="robotic">Robotique</SelectItem>
                      <SelectItem value="child">Enfant</SelectItem>
                      <SelectItem value="elderly">Personne âgée</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="speed-slider">Vitesse de lecture</Label>
                      <span className="text-sm text-muted-foreground">{getSpeedLabel(speed[0])}</span>
                    </div>
                    <Slider
                      id="speed-slider"
                      min={0.5}
                      max={2}
                      step={0.1}
                      value={speed}
                      onValueChange={setSpeed}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="pitch-slider">Hauteur de voix</Label>
                      <span className="text-sm text-muted-foreground">{getPitchLabel(pitch[0])}</span>
                    </div>
                    <Slider
                      id="pitch-slider"
                      min={0.5}
                      max={2}
                      step={0.1}
                      value={pitch}
                      onValueChange={setPitch}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center">
                <Button 
                  onClick={handleConvert} 
                  disabled={!text.trim() || isConverting}
                  className="w-full md:w-auto"
                >
                  {isConverting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Conversion en cours...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Convertir en audio
                    </>
                  )}
                </Button>
              </div>
              
              <Separator className="my-6" />
              
              {audioUrl ? (
                <Card>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Audio généré</h3>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={handleDownload}
                          title="Télécharger l'audio"
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Button 
                          variant="outline" 
                          size="icon" 
                          onClick={handlePlayPause}
                        >
                          {isPlaying ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        
                        <div className="relative h-2 flex-1 rounded-full bg-muted">
                          <div 
                            className={`absolute h-full rounded-full bg-primary transition-all ${isPlaying ? 'animate-progress' : ''}`} 
                            style={{ width: isPlaying ? '100%' : '0%' }}
                          />
                        </div>
                        
                        <audio 
                          ref={audioRef} 
                          src="/placeholder.mp3" 
                          onEnded={handleAudioEnded}
                          className="hidden"
                        />
                      </div>
                      
                      {isPlaying && (
                        <div className="flex justify-center py-2">
                          <div className="flex items-center gap-2">
                            <Volume2 className="h-5 w-5 text-primary" />
                            <div className="flex gap-1">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <div 
                                  key={i} 
                                  className="h-6 w-1 animate-pulse rounded-full bg-primary" 
                                  style={{ 
                                    animationDelay: `${i * 0.1}s`,
                                    animationDuration: '0.8s'
                                  }} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <div className="rounded-lg border border-dashed p-8 text-center">
                  <Volume2 className="mx-auto h-8 w-8 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-medium">Aucun audio généré</h3>
                  <p className="text-sm text-muted-foreground">
                    Vous n&apos;avez pas encore converti de texte en parole.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">Texte-Voix</span>
          </div>
          <p className="text-center text-sm">
            &ldquo;Transformez votre texte en parole naturelle en quelques clics.&rdquo;
          </p>
        </div>
      </footer>
    </div>
  )
}
