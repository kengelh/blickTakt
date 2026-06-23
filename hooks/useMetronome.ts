import { useState, useEffect, useRef, useCallback } from 'react';
import { PlayState } from '../types';

interface UseMetronomeProps {
  bpm: number;
  timeSignature: number;
  soundEnabled: boolean;
  accentAudioFirstBeat: boolean;
  onBeat: (beatNumber: number) => void;
}

export const useMetronome = ({ bpm, timeSignature, soundEnabled, accentAudioFirstBeat, onBeat }: UseMetronomeProps) => {
  const [playState, setPlayState] = useState<PlayState>(PlayState.STOPPED);
  
  // Timing references
  const audioContext = useRef<AudioContext | null>(null);
  const nextNoteTime = useRef<number>(0);
  const timerID = useRef<number | null>(null);
  const currentBeat = useRef<number>(1);
  const lookahead = 25.0; 
  const scheduleAheadTime = 0.1; 

  // Initialize AudioContext
  const ensureAudioContext = () => {
    if (!audioContext.current) {
      audioContext.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (audioContext.current.state === 'suspended') {
      audioContext.current.resume();
    }
  };

  const playClick = (time: number, isFirstBeat: boolean) => {
    if (!soundEnabled || !audioContext.current) return;

    const ctx = audioContext.current;
    
    // Create oscillator for the "tick" tone
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();

    // High frequency short burst simulates a mechanical click
    osc.type = 'triangle'; 
    // First beat has a slightly different sound (higher pitch) if enabled
    const applyAccent = isFirstBeat && accentAudioFirstBeat;
    osc.frequency.setValueAtTime(applyAccent ? 1600 : 1200, time);
    osc.frequency.exponentialRampToValueAtTime(applyAccent ? 150 : 100, time + 0.03);

    // Sharp envelope
    gainNode.gain.setValueAtTime(applyAccent ? 1.2 : 1, time);
    gainNode.gain.exponentialRampToValueAtTime(0.001, time + 0.03);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start(time);
    osc.stop(time + 0.03);
  };

  const nextNote = useCallback(() => {
    const secondsPerBeat = 60.0 / bpm;
    nextNoteTime.current += secondsPerBeat;
    currentBeat.current = (currentBeat.current % timeSignature) + 1;
  }, [bpm, timeSignature]);

  const scheduler = useCallback(() => {
    if (!audioContext.current) return;

    while (nextNoteTime.current < audioContext.current.currentTime + scheduleAheadTime) {
      const beatToSend = currentBeat.current;
      playClick(nextNoteTime.current, beatToSend === 1);
      
      const timeToDraw = (nextNoteTime.current - audioContext.current.currentTime) * 1000;
      setTimeout(() => {
        onBeat(beatToSend);
      }, Math.max(0, timeToDraw));

      nextNote();
    }
    
    if (playState === PlayState.PLAYING) {
      timerID.current = window.setTimeout(scheduler, lookahead);
    }
  }, [bpm, onBeat, playState, soundEnabled, nextNote, accentAudioFirstBeat]);

  const togglePlay = () => {
    if (playState === PlayState.PLAYING) {
      setPlayState(PlayState.STOPPED);
    } else {
      ensureAudioContext();
      if (audioContext.current) {
        nextNoteTime.current = audioContext.current.currentTime + 0.05;
        currentBeat.current = 1;
        setPlayState(PlayState.PLAYING);
      }
    }
  };

  useEffect(() => {
    if (playState === PlayState.PLAYING) {
      scheduler();
    }
    return () => {
      if (timerID.current) clearTimeout(timerID.current);
    };
  }, [playState, scheduler]);

  useEffect(() => {
    return () => {
      if (timerID.current) clearTimeout(timerID.current);
      if (audioContext.current) audioContext.current.close();
      audioContext.current = null;
    };
  }, []);

  return {
    playState,
    togglePlay
  };
};
