export const MIN_BPM = 20;
export const MAX_BPM = 240;
export const DEFAULT_BPM = 100;
export const BLINK_DURATION_MS = 100; // How long the flash stays "on"
export const DEFAULT_TIME_SIGNATURE = 3;

export const THEME_COLORS = [
  { value: 'red', labelKey: 'color_red' },
  { value: 'blue', labelKey: 'color_blue' },
  { value: 'green', labelKey: 'color_green' },
  { value: 'yellow', labelKey: 'color_yellow' }
] as const;

export const BRIGHTNESS_LEVELS = [
  { value: 'light', labelKey: 'brightness_light' },
  { value: 'medium', labelKey: 'brightness_medium' },
  { value: 'dark', labelKey: 'brightness_dark' }
] as const;

export const LANGUAGES = [
  { value: 'en', label: 'English' },
  { value: 'ar', label: 'العربية' },
  { value: 'zh', label: '中文' },
  { value: 'fr', label: 'Français' },
  { value: 'ru', label: 'Русский' },
  { value: 'es', label: 'Español' },
  { value: 'de', label: 'Deutsch' }
] as const;

export const TRANSLATIONS: Record<string, Record<string, string>> = {
  en: {
    color_red: 'Red', color_blue: 'Blue', color_green: 'Green', color_yellow: 'Yellow',
    brightness_light: 'Light', brightness_medium: 'Medium', brightness_dark: 'Dark',
    settings: 'Settings', time_signature: 'Time Signature', color: 'Color', brightness: 'Brightness', language: 'Language', audio: 'AUDIO', stop: 'STOP', start: 'START', close: 'Close',
    first_beat_audio: 'First Beat Audio Accent', first_beat_visual: 'First Beat Visual Accent'
  },
  ar: {
    color_red: 'أحمر', color_blue: 'أزرق', color_green: 'أخضر', color_yellow: 'أصفر',
    brightness_light: 'فاتح', brightness_medium: 'متوسط', brightness_dark: 'داكن',
    settings: 'الإعدادات', time_signature: 'ميزان الإيقاع', color: 'اللون', brightness: 'السطوع', language: 'اللغة', audio: 'الصوت', stop: 'إيقاف', start: 'بدء', close: 'إغلاق',
    first_beat_audio: 'تشديد صوتي للنبضة الأولى', first_beat_visual: 'تشديد مرئي للنبضة الأولى'
  },
  zh: {
    color_red: '红色', color_blue: '蓝色', color_green: '绿色', color_yellow: '黄色',
    brightness_light: '亮', brightness_medium: '中', brightness_dark: '暗',
    settings: '设置', time_signature: '拍号', color: '颜色', brightness: '亮度', language: '语言', audio: '音频', stop: '停止', start: '开始', close: '关闭',
    first_beat_audio: '首拍音频重音', first_beat_visual: '首拍视觉重音'
  },
  fr: {
    color_red: 'Rouge', color_blue: 'Bleu', color_green: 'Vert', color_yellow: 'Jaune',
    brightness_light: 'Clair', brightness_medium: 'Moyen', brightness_dark: 'Sombre',
    settings: 'Paramètres', time_signature: 'Signature rythmique', color: 'Couleur', brightness: 'Luminosité', language: 'Langue', audio: 'AUDIO', stop: 'ARRÊT', start: 'DÉBUTER', close: 'Fermer',
    first_beat_audio: 'Accent audio (1er temps)', first_beat_visual: 'Accent visuel (1er temps)'
  },
  ru: {
    color_red: 'Красный', color_blue: 'Синий', color_green: 'Зеленый', color_yellow: 'Желтый',
    brightness_light: 'Светлый', brightness_medium: 'Средний', brightness_dark: 'Темный',
    settings: 'Настройки', time_signature: 'Размер', color: 'Цвет', brightness: 'Яркость', language: 'Язык', audio: 'ЗВУК', stop: 'СТОП', start: 'СТАРТ', close: 'Закрыть',
    first_beat_audio: 'Аудио акцент (1-я доля)', first_beat_visual: 'Визуальный акцент (1-я доля)'
  },
  es: {
    color_red: 'Rojo', color_blue: 'Azul', color_green: 'Verde', color_yellow: 'Amarillo',
    brightness_light: 'Claro', brightness_medium: 'Medio', brightness_dark: 'Oscuro',
    settings: 'Ajustes', time_signature: 'Compás', color: 'Color', brightness: 'Brillo', language: 'Idioma', audio: 'AUDIO', stop: 'PARAR', start: 'INICIAR', close: 'Cerrar',
    first_beat_audio: 'Acento de audio (1er tiempo)', first_beat_visual: 'Acento visual (1er tiempo)'
  },
  de: {
    color_red: 'Rot', color_blue: 'Blau', color_green: 'Grün', color_yellow: 'Gelb',
    brightness_light: 'Hell', brightness_medium: 'Mittel', brightness_dark: 'Dunkel',
    settings: 'Einstellungen', time_signature: 'Taktart', color: 'Farbe', brightness: 'Helligkeit', language: 'Sprache', audio: 'AUDIO', stop: 'STOP', start: 'START', close: 'Schließen',
    first_beat_audio: 'Akustischer Erste-Schlag-Akzent', first_beat_visual: 'Visueller Erste-Schlag-Akzent'
  }
};

export const TIME_SIGNATURES = [
  { value: 2, label: '2/4' },
  { value: 3, label: '3/4' },
  { value: 4, label: '4/4' },
  { value: 5, label: '5/4' },
  { value: 6, label: '6/8' },
  { value: 7, label: '7/8' }
];

export const TEMPO_MARKINGS = [
  { label: 'Larghissimo', min: 0, max: 20 },
  { label: 'Grave', min: 20, max: 40 },
  { label: 'Largo', min: 40, max: 60 },
  { label: 'Larghetto', min: 60, max: 66 },
  { label: 'Adagio', min: 66, max: 76 },
  { label: 'Andante', min: 76, max: 108 },
  { label: 'Moderato', min: 108, max: 120 },
  { label: 'Allegro', min: 120, max: 168 },
  { label: 'Presto', min: 168, max: 200 },
  { label: 'Prestissimo', min: 200, max: 300 },
];