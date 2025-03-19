export const API_CONFIG = {
  GOOGLE_TTS: {
    BASE_URL: 'https://texttospeech.googleapis.com/v1',
    ENDPOINTS: {
      SYNTHESIZE: '/text:synthesize'
    },
    API_KEY: process.env.NEXT_PUBLIC_GOOGLE_TTS_API_KEY,
    AUDIO_CONFIG: {
      DEFAULT_LANGUAGE: 'fr-FR',
      DEFAULT_GENDER: 'FEMALE' as const,
      DEFAULT_PITCH: 0,
      DEFAULT_SPEAKING_RATE: 1,
      DEFAULT_VOLUME_GAIN_DB: 0,
      MIN_PITCH: -20,
      MAX_PITCH: 20,
      MIN_SPEAKING_RATE: 0.25,
      MAX_SPEAKING_RATE: 4,
      MIN_VOLUME_GAIN_DB: -96,
      MAX_VOLUME_GAIN_DB: 16
    },
    SUPPORTED_LANGUAGES: [
      { code: 'fr-FR', name: 'Français' },
      { code: 'en-US', name: 'Anglais (US)' },
      { code: 'en-GB', name: 'Anglais (UK)' },
      { code: 'es-ES', name: 'Espagnol' },
      { code: 'de-DE', name: 'Allemand' },
      { code: 'ja-JP', name: 'Japonais' }
    ]
  }
} as const;

if (!API_CONFIG.GOOGLE_TTS.API_KEY) {
  throw new Error('La clé API Google Text-to-Speech n\'est pas configurée');
} 