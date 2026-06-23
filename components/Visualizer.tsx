import React, { useEffect, useState } from 'react';
import { BLINK_DURATION_MS } from '../constants';
import { ThemeColor, FlashBrightness } from '../types';

interface VisualizerProps {
  trigger: number; // Increment this to trigger a flash
  beatNumber: number;
  themeColor: ThemeColor;
  brightness: FlashBrightness;
  accentVisualFirstBeat: boolean;
}

export const Visualizer: React.FC<VisualizerProps> = ({ trigger, beatNumber, themeColor, brightness, accentVisualFirstBeat }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (trigger > 0) {
      setIsActive(true);
      const timer = setTimeout(() => setIsActive(false), BLINK_DURATION_MS);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  const getColorClasses = () => {
    const isFirstBeat = beatNumber === 1 && accentVisualFirstBeat;
    
    // Determine effective brightness - 1st beat is slightly brighter
    let effectiveBrightness = brightness;
    if (isFirstBeat) {
      if (brightness === 'dark') effectiveBrightness = 'medium';
      else if (brightness === 'medium') effectiveBrightness = 'light';
      // if already light, stays light
    }

    const colorConfig = {
      red: {
        light: { bg: 'bg-red-400', center: 'bg-red-300', border: 'border-red-100', shadow: 'shadow-[0_0_100px_rgba(248,113,113,0.9)]' },
        medium: { bg: 'bg-red-500', center: 'bg-red-400', border: 'border-red-200', shadow: 'shadow-[0_0_100px_rgba(239,68,68,0.9)]' },
        dark: { bg: 'bg-red-700', center: 'bg-red-500', border: 'border-red-400', shadow: 'shadow-[0_0_100px_rgba(185,28,28,0.9)]' }
      },
      blue: {
        light: { bg: 'bg-blue-400', center: 'bg-blue-300', border: 'border-blue-100', shadow: 'shadow-[0_0_100px_rgba(96,165,250,0.9)]' },
        medium: { bg: 'bg-blue-500', center: 'bg-blue-400', border: 'border-blue-200', shadow: 'shadow-[0_0_100px_rgba(59,130,246,0.9)]' },
        dark: { bg: 'bg-blue-700', center: 'bg-blue-500', border: 'border-blue-400', shadow: 'shadow-[0_0_100px_rgba(29,78,216,0.9)]' }
      },
      green: {
        light: { bg: 'bg-green-400', center: 'bg-green-300', border: 'border-green-100', shadow: 'shadow-[0_0_100px_rgba(74,222,128,0.9)]' },
        medium: { bg: 'bg-green-500', center: 'bg-green-400', border: 'border-green-200', shadow: 'shadow-[0_0_100px_rgba(34,197,94,0.9)]' },
        dark: { bg: 'bg-green-700', center: 'bg-green-500', border: 'border-green-400', shadow: 'shadow-[0_0_100px_rgba(21,128,61,0.9)]' }
      },
      yellow: {
        light: { bg: 'bg-yellow-400', center: 'bg-yellow-300', border: 'border-yellow-100', shadow: 'shadow-[0_0_100px_rgba(250,204,21,0.9)]' },
        medium: { bg: 'bg-yellow-500', center: 'bg-yellow-400', border: 'border-yellow-200', shadow: 'shadow-[0_0_100px_rgba(234,179,8,0.9)]' },
        dark: { bg: 'bg-yellow-700', center: 'bg-yellow-500', border: 'border-yellow-400', shadow: 'shadow-[0_0_100px_rgba(161,98,7,0.9)]' }
      }
    };

    return colorConfig[themeColor][effectiveBrightness];
  };

  const getBeatNumberIndicators = () => {
    // Show a visual indication of which beat we are on (e.g. dots or text)
    // To keep it clean, maybe just a subtle text or no text to stick to raw visuals.
    return beatNumber;
  };

  const colors = getColorClasses();

  return (
    <div className="absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
      {/* Background that flashes */}
      <div 
        className={`absolute inset-0 transition-colors duration-75 ease-out ${
          isActive ? colors.bg : 'bg-slate-900'
        }`}
      />
      
      {/* Central Indicator for focus */}
      <div className={`relative z-10 w-48 h-48 rounded-full border-4 transition-all duration-75 flex items-center justify-center ${
        isActive 
          ? `${colors.center} ${colors.border} ${colors.shadow} scale-105` 
          : 'bg-slate-800 border-slate-700 shadow-none scale-100'
      }`}>
        <div className="absolute inset-0 flex items-center justify-center">
            {isActive && <div className={`w-full h-full rounded-full ${colors.center} opacity-50 animate-ping`}></div>}
        </div>
      </div>
    </div>
  );
};