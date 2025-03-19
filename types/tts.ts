export interface VoiceSettings {
  language: string;
  gender: "FEMALE" | "MALE";
  pitch: number;
  speakingRate: number;
  volumeGainDb: number;
}

export interface TextToSpeechResponse {
  audioUrl: string;
  error?: string;
}

export interface Conversion {
  id: string;
  text: string;
  language: string;
  audioUrl?: string;
  createdAt: Date;
  duration?: number;
}

export interface Session {
  id: string;
  userId: string;
  createdAt: Date;
  lastActive: Date;
  conversions: Conversion[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface SessionResponse {
  session: Session;
  user: User;
} 