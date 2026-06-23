import React, { useState, useCallback } from 'react';
import { useMetronome } from './hooks/useMetronome';
import { Visualizer } from './components/Visualizer';
import { ControlPanel } from './components/ControlPanel';
import { DEFAULT_BPM, DEFAULT_TIME_SIGNATURE } from './constants';
import { ThemeColor, FlashBrightness, Language } from './types';

const App: React.FC = () => {
  const [bpm, setBpm] = useState(DEFAULT_BPM);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [timeSignature, setTimeSignature] = useState(DEFAULT_TIME_SIGNATURE);
  const [themeColor, setThemeColor] = useState<ThemeColor>('red');
  const [brightness, setBrightness] = useState<FlashBrightness>('medium');
  const [language, setLanguage] = useState<Language>('en');
  const [accentAudioFirstBeat, setAccentAudioFirstBeat] = useState(true);
  const [accentVisualFirstBeat, setAccentVisualFirstBeat] = useState(true);
  
  // State to trigger visual effects
  const [beatInfo, setBeatInfo] = useState({ trigger: 0, beatNumber: 1 });

  // Callback called by engine exactly on beat
  const handleBeat = useCallback((beatNumber: number) => {
    setBeatInfo(prev => ({ trigger: prev.trigger + 1, beatNumber }));
  }, []);

  const { playState, togglePlay } = useMetronome({
    bpm,
    timeSignature,
    soundEnabled,
    accentAudioFirstBeat,
    onBeat: handleBeat
  });

  return (
    <div className="relative h-screen w-screen flex flex-col justify-end bg-slate-900 overflow-hidden select-none">
      
      {/* Background Visualizer takes full space */}
      <Visualizer 
        trigger={beatInfo.trigger} 
        beatNumber={beatInfo.beatNumber} 
        themeColor={themeColor}
        brightness={brightness}
        accentVisualFirstBeat={accentVisualFirstBeat}
      />

      {/* Branding */}
      <div className="absolute top-0 left-0 right-0 z-10 p-10 flex flex-col items-center pointer-events-none">
        <h2 className="text-slate-500 font-bold tracking-[0.3em] text-xs uppercase opacity-40">blickTakt</h2>
      </div>

      {/* Bottom Controls */}
      <ControlPanel 
        bpm={bpm} 
        setBpm={setBpm}
        playState={playState}
        togglePlay={togglePlay}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
        timeSignature={timeSignature}
        setTimeSignature={setTimeSignature}
        themeColor={themeColor}
        setThemeColor={setThemeColor}
        brightness={brightness}
        setBrightness={setBrightness}
        language={language}
        setLanguage={setLanguage}
        accentAudioFirstBeat={accentAudioFirstBeat}
        setAccentAudioFirstBeat={setAccentAudioFirstBeat}
        accentVisualFirstBeat={accentVisualFirstBeat}
        setAccentVisualFirstBeat={setAccentVisualFirstBeat}
      />
    </div>
  );
};

export default App;
