export const API_CONFIG = {
  GOOGLE_TTS: {
    BASE_URL: 'https://texttospeech.googleapis.com/v1',
    ENDPOINTS: {
      SYNTHESIZE: '/text:synthesize'
    },
    API_KEY: process.env.GOOGLE_TTS_API_KEY || '',
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
    SUPPORTED_LANGUAGES: {
      'fr-FR': 'Français',
      'en-US': 'English (US)',
      'en-GB': 'English (UK)',
      'es-ES': 'Español',
      'de-DE': 'Deutsch',
      'it-IT': 'Italiano'
    } as const
  }
} as const;

export type SupportedLanguage = keyof typeof API_CONFIG.GOOGLE_TTS.SUPPORTED_LANGUAGES;

// Afficher un avertissement dans la console si la clé API n'est pas configurée
if (typeof window === 'undefined' && !API_CONFIG.GOOGLE_TTS.API_KEY) {
  console.warn('La clé API Google Text-to-Speech n\'est pas configurée');
} 