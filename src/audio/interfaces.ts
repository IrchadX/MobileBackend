export interface TranscriptionResult {
  text: string;
  confidence?: number;
  timestamp?: string;
}

export interface AudioInput {
  audio: string; // Base64
  sampleRate?: number;
}