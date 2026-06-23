import React, { useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import { PlayState, ThemeColor, FlashBrightness, Language } from '../types';
import { MIN_BPM, MAX_BPM, TEMPO_MARKINGS, THEME_COLORS, BRIGHTNESS_LEVELS, TIME_SIGNATURES, LANGUAGES, TRANSLATIONS } from '../constants';
import { Settings, X } from 'lucide-react';

interface ControlPanelProps {
  bpm: number;
  setBpm: (bpm: number) => void;
  playState: PlayState;
  togglePlay: () => void;
  soundEnabled: boolean;
  setSoundEnabled: (enabled: boolean) => void;
  timeSignature: number;
  setTimeSignature: (num: number) => void;
  themeColor: ThemeColor;
  setThemeColor: (color: ThemeColor) => void;
  brightness: FlashBrightness;
  setBrightness: (brightness: FlashBrightness) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  accentAudioFirstBeat: boolean;
  setAccentAudioFirstBeat: (v: boolean) => void;
  accentVisualFirstBeat: boolean;
  setAccentVisualFirstBeat: (v: boolean) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  bpm,
  setBpm,
  playState,
  togglePlay,
  soundEnabled,
  setSoundEnabled,
  timeSignature,
  setTimeSignature,
  themeColor,
  setThemeColor,
  brightness,
  setBrightness,
  language,
  setLanguage,
  accentAudioFirstBeat,
  setAccentAudioFirstBeat,
  accentVisualFirstBeat,
  setAccentVisualFirstBeat,
}) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const t = TRANSLATIONS[language] || TRANSLATIONS['en'];

  const handleBpmChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(Number(e.target.value));
  };

  const adjustBpm = (delta: number) => {
    const newBpm = Math.min(MAX_BPM, Math.max(MIN_BPM, bpm + delta));
    setBpm(newBpm);
  };

  const tempoMarking = useMemo(() => {
    const marking = TEMPO_MARKINGS.find(m => bpm >= m.min && bpm < m.max);
    return marking ? marking.label : 'Prestissimo';
  }, [bpm]);

  return (
    <div className="relative z-20 bg-slate-950/80 backdrop-blur-xl border-t border-slate-800 w-full rounded-t-3xl shadow-2xl safe-area-bottom pb-6">
      
      {/* Settings Modal overlay */}
      {isSettingsOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 bg-slate-950/95 backdrop-blur-3xl z-50 p-8 pt-12 flex flex-col custom-scrollbar overflow-y-auto">
          <div className="max-w-md mx-auto w-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-white font-bold text-2xl">{t.settings}</h3>
              <button 
                onClick={() => setIsSettingsOpen(false)}
                className="text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-full p-2 transition-colors"
                aria-label={t.close}
              >
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-8">
              {/* Language */}
              <div className="flex flex-col gap-3">
                <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">{t.language}</span>
                <div className="flex flex-wrap gap-2">
                  {LANGUAGES.map(l => (
                    <button
                      key={l.value}
                      onClick={() => setLanguage(l.value as Language)}
                      className={`px-4 py-2 text-sm rounded-lg transition-colors font-medium border ${
                        language === l.value ? 'bg-slate-700 text-white border-transparent' : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      {l.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Colors */}
              <div className="flex flex-col gap-3">
                <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">{t.color}</span>
                <div className="flex gap-4">
                  {THEME_COLORS.map(color => (
                    <button
                      key={color.value}
                      onClick={() => setThemeColor(color.value as ThemeColor)}
                      className={`w-12 h-12 rounded-full border-4 transition-all flex items-center justify-center ${
                        themeColor === color.value ? 'border-white scale-110 shadow-lg' : 'border-transparent scale-100 opacity-60 hover:opacity-100'
                      } ${
                        color.value === 'red' ? 'bg-red-500' :
                        color.value === 'blue' ? 'bg-blue-500' :
                        color.value === 'green' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      aria-label={t[color.labelKey]}
                      title={t[color.labelKey]}
                    />
                  ))}
                </div>
              </div>

              {/* Brightness */}
              <div className="flex flex-col gap-3">
                <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">{t.brightness}</span>
                <div className="flex gap-2">
                  {BRIGHTNESS_LEVELS.map(level => (
                    <button
                      key={level.value}
                      onClick={() => setBrightness(level.value as FlashBrightness)}
                      className={`px-4 py-2 text-sm rounded-lg transition-colors font-medium border ${
                        brightness === level.value ? 'bg-slate-700 text-white border-transparent' : 'bg-transparent text-slate-400 border-slate-700 hover:border-slate-500'
                      }`}
                    >
                      {t[level.labelKey]}
                    </button>
                  ))}
                </div>
              </div>

              {/* First Beat Tuning */}
              <div className="flex flex-col gap-4 mt-2 border-t border-slate-800 pt-6">
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{t.first_beat_audio}</span>
                  <input 
                    type="checkbox" 
                    checked={accentAudioFirstBeat} 
                    onChange={(e) => setAccentAudioFirstBeat(e.target.checked)}
                    className="w-6 h-6 accent-slate-600 bg-slate-800 border-slate-700 rounded cursor-pointer"
                  />
                </label>
                <label className="flex items-center justify-between cursor-pointer group">
                  <span className="text-slate-300 font-medium group-hover:text-white transition-colors">{t.first_beat_visual}</span>
                  <input 
                    type="checkbox" 
                    checked={accentVisualFirstBeat} 
                    onChange={(e) => setAccentVisualFirstBeat(e.target.checked)}
                    className="w-6 h-6 accent-slate-600 bg-slate-800 border-slate-700 rounded cursor-pointer"
                  />
                </label>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Main Control Panel */}
      <div className="px-6 py-6 custom-scrollbar max-h-[50vh] overflow-y-auto">
        <button 
          onClick={() => setIsSettingsOpen(true)}
          className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
          aria-label={t.settings}
        >
          <Settings size={20} />
        </button>

        <div className="max-w-md mx-auto flex flex-col gap-5">
          
          {/* BPM Display */}
          <div className="flex flex-col items-center justify-center gap-1">
              <div className="flex items-center justify-between w-full">
                  <button 
                      onClick={() => adjustBpm(-1)}
                      className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 active:bg-slate-600 flex items-center justify-center text-3xl font-light text-slate-300 transition-colors"
                      aria-label="Decrease BPM"
                  >
                      -
                  </button>
                  <div className="text-center flex flex-col items-center flex-1">
                      <h1 className="text-5xl font-black text-white tabular-nums tracking-tighter leading-none">
                          {bpm}
                      </h1>
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-xs mt-1">{tempoMarking}</span>
                  </div>
                  <button 
                      onClick={() => adjustBpm(1)}
                      className="w-12 h-12 rounded-full bg-slate-800 hover:bg-slate-700 active:bg-slate-600 flex items-center justify-center text-3xl font-light text-slate-300 transition-colors"
                      aria-label="Increase BPM"
                  >
                      +
                  </button>
              </div>
          </div>

          {/* Slider */}
          <div className="w-full px-2">
              <input
                  type="range"
                  min={MIN_BPM}
                  max={MAX_BPM}
                  value={bpm}
                  onChange={handleBpmChange}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer focus:outline-none"
                  style={{ accentColor: themeColor === 'red' ? '#ef4444' : themeColor === 'blue' ? '#3b82f6' : themeColor === 'green' ? '#22c55e' : '#eab308' }}
              />
          </div>

          {/* Settings Grid for Takt */}
          <div className="flex flex-col gap-4">
            {/* Takt */}
            <div className="flex items-center justify-between">
              <span className="text-slate-400 text-sm font-bold uppercase tracking-wider">{t.time_signature}</span>
              <div className="flex gap-2">
                {TIME_SIGNATURES.map(ts => (
                  <button
                    key={ts.value}
                    onClick={() => setTimeSignature(ts.value)}
                    className={`px-3 py-1 text-sm rounded-md transition-colors ${
                      timeSignature === ts.value ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-500 border border-slate-800'
                    }`}
                  >
                    {ts.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-4 gap-4 items-center h-16 mt-2">
              
              {/* Sound Toggle */}
              <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`col-span-1 h-full rounded-2xl flex flex-col items-center justify-center gap-1 transition-all ${
                      soundEnabled ? 'bg-slate-800 text-white border border-slate-700' : 'bg-slate-900 text-slate-600 border border-transparent'
                  }`}
                  title={t.audio}
              >
                  {soundEnabled ? (
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                       <path strokeLinecap="round" strokeLinejoin="round" d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                     </svg>
                  ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                      </svg>
                  )}
                  <span className="text-[10px] font-bold tracking-wider">{t.audio}</span>
              </button>

              {/* Play Button */}
              <button
                  onClick={togglePlay}
                  className={`col-span-3 h-full rounded-2xl flex items-center justify-center text-2xl font-black tracking-widest transition-all shadow-lg active:scale-95 ${
                      playState === PlayState.PLAYING
                          ? 'bg-slate-800 text-white border border-slate-700 shadow-none'
                          : 'bg-white text-slate-900 shadow-slate-900/40'
                  }`}
              >
                  {playState === PlayState.PLAYING ? t.stop : t.start}
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};
