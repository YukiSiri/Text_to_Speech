import { API_CONFIG } from './configTTS';
import { VoiceSettings } from '@/types/tts';

export async function convertTextToSpeech(text: string, settings: VoiceSettings) {
  if (!API_CONFIG.GOOGLE_TTS.API_KEY) {
    return {
      error: "La clé API Google Text-to-Speech n'est pas configurée. Veuillez configurer la variable d'environnement NEXT_PUBLIC_GOOGLE_TTS_API_KEY.",
      audioUrl: ''
    };
  }

  try {
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
      return {
        error: error.error?.message || "Une erreur est survenue lors de la conversion",
        audioUrl: ''
      };
    }

    const data = await response.json();
    const audioContent = data.audioContent;
    const blob = new Blob(
      [Uint8Array.from(atob(audioContent), c => c.charCodeAt(0))],
      { type: 'audio/mp3' }
    );
    const audioUrl = URL.createObjectURL(blob);

    return { audioUrl, error: undefined };
  } catch {
    return {
      error: "Une erreur est survenue lors de la conversion",
      audioUrl: ''
    };
  }
}