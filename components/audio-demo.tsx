"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Play, Pause, Volume2 } from "lucide-react"

export function AudioDemo() {
  const [text, setText] = useState(
    "Try our text-to-speech technology with this interactive demo. Our advanced AI creates natural-sounding voices in multiple languages.",
  )
  const [isPlaying, setIsPlaying] = useState(false)
  const [voice, setVoice] = useState("en-US-1")

  const handlePlay = () => {
    // In a real implementation, this would call the text-to-speech API
    // For this demo, we'll just toggle the play state
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="rounded-xl border bg-background p-6 shadow-sm">
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="demo-text" className="text-sm font-medium">
            Enter text to convert to speech
          </label>
          <Textarea
            id="demo-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to convert to speech"
            className="min-h-[120px]"
          />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="voice-select" className="text-sm font-medium">
              Select voice
            </label>
            <Select value={voice} onValueChange={setVoice}>
              <SelectTrigger id="voice-select">
                <SelectValue placeholder="Select voice" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en-US-1">English (US) - Female</SelectItem>
                <SelectItem value="en-US-2">English (US) - Male</SelectItem>
                <SelectItem value="en-GB-1">English (UK) - Female</SelectItem>
                <SelectItem value="en-GB-2">English (UK) - Male</SelectItem>
                <SelectItem value="es-ES-1">Spanish - Female</SelectItem>
                <SelectItem value="fr-FR-1">French - Female</SelectItem>
                <SelectItem value="de-DE-1">German - Male</SelectItem>
                <SelectItem value="ja-JP-1">Japanese - Female</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-end">
            <Button onClick={handlePlay} className="w-full gap-2">
              {isPlaying ? (
                <>
                  <Pause className="h-4 w-4" /> Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" /> Play
                </>
              )}
            </Button>
          </div>
        </div>
        {isPlaying && (
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
      </div>
    </div>
  )
}

