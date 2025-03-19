import { NextResponse } from 'next/server';
import { API_CONFIG } from '@/lib/configTTS';

export async function POST(request: Request) {
  try {
    const { text, settings } = await request.json();

    if (!text || !settings) {
      return NextResponse.json(
        { error: 'Le texte et les paramètres sont requis' },
        { status: 400 }
      );
    }

    console.log('Clé API:', API_CONFIG.GOOGLE_TTS.API_KEY ? 'Présente' : 'Manquante');
    
    if (!API_CONFIG.GOOGLE_TTS.API_KEY) {
      console.error('La clé API Google Text-to-Speech n\'est pas configurée');
      return NextResponse.json(
        { error: 'La clé API n\'est pas configurée' },
        { status: 500 }
      );
    }

    console.log('Envoi de la requête à l\'API Google Text-to-Speech...');
    console.log('URL:', `${API_CONFIG.GOOGLE_TTS.BASE_URL}${API_CONFIG.GOOGLE_TTS.ENDPOINTS.SYNTHESIZE}`);
    console.log('Paramètres:', {
      text: text.substring(0, 50) + '...',
      settings
    });

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
            ssmlGender: settings.gender
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
      console.error('Erreur de l\'API Google Text-to-Speech:', error);
      return NextResponse.json(
        { error: error.error?.message || "Une erreur est survenue lors de la conversion" },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log('Réponse reçue de l\'API Google Text-to-Speech');
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erreur lors de la conversion:', error);
    return NextResponse.json(
      { error: "Une erreur est survenue lors de la conversion" },
      { status: 500 }
    );
  }
} 