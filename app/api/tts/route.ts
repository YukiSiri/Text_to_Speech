import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/configTTS';
import { VoiceSettings } from '@/types/tts';

export async function POST(request: Request) {
  try {
    const { text, settings } = await request.json();

    if (!text || !settings) {
      return NextResponse.json(
        { error: 'Le texte et les paramètres sont requis' },
        { status: 400 }
      );
    }

    const response = await fetch(
      `${API_CONFIG.GOOGLE_TTS.BASE_URL}${API_CONFIG.GOOGLE_TTS.ENDPOINTS.SYNTHESIZE}?key=${API_CONFIG.GOOGLE_TTS.API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          input: { text },
          voice: {
            languageCode: settings.language,
            ssmlGender: settings.gender,
            pitch: settings.pitch,
            speakingRate: settings.speakingRate,
            volumeGainDb: settings.volumeGainDb
          },
          audioConfig: {
            audioEncoding: 'MP3',
            pitch: settings.pitch,
            speakingRate: settings.speakingRate,
            volumeGainDb: settings.volumeGainDb
          }
        })
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.error?.message || "Une erreur est survenue lors de la conversion" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la conversion" },
      { status: 500 }
    );
  }
} 