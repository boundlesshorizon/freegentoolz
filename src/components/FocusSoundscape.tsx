import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Play, Pause, RotateCcw, Volume2, CloudRain, Flame, Zap, Compass, Moon, Bell, HelpCircle } from 'lucide-react';

interface FocusSoundscapeProps {
  onBack: () => void;
}

// Custom White Noise generation helper for Web Audio
function createNoiseBuffer(ctx: AudioContext, seconds = 2) {
  const bufferSize = ctx.sampleRate * seconds;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  return buffer;
}

export default function FocusSoundscape({ onBack }: FocusSoundscapeProps) {
  // Pomodoro State
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [totalDuration, setTotalDuration] = useState(25 * 60);

  // Audio Context State
  const audioCtxRef = useRef<AudioContext | null>(null);
  
  // Channels Volumes & Toggle status
  const [channels, setChannels] = useState([
    { id: 'rain', name: 'Calm Forest Rain', icon: CloudRain, active: false, volume: 0.5, color: 'text-blue-400' },
    { id: 'fire', name: 'Crackling Fireplace', icon: Flame, active: false, volume: 0.5, color: 'text-amber-500' },
    { id: 'binaural', name: 'Theta Brainwave (Focus)', icon: Zap, active: false, volume: 0.4, color: 'text-violet-400' },
    { id: 'drone', name: 'Cosmic Space Drone', icon: Moon, active: false, volume: 0.3, color: 'text-cyan-400' },
  ]);

  // Audio nodes refs for dynamic tuning
  const gainNodesRef = useRef<{ [key: string]: GainNode }>({});
  const sourcesRef = useRef<{ [key: string]: Array<AudioNode> }>({});
  const rainCracklesIntervalRef = useRef<number | null>(null);
  const fireplaceIntervalRef = useRef<number | null>(null);

  // Initialize Audio Context on click if not done
  const initAudioCtx = () => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtxClass) {
        audioCtxRef.current = new AudioCtxClass();
      }
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Sound DSP synthesizers
  const startSynth = (channelId: string) => {
    initAudioCtx();
    const ctx = audioCtxRef.current;
    if (!ctx) return;

    // Create Gain Node for volume control
    const channel = channels.find(c => c.id === channelId);
    if (!channel) return;

    const gainNode = ctx.createGain();
    gainNode.gain.setValueAtTime(channel.volume, ctx.currentTime);
    gainNode.connect(ctx.destination);
    gainNodesRef.current[channelId] = gainNode;

    const activeNodes: Array<AudioNode> = [];

    if (channelId === 'rain') {
      // 1. Rain Synthesizer: Lowpass filtered white noise
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx, 3);
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      noise.connect(filter);
      filter.connect(gainNode);
      noise.start();
      activeNodes.push(noise, filter);

      // Random crackling drops
      const triggerRaindrop = () => {
        if (!audioCtxRef.current || !gainNodesRef.current['rain']) return;
        const curCtx = audioCtxRef.current;
        const dropOsc = curCtx.createOscillator();
        const dropGain = curCtx.createGain();

        dropOsc.type = 'sine';
        dropOsc.frequency.setValueAtTime(1200 + Math.random() * 800, curCtx.currentTime);
        
        dropGain.gain.setValueAtTime(0, curCtx.currentTime);
        dropGain.gain.linearRampToValueAtTime(0.02 + Math.random() * 0.03, curCtx.currentTime + 0.01);
        dropGain.gain.exponentialRampToValueAtTime(0.0001, curCtx.currentTime + 0.2 + Math.random() * 0.3);

        dropOsc.connect(dropGain);
        dropGain.connect(gainNodesRef.current['rain']);
        dropOsc.start();
        dropOsc.stop(curCtx.currentTime + 0.6);
      };

      const intervalId = window.setInterval(() => {
        if (Math.random() < 0.70) triggerRaindrop();
      }, 150);
      rainCracklesIntervalRef.current = intervalId;

    } else if (channelId === 'fire') {
      // 2. Fireplace Synthesizer: Bandpass filtered pink/white noise
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx, 2.5);
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(180, ctx.currentTime);
      filter.Q.setValueAtTime(1.2, ctx.currentTime);

      noise.connect(filter);
      filter.connect(gainNode);
      noise.start();
      activeNodes.push(noise, filter);

      // Fire wood crackle anomalies
      const triggerCrackle = () => {
        if (!audioCtxRef.current || !gainNodesRef.current['fire']) return;
        const curCtx = audioCtxRef.current;
        const crackleOsc = curCtx.createOscillator();
        const crackleGain = curCtx.createGain();

        crackleOsc.type = 'triangle';
        crackleOsc.frequency.setValueAtTime(150 + Math.random() * 80, curCtx.currentTime);

        crackleGain.gain.setValueAtTime(0, curCtx.currentTime);
        crackleGain.gain.linearRampToValueAtTime(0.06, curCtx.currentTime + 0.005);
        crackleGain.gain.exponentialRampToValueAtTime(0.0001, curCtx.currentTime + 0.04);

        crackleOsc.connect(crackleGain);
        crackleGain.connect(gainNodesRef.current['fire']);
        crackleOsc.start();
        crackleOsc.stop(curCtx.currentTime + 0.1);
      };

      const intervalId = window.setInterval(() => {
        if (Math.random() < 0.25) triggerCrackle();
      }, 250);
      fireplaceIntervalRef.current = intervalId;

    } else if (channelId === 'binaural') {
      // 3. Theta Binaural Beats: Split stereoscopic oscillators (145Hz Left, 151Hz Right = 6Hz Theta waves)
      const oscL = ctx.createOscillator();
      const oscR = ctx.createOscillator();
      const pannerL = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
      const pannerR = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

      oscL.type = 'sine';
      oscL.frequency.setValueAtTime(145, ctx.currentTime);

      oscR.type = 'sine';
      oscR.frequency.setValueAtTime(151, ctx.currentTime);

      if (pannerL && pannerR) {
        pannerL.pan.setValueAtTime(-1, ctx.currentTime);
        pannerR.pan.setValueAtTime(1, ctx.currentTime);

        oscL.connect(pannerL);
        pannerL.connect(gainNode);

        oscR.connect(pannerR);
        pannerR.connect(gainNode);
        activeNodes.push(oscL, oscR, pannerL, pannerR);
      } else {
        // Fallback to plain mix
        oscL.connect(gainNode);
        oscR.connect(gainNode);
        activeNodes.push(oscL, oscR);
      }

      oscL.start();
      oscR.start();

    } else if (channelId === 'drone') {
      // 4. Space Drone: Deep modulated low oscillator & slow LFO lowpass filter sweep
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(65, ctx.currentTime); // C2 Note

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(65.5, ctx.currentTime); // Soft detune

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(180, ctx.currentTime);

      // Low frequency modulator for slow sweeping
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // Super slow

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(80, ctx.currentTime); // Modulation depth

      lfo.connect(lfoGain);
      lfoGain.connect(lowpass.frequency);

      osc1.connect(lowpass);
      osc2.connect(lowpass);
      lowpass.connect(gainNode);

      lfo.start();
      osc1.start();
      osc2.start();
      activeNodes.push(osc1, osc2, lowpass, lfo, lfoGain);
    }

    sourcesRef.current[channelId] = activeNodes;
  };

  const stopSynth = (channelId: string) => {
    // Clear custom drop timers
    if (channelId === 'rain' && rainCracklesIntervalRef.current) {
      window.clearInterval(rainCracklesIntervalRef.current);
      rainCracklesIntervalRef.current = null;
    }
    if (channelId === 'fire' && fireplaceIntervalRef.current) {
      window.clearInterval(fireplaceIntervalRef.current);
      fireplaceIntervalRef.current = null;
    }

    // Stop and disconnect nodes
    const activeNodes = sourcesRef.current[channelId];
    if (activeNodes) {
      activeNodes.forEach(node => {
        try {
          (node as any).stop?.();
        } catch (e) {}
        try {
          node.disconnect();
        } catch (e) {}
      });
      delete sourcesRef.current[channelId];
    }

    const gainNode = gainNodesRef.current[channelId];
    if (gainNode) {
      try {
        gainNode.disconnect();
      } catch (e) {}
      delete gainNodesRef.current[channelId];
    }
  };

  const toggleChannel = (channelId: string) => {
    initAudioCtx();
    setChannels(prev => prev.map(c => {
      if (c.id === channelId) {
        const nextState = !c.active;
        if (nextState) {
          startSynth(channelId);
        } else {
          stopSynth(channelId);
        }
        return { ...c, active: nextState };
      }
      return c;
    }));
  };

  const handleVolumeChange = (channelId: string, value: number) => {
    setChannels(prev => prev.map(c => {
      if (c.id === channelId) {
        const gainNode = gainNodesRef.current[channelId];
        if (gainNode && audioCtxRef.current) {
          gainNode.gain.setValueAtTime(value, audioCtxRef.current.currentTime);
        }
        return { ...c, volume: value };
      }
      return c;
    }));
  };

  // Pomodoro dynamic tracking
  useEffect(() => {
    let interval: number | null = null;
    if (isActive) {
      interval = window.setInterval(() => {
        if (seconds > 0) {
          setSeconds(prev => prev - 1);
        } else if (minutes > 0) {
          setMinutes(prev => prev - 1);
          setSeconds(59);
        } else {
          // Timer reached 0. Swap work/break sessions!
          const nextIsBreak = !isBreak;
          setIsBreak(nextIsBreak);
          const nextMins = nextIsBreak ? 5 : 25;
          setMinutes(nextMins);
          setSeconds(0);
          setTotalDuration(nextMins * 60);

          // Standard browser native audio notification
          try {
            if (audioCtxRef.current) {
              const ringOsc = audioCtxRef.current.createOscillator();
              const ringGain = audioCtxRef.current.createGain();
              ringOsc.type = 'sine';
              ringOsc.frequency.setValueAtTime(620, audioCtxRef.current.currentTime);
              ringGain.gain.setValueAtTime(0, audioCtxRef.current.currentTime);
              ringGain.gain.linearRampToValueAtTime(0.15, audioCtxRef.current.currentTime + 0.05);
              ringGain.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.8);
              ringOsc.connect(ringGain);
              ringGain.connect(audioCtxRef.current.destination);
              ringOsc.start();
              ringOsc.stop(audioCtxRef.current.currentTime + 1.0);
            }
          } catch(e) {}
        }
      }, 1000);
    } else if (!isActive && interval !== null) {
      window.clearInterval(interval);
    }
    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [isActive, minutes, seconds, isBreak]);

  // Cleanup synthesis oscillators on exit
  useEffect(() => {
    return () => {
      // Stop all synthesizers
      channels.forEach(c => {
        stopSynth(c.id);
      });
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(25);
    setSeconds(0);
    setTotalDuration(25 * 60);
  };

  const setCustomMinutes = (mins: number) => {
    setIsActive(false);
    setIsBreak(false);
    setMinutes(mins);
    setSeconds(0);
    setTotalDuration(mins * 60);
  };

  const progressPercent = ((minutes * 60 + seconds) / totalDuration) * 100;

  return (
    <div id="soundscape-root" className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Back button */}
      <button 
        id="btn-back-to-hub"
        onClick={onBack} 
        className="flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
        Back to Hub
      </button>

      {/* Header title */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div className="p-4 bg-violet-500/10 rounded-2xl text-violet-400 w-fit">
          <Moon className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white font-sans tracking-tight">Focused Ambient Soundscape & Timer</h1>
          <p className="text-slate-400 mt-1">Procedural audio mixer and Pomodoro timer engineered with browser DSP to achieve deep theta flow states.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Left Side: Pomodoro Timer */}
        <div className="md:col-span-5 bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col items-center justify-center space-y-6 shadow-sm relative overflow-hidden">
          
          <div className="text-center">
            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isBreak ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
              {isBreak ? '☕ Break Interval' : '⚡ Deep Focus Mode'}
            </span>
          </div>

          {/* Visual Progress Dial */}
          <div className="relative w-48 h-48 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle 
                cx="50" 
                cy="50" 
                r="44" 
                className="stroke-slate-950 fill-none" 
                strokeWidth="6" 
              />
              <circle 
                cx="50" 
                cy="50" 
                r="44" 
                className={`fill-none transition-all duration-1000 ${isBreak ? 'stroke-indigo-500' : 'stroke-emerald-500'}`} 
                strokeWidth="6" 
                strokeDasharray="276"
                strokeDashoffset={276 - (276 * progressPercent) / 100}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-4xl font-mono text-white font-black block">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">Remaining</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-3 w-full">
            <button
              id="btn-pomodoro-start"
              onClick={() => { initAudioCtx(); setIsActive(!isActive); }}
              className={`flex-1 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition cursor-pointer ${
                isActive 
                  ? 'bg-slate-800 hover:bg-slate-700 text-white' 
                  : 'bg-white hover:bg-slate-200 text-slate-950'
              }`}
            >
              {isActive ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4" /> Start Flow</>}
            </button>

            <button
              id="btn-pomodoro-reset"
              onClick={resetTimer}
              title="Reset session"
              className="p-3 bg-slate-950 hover:bg-slate-800 border border-slate-850 rounded-xl text-slate-400 hover:text-white transition cursor-pointer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Interval Quick Presets */}
          <div className="space-y-2 w-full pt-2 border-t border-slate-850">
            <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-widest text-center">Set Flow Duration</span>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={() => setCustomMinutes(15)} 
                className={`text-xs py-2 px-1 rounded-lg border text-center transition cursor-pointer font-semibold ${minutes === 15 ? 'bg-indigo-500/15 border-indigo-500 text-white' : 'bg-slate-950 hover:bg-slate-850 border-slate-850 text-slate-400'}`}
              >
                15m
              </button>
              <button 
                onClick={() => setCustomMinutes(25)} 
                className={`text-xs py-2 px-1 rounded-lg border text-center transition cursor-pointer font-semibold ${minutes === 25 ? 'bg-indigo-500/15 border-indigo-500 text-white' : 'bg-slate-950 hover:bg-slate-850 border-slate-850 text-slate-400'}`}
              >
                25m
              </button>
              <button 
                onClick={() => setCustomMinutes(50)} 
                className={`text-xs py-2 px-1 rounded-lg border text-center transition cursor-pointer font-semibold ${minutes === 50 ? 'bg-indigo-500/15 border-indigo-500 text-white' : 'bg-slate-950 hover:bg-slate-850 border-slate-850 text-slate-400'}`}
              >
                50m
              </button>
            </div>
          </div>

        </div>

        {/* Right Side: Ambient Synthesizer Mixer */}
        <div className="md:col-span-7 bg-slate-900 border border-slate-800 p-6 rounded-2xl space-y-6 shadow-sm flex flex-col justify-between">
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-violet-400" /> Ambient Synthesis Channels
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-violet-500/10 text-violet-400 px-2 py-0.5 rounded">
                Procedural DSP
              </span>
            </div>
            <p className="text-slate-450 text-xs leading-relaxed">
              Synthetically generated waves tailored to reduce sensory triggers. Toggle any combination and move sliders to find your perfect focal blend.
            </p>
          </div>

          <div className="space-y-4 pt-2">
            {channels.map((chan) => {
              const IconComp = chan.icon;
              return (
                <div 
                  key={chan.id} 
                  className={`bg-slate-950 border p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all duration-300 ${
                    chan.active ? 'border-violet-500/30 shadow-md shadow-violet-500/2 font-sans' : 'border-slate-850'
                  }`}
                >
                  
                  {/* Channel Meta */}
                  <div className="flex items-center gap-3.5">
                    <button
                      onClick={() => toggleChannel(chan.id)}
                      className={`p-3 rounded-xl transition cursor-pointer ${
                        chan.active ? 'bg-violet-500/15 text-violet-400 animate-pulse' : 'bg-slate-900 text-slate-500 hover:text-slate-350'
                      }`}
                      title={chan.active ? "Mute channel" : "Unmute channel"}
                    >
                      <IconComp className="w-5 h-5" />
                    </button>
                    <div>
                      <span className={`text-sm font-bold transition ${chan.active ? 'text-white' : 'text-slate-450'}`}>{chan.name}</span>
                      <span className="block text-[10px] text-slate-500 uppercase tracking-widest mt-0.5">
                        {chan.active ? 'Generating live waves' : 'Channel offline'}
                      </span>
                    </div>
                  </div>

                  {/* Volume Control */}
                  <div className="flex items-center gap-3 sm:w-1/3">
                    <Volume2 className="w-4 h-4 text-slate-550" />
                    <input 
                      type="range" 
                      min="0" 
                      max="1" 
                      step="0.05"
                      disabled={!chan.active}
                      value={chan.volume} 
                      onChange={(e) => handleVolumeChange(chan.id, parseFloat(e.target.value))}
                      className="w-full accent-violet-400 bg-slate-900 rounded-lg cursor-pointer h-1.5 outline-none disabled:opacity-20"
                    />
                    <span className="text-[10px] font-mono font-black text-slate-550 w-8 text-right">
                      {Math.round(chan.volume * 100)}%
                    </span>
                  </div>

                </div>
              );
            })}
          </div>

          {/* Guidelines info */}
          <div className="bg-slate-950/40 p-4 border border-slate-850 rounded-xl flex gap-3 text-xs text-slate-450">
            <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0" />
            <p className="leading-relaxed">
              <strong>Autoplay Tip:</strong> Your browser requires a click interaction on the page for audio cards to synthesize initial sound rumbles. Tap any channel or "Start Flow" to wake up Node synthesizers.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
