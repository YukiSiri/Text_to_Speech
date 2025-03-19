import { API_CONFIG } from './configTTS';
import { VoiceSettings, TextToSpeechResponse } from '@/types/tts';

export async function convertTextToSpeech(text: string, voiceSettings: VoiceSettings): Promise<TextToSpeechResponse> {
  try {
    const requestBody = {
      input: {
        text: text
      },
      voice: {
        languageCode: voiceSettings.language,
        ssmlGender: voiceSettings.gender
      },
      audioConfig: {
        audioEncoding: "MP3",
        pitch: voiceSettings.pitch,
        speakingRate: voiceSettings.speakingRate,
        volumeGainDb: voiceSettings.volumeGainDb
      }
    };
    
    console.log('Envoi de la requête à l\'API avec le corps:', JSON.stringify(requestBody, null, 2));
    
    const response = await fetch(
      `${API_CONFIG.GOOGLE_TTS.BASE_URL}${API_CONFIG.GOOGLE_TTS.ENDPOINTS.SYNTHESIZE}?key=${API_CONFIG.GOOGLE_TTS.API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      }
    );

    console.log('Statut de la réponse:', response.status);
    console.log('Headers de la réponse:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Erreur de l\'API:', errorData);
      throw new Error(errorData.error?.message || `Erreur ${response.status}`);
    }

    const data = await response.json();
    console.log('Réponse de l\'API:', data);

    if (!data.audioContent) {
      throw new Error('Pas de contenu audio dans la réponse');
    }

    // Vérifier que le contenu audio est en base64 valide
    if (!/^[A-Za-z0-9+/=]+$/.test(data.audioContent)) {
      throw new Error('Format de contenu audio invalide');
    }

    const binaryString = atob(data.audioContent);
    const bytes = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    console.log('Taille des données audio:', bytes.length);

    if (bytes.length === 0) {
      throw new Error('Données audio vides');
    }

    const audioBlob = new Blob([bytes], { type: 'audio/mpeg' });
    const audioUrl = URL.createObjectURL(audioBlob);
    
    console.log('URL audio générée:', audioUrl);
    
    // Vérifier que l'URL est accessible
    const testResponse = await fetch(audioUrl);
    if (!testResponse.ok) {
      throw new Error('URL audio non accessible');
    }
    
    return { audioUrl };
  } catch (error) {
    console.error('Erreur détaillée:', error);
    return { 
      audioUrl: '', 
      error: error instanceof Error ? error.message : 'Une erreur est survenue lors de la conversion'
    };
  }
}