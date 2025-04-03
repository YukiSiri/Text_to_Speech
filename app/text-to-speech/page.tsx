"use client"

import { useState, useRef, useEffect } from "react"
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
import { convertTextToSpeech } from "@/lib/text-to-speech"
import { VoiceSettings } from "@/types/tts"
import { toast } from "sonner"
import { Nav } from "@/components/nav"
import { Footer } from "@/components/footer"
import { useAuth } from "@/hooks/useAuth"
import { useRouter } from "next/navigation"

const LANGUAGES = [
  { code: "fr-FR", name: "Français" },
  { code: "en-US", name: "Anglais (États-Unis)" },
  { code: "en-GB", name: "Anglais (Royaume-Uni)" },
  { code: "es-ES", name: "Espagnol" },
  { code: "de-DE", name: "Allemand" },
  { code: "it-IT", name: "Italien" },
  { code: "pt-PT", name: "Portugais" },
  { code: "nl-NL", name: "Néerlandais" },
  { code: "pl-PL", name: "Polonais" },
  { code: "ru-RU", name: "Russe" },
  { code: "ja-JP", name: "Japonais" },
  { code: "ko-KR", name: "Coréen" },
  { code: "zh-CN", name: "Chinois (Simplifié)" },
  { code: "zh-TW", name: "Chinois (Traditionnel)" }
]

const VOICE_TONES = [
  { label: "Très grave", pitch: -20 },  // Pitch très bas
  { label: "Grave", pitch: -10 },       // Pitch bas
  { label: "Bas", pitch: -5 },          // Pitch légèrement bas
  { label: "Normal", pitch: 0 },           // Pitch normal
  { label: "Haut", pitch: 5 },          // Pitch légèrement haut
  { label: "Aigu", pitch: 10 },          // Pitch haut
  { label: "Très aigu", pitch: 15 },       // Pitch très haut
  { label: "Extrêmement aigu", pitch: 20 }, // Pitch maximum
]

export default function TextToSpeechPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login'); // Redirect to login page if not authenticated
      return;
    }
  }, [user, loading, router])

  const [text, setText] = useState("")
  const [voiceSettings, setVoiceSettings] = useState<VoiceSettings>({
    language: "fr-FR",
    gender: "FEMALE",
    pitch: 1,
    speakingRate: 1,
    volumeGainDb: 0
  })
  const [isConverting, setIsConverting] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioUrl, setAudioUrl] = useState("")
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleConvert = async () => {
    if (!text.trim()) {
      toast.error("Veuillez entrer du texte à convertir")
      return
    }
    
    setIsConverting(true)
    try {
      const result = await convertTextToSpeech(text, voiceSettings)
      
      if (result.error) {
        toast.error(result.error)
        return
      }

      setAudioUrl(result.audioUrl)

      // Sauvegarder dans l'historique
      const historyResponse = await fetch('/api/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          voice: voiceSettings.gender.toLowerCase(),
          speed: voiceSettings.speakingRate,
          pitch: voiceSettings.pitch,
          audioUrl: result.audioUrl
        }),
      })

      if (!historyResponse.ok) {
        throw new Error('Erreur lors de la sauvegarde dans l\'historique')
      }

      toast.success("Conversion réussie !")
    } catch (error) {
      toast.error("Une erreur est survenue lors de la conversion")
      console.error("Erreur de conversion:", error)
    } finally {
      setIsConverting(false)
    }
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
    if (!audioUrl) return
    
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

  const getVolumeLabel = (volume: number) => {
    if (volume <= -6) return "Faible"
    if (volume >= 6) return "Fort"
    return "Normal"
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <Nav/>
      
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
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="language-select">Langue</Label>
                    <Select 
                      value={voiceSettings.language} 
                      onValueChange={(value) => setVoiceSettings(prev => ({ ...prev, language: value }))}
                    >
                      <SelectTrigger id="language-select">
                        <SelectValue placeholder="Sélectionnez une langue" />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="voice-select">Voix</Label>
                    <Select 
                      value={voiceSettings.gender} 
                      onValueChange={(value) => setVoiceSettings(prev => ({ ...prev, gender: value as "FEMALE" | "MALE" }))}
                    >
                      <SelectTrigger id="voice-select">
                        <SelectValue placeholder="Sélectionnez une voix" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="FEMALE">Femme</SelectItem>
                        <SelectItem value="MALE">Homme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">

                <div className="space-y-2">
                    <Label htmlFor="tone-select">Ton de voix</Label>
                    <Select 
                      value={voiceSettings.pitch.toString()} 
                      onValueChange={(value) => {
                        const pitchValue = parseFloat(value)
                        setVoiceSettings(prev => ({ ...prev, pitch: pitchValue }))
                        console.log('Ton de voix sélectionné:', pitchValue)
                      }}
                    >
                      <SelectTrigger id="tone-select">
                        <SelectValue placeholder="Sélectionnez un ton" />
                      </SelectTrigger>
                      <SelectContent>
                        {VOICE_TONES.map((tone) => (
                          <SelectItem key={tone.pitch} value={tone.pitch.toString()}>
                            {tone.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="speed-slider">Vitesse de lecture</Label>
                      <span className="text-sm text-muted-foreground">{getSpeedLabel(voiceSettings.speakingRate)}</span>
                    </div>
                    <Slider
                      id="speed-slider"
                      min={0.5}
                      max={2}
                      step={0.1}
                      value={[voiceSettings.speakingRate]}
                      onValueChange={([value]) => setVoiceSettings(prev => ({ ...prev, speakingRate: value }))}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label htmlFor="volume-slider">Volume</Label>
                      <span className="text-sm text-muted-foreground">{getVolumeLabel(voiceSettings.volumeGainDb)}</span>
                    </div>
                    <Slider
                      id="volume-slider"
                      min={-6}
                      max={6}
                      step={1}
                      value={[voiceSettings.volumeGainDb]}
                      onValueChange={([value]) => setVoiceSettings(prev => ({ ...prev, volumeGainDb: value }))}
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
                          src={audioUrl}
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
      
      <Footer/>
    </div>
  )
}
