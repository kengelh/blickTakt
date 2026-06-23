export enum PlayState {
  STOPPED = 'STOPPED',
  PLAYING = 'PLAYING',
}

export type ThemeColor = 'red' | 'blue' | 'green' | 'yellow';
export type FlashBrightness = 'light' | 'medium' | 'dark';
export type Language = 'en' | 'ar' | 'zh' | 'fr' | 'ru' | 'es' | 'de';

export interface MetronomeSettings {
  bpm: number;
  soundEnabled: boolean;
  visualEnabled: boolean;
  timeSignature: number;
  themeColor: ThemeColor;
  brightness: FlashBrightness;
}
