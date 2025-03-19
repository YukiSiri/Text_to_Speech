import { VoiceSettings } from '@/types/tts';

export async function convertTextToSpeech(text: string, settings: VoiceSettings) {
  try {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, settings })
    });

    if (!response.ok) {
      const error = await response.json();
      return {
        error: error.error || "Une erreur est survenue lors de la conversion",
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