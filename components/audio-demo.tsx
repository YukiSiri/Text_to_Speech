"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Play, Pause, Volume2, Loader2, History } from "lucide-react"
import { convertTextToSpeech } from "@/lib/text-to-speech"
import { toast } from "sonner"
import { getCurrentSession, isSessionValid } from "@/lib/session"
import { Conversion } from "@/lib/types"
import { API_CONFIG } from '@/lib/configTTS'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type SupportedLanguage = typeof API_CONFIG.GOOGLE_TTS.SUPPORTED_LANGUAGES[number]['code']

export function AudioDemo() {
  const [text, setText] = useState(
    "Essayez notre technologie de synthèse vocale avec cette démo interactive. Notre IA avancée crée des voix naturelles dans plusieurs langues.",
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [showHistory, setShowHistory] = useState(false)
  const [conversions, setConversions] = useState<Conversion[]>([])
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(API_CONFIG.GOOGLE_TTS.AUDIO_CONFIG.DEFAULT_LANGUAGE)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const session = getCurrentSession();
    if (session && isSessionValid(session)) {
      setConversions(session.conversions);
    }
  }, []);

  useEffect(() => {
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const handlePlay = async () => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }

    setIsLoading(true)
    try {
      const { audioUrl: newAudioUrl } = await convertTextToSpeech(text, {
        language: selectedLanguage,
        gender: API_CONFIG.GOOGLE_TTS.AUDIO_CONFIG.DEFAULT_GENDER,
        pitch: API_CONFIG.GOOGLE_TTS.AUDIO_CONFIG.DEFAULT_PITCH,
        speakingRate: API_CONFIG.GOOGLE_TTS.AUDIO_CONFIG.DEFAULT_SPEAKING_RATE,
        volumeGainDb: API_CONFIG.GOOGLE_TTS.AUDIO_CONFIG.DEFAULT_VOLUME_GAIN_DB
      })

      if (!newAudioUrl) {
        throw new Error('URL audio non générée');
      }

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }

      setAudioUrl(newAudioUrl)

      if (audioRef.current) {
        audioRef.current.src = newAudioUrl
        audioRef.current.load()
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => toast.error("Erreur lors de la lecture de l'audio"))
      }
    } catch {
      toast.error("Une erreur est survenue lors de la conversion")
    } finally {
      setIsLoading(false)
    }
  }

  const handlePlayConversion = async (conversion: Conversion) => {
    if (isPlaying && audioRef.current) {
      audioRef.current.pause()
      setIsPlaying(false)
      return
    }

    setIsLoading(true)
    try {
      const { audioUrl: newAudioUrl } = await convertTextToSpeech(conversion.text, {
        language: conversion.language,
        gender: API_CONFIG.GOOGLE_TTS.AUDIO_CONFIG.DEFAULT_GENDER,
        pitch: API_CONFIG.GOOGLE_TTS.AUDIO_CONFIG.DEFAULT_PITCH,
        speakingRate: API_CONFIG.GOOGLE_TTS.AUDIO_CONFIG.DEFAULT_SPEAKING_RATE,
        volumeGainDb: API_CONFIG.GOOGLE_TTS.AUDIO_CONFIG.DEFAULT_VOLUME_GAIN_DB
      })

      if (!newAudioUrl) {
        throw new Error('URL audio non générée');
      }

      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }

      setAudioUrl(newAudioUrl)

      if (audioRef.current) {
        audioRef.current.src = newAudioUrl
        audioRef.current.load()
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => toast.error("Erreur lors de la lecture de l'audio"))
      }
    } catch {
      toast.error("Une erreur est survenue lors de la conversion")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Convertisseur Texte vers Parole</h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowHistory(!showHistory)}
            className="gap-2"
          >
            <History className="h-4 w-4" />
            Historique
          </Button>
        </div>

        {!showHistory ? (
          <>
            <div className="flex gap-4">
              <div className="w-1/3">
                <Select 
                  value={selectedLanguage} 
                  onValueChange={(value: SupportedLanguage) => setSelectedLanguage(value)}
                  disabled={isLoading}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Sélectionnez la langue" />
                  </SelectTrigger>
                  <SelectContent>
                    {API_CONFIG.GOOGLE_TTS.SUPPORTED_LANGUAGES.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="demo-text" className="text-sm font-medium">
                Entrez le texte à convertir en parole
              </label>
              <Textarea
                id="demo-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Entrez le texte à convertir en parole"
                className="min-h-[120px]"
                disabled={isLoading}
              />
            </div>
            <div className="flex justify-center">
              <Button 
                onClick={handlePlay} 
                className="w-full sm:w-auto gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Conversion...
                  </>
                ) : isPlaying ? (
                  <>
                    <Pause className="h-4 w-4" /> Pause
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" /> Lecture
                  </>
                )}
              </Button>
            </div>
            {(isPlaying || isLoading) && (
              <div className="mt-4 flex items-center justify-center">
                <div className="flex items-center gap-4">
                  <Volume2 className="h-5 w-5 text-primary animate-pulse" />
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className="h-8 w-1.5 animate-pulse rounded-full bg-primary"
                        style={{
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: "0.8s",
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </>
        ) : (
          <div className="space-y-4">
            <h3 className="text-md font-medium">Historique des conversions</h3>
            <div className="space-y-2">
              {conversions.length === 0 ? (
                <p className="text-sm text-muted-foreground">Aucune conversion enregistrée</p>
              ) : (
                conversions.map((conversion) => (
                  <div
                    key={conversion.id}
                    className="flex items-center justify-between p-3 rounded-lg border bg-muted/50"
                  >
                    <div className="space-y-1">
                      <p className="text-sm line-clamp-2">{conversion.text}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(conversion.createdAt).toLocaleString()}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handlePlayConversion(conversion)}
                      className="gap-2"
                    >
                      <Play className="h-4 w-4" /> Lecture
                    </Button>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
      <audio 
        ref={audioRef}
        onEnded={() => setIsPlaying(false)}
        onError={() => toast.error("Erreur lors de la lecture de l'audio")}
        className="hidden"
      />
    </div>
  )
}
