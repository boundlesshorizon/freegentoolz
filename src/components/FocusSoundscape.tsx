import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, Play, Pause, RotateCcw, Volume2, CloudRain, Flame, Zap, Compass, 
  Moon, Bell, HelpCircle, Heart, Shield, Sparkles, Sun, Brain, Award, Sparkle 
} from 'lucide-react';

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
  
  // Channels Volumes & Toggle status - Nature/Binaural & Solfeggio
  const [channels, setChannels] = useState([
    // Nature & Ambient Backgrounds
    { 
      id: 'rain', 
      name: 'Calm Forest Rain', 
      desc: 'Ambient lowpass rain with cozy randomized raindrops', 
      icon: CloudRain, 
      type: 'ambient', 
      active: false, 
      volume: 0.5, 
      color: 'text-blue-400' 
    },
    { 
      id: 'fire', 
      name: 'Crackling Fireplace', 
      desc: 'Crackling campfire embers synthesized dynamically', 
      icon: Flame, 
      type: 'ambient', 
      active: false, 
      volume: 0.5, 
      color: 'text-amber-500' 
    },
    { 
      id: 'drone', 
      name: 'Deep Space Drone', 
      desc: 'Warm analog lowpass sweep drone with slow LFO modulation', 
      icon: Moon, 
      type: 'ambient', 
      active: false, 
      volume: 0.4, 
      color: 'text-purple-400' 
    },

    // Solfeggio Healing & Abundance Frequencies
    { 
      id: 'hz432', 
      name: '432 Hz - Deep Peace & Comfort', 
      desc: 'Universal resonance, somatic harmony, and biological comfort & tranquility', 
      icon: Heart, 
      type: 'solfeggio', 
      active: false, 
      volume: 0.3, 
      color: 'text-teal-400', 
      freq: 432,
      affirmation: '🌱 My mind and cells are in perfect harmony. Deep peace, calm, and physical comfort flow through me.'
    },
    { 
      id: 'hz528', 
      name: '528 Hz - Wealth, Luck & Abundance', 
      desc: 'The miracle vibration for attracting money, financial breakthroughs, DNA repair, and incredible luck', 
      icon: Sparkles, 
      type: 'solfeggio', 
      active: false, 
      volume: 0.3, 
      color: 'text-yellow-400', 
      freq: 528,
      affirmation: '💰 Extreme luck, wealth, and limitless financial abundance gravitate to me. I make massive miracle breakthroughs.'
    },
    { 
      id: 'hz396', 
      name: '396 Hz - Deep Healing & Fear liberation', 
      desc: 'Somatic restoration, liberating subconscious guilt, releasing worry, and commencing true healing', 
      icon: Shield, 
      type: 'solfeggio', 
      active: false, 
      volume: 0.3, 
      color: 'text-amber-450', 
      freq: 396,
      affirmation: '🩹 I release all worry, pain, and fear. Deep emotional and physical healing flows through me right now.'
    },
    { 
      id: 'hz417', 
      name: '417 Hz - Pure Positivity & New Beginnings', 
      desc: 'Clears toxic negative energy, dissolves bad history, and commands radiant positive vibe changes', 
      icon: Sparkle, 
      type: 'solfeggio', 
      active: false, 
      volume: 0.3, 
      color: 'text-orange-400', 
      freq: 417,
      affirmation: '☀️ All negative blocks are washing away. I am filled with radiant positivity, clean energy, and bright new beginnings.'
    },
    { 
      id: 'hz285', 
      name: '285 Hz - Cellular Joy & Happiness', 
      desc: 'Resets the spiritual blueprint, generates pure joy, cells tissue rejuvenation, and happy aura vibes', 
      icon: Sun, 
      type: 'solfeggio', 
      active: false, 
      volume: 0.3, 
      color: 'text-rose-450', 
      freq: 285,
      affirmation: '🌸 Supreme happiness resides within me. I move through my day lightweight, cheerful, and filled with glowing joy!'
    },
    { 
      id: 'hz963', 
      name: '963 Hz - Being Limitless & Supreme Joy', 
      desc: 'Crown chakra catalyst for universal connection, divine spark, and absolute limitless state of mind', 
      icon: Zap, 
      type: 'solfeggio', 
      active: false, 
      volume: 0.3, 
      color: 'text-fuchsia-400', 
      freq: 963,
      affirmation: '🌌 My energy and spirit are completely limitless. I step into boundless joy, cosmic potential, and glorious abundance.'
    },
    { 
      id: 'hz741', 
      name: '741 Hz - Headache Dissolver & Mind Detox', 
      desc: 'Melts mental tension, dissolves headache pain, and purges electromagnetic overstimulation', 
      icon: Bell, 
      type: 'solfeggio', 
      active: false, 
      volume: 0.3, 
      color: 'text-emerald-400', 
      freq: 741,
      affirmation: '💎 All headache pressure and brain tension are melting away. My mind is quiet, detoxified, and crystal clear.'
    },
    { 
      id: 'hz852', 
      name: '852 Hz - Intuitive Love & Trust', 
      desc: 'Awakens higher intuition, spiritual order, self-trust, and deep emotional comfort', 
      icon: Compass, 
      type: 'solfeggio', 
      active: false, 
      volume: 0.3, 
      color: 'text-indigo-400', 
      freq: 852,
      affirmation: '👁️ I trust my quiet, strong inner intuition. I reside in perfect emotional comfort, self-love, and complete peace.'
    },
    { 
      id: 'hz144', 
      name: '144 Hz - Genius & Ultimate Intelligence', 
      desc: 'Alpha-Gamma neural tuner for supreme memory focus, cognitive speed, and smart peak productivity', 
      icon: Brain, 
      type: 'solfeggio', 
      active: false, 
      volume: 0.3, 
      color: 'text-sky-450', 
      freq: 144,
      affirmation: '🧠 My brain operates at its ultimate brilliance. I learn rapidly, recall clearly, and execute with genius focus.'
    },
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
    // Safety cap to prevent too loud audio on startup
    const baseVolume = channel.type === 'solfeggio' ? channel.volume * 0.35 : channel.volume;
    gainNode.gain.setValueAtTime(baseVolume, ctx.currentTime);
    gainNode.connect(ctx.destination);
    gainNodesRef.current[channelId] = gainNode;

    const activeNodes: Array<AudioNode> = [];

    if (channelId === 'rain') {
      // Rain Synthesizer: Lowpass filtered white noise
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx, 3);
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(750, ctx.currentTime);

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
        dropGain.gain.linearRampToValueAtTime(0.015 + Math.random() * 0.02, curCtx.currentTime + 0.01);
        dropGain.gain.exponentialRampToValueAtTime(0.0001, curCtx.currentTime + 0.15 + Math.random() * 0.2);

        dropOsc.connect(dropGain);
        dropGain.connect(gainNodesRef.current['rain']);
        dropOsc.start();
        dropOsc.stop(curCtx.currentTime + 0.5);
      };

      const intervalId = window.setInterval(() => {
        if (Math.random() < 0.70) triggerRaindrop();
      }, 150);
      rainCracklesIntervalRef.current = intervalId;

    } else if (channelId === 'fire') {
      // Fireplace Synthesizer: Bandpass filtered pink/white noise
      const noise = ctx.createBufferSource();
      noise.buffer = createNoiseBuffer(ctx, 2.5);
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(150, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

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
        crackleOsc.frequency.setValueAtTime(140 + Math.random() * 60, curCtx.currentTime);

        crackleGain.gain.setValueAtTime(0, curCtx.currentTime);
        crackleGain.gain.linearRampToValueAtTime(0.05, curCtx.currentTime + 0.005);
        crackleGain.gain.exponentialRampToValueAtTime(0.0001, curCtx.currentTime + 0.03);

        crackleOsc.connect(crackleGain);
        crackleGain.connect(gainNodesRef.current['fire']);
        crackleOsc.start();
        crackleOsc.stop(curCtx.currentTime + 0.08);
      };

      const intervalId = window.setInterval(() => {
        if (Math.random() < 0.28) triggerCrackle();
      }, 200);
      fireplaceIntervalRef.current = intervalId;

    } else if (channelId === 'drone') {
      // Space Drone: Deep modulated low harmonics + slow LFO resonance sweep
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(60, ctx.currentTime); // Deep B0 Note

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(60.4, ctx.currentTime); // Detune rumble

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(150, ctx.currentTime);

      // Slow sweeping LFO
      const lfo = ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.06, ctx.currentTime);

      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(60, ctx.currentTime); // filter drift depth

      lfo.connect(lfoGain);
      lfoGain.connect(lowpass.frequency);

      osc1.connect(lowpass);
      osc2.connect(lowpass);
      lowpass.connect(gainNode);

      lfo.start();
      osc1.start();
      osc2.start();
      activeNodes.push(osc1, osc2, lowpass, lfo, lfoGain);

    } else if (channelId.startsWith('hz')) {
      // SPECIALIZED SOLFEGGIO WAVE GENERATOR
      // Generates an ultra-pure, perfectly steady therapeutic sinus sound wave
      const mainFreq = channel.freq || 432;
      
      const wave1 = ctx.createOscillator();
      const bandFilter = ctx.createBiquadFilter();

      wave1.type = 'sine';
      wave1.frequency.setValueAtTime(mainFreq, ctx.currentTime);

      // Lowpass filter keeps pure fundamentals
      bandFilter.type = 'lowpass';
      bandFilter.frequency.setValueAtTime(mainFreq * 1.5, ctx.currentTime);

      wave1.connect(bandFilter);
      bandFilter.connect(gainNode);

      wave1.start();

      activeNodes.push(wave1, bandFilter);
    }

    sourcesRef.current[channelId] = activeNodes;
  };

  const stopSynth = (channelId: string) => {
    // Clear drop timers
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
          // Safety multiplier for pure solfeggio sinewaves
          const multiplier = c.type === 'solfeggio' ? 0.35 : 1.0;
          gainNode.gain.setValueAtTime(value * multiplier, audioCtxRef.current.currentTime);
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

          // Gong bell notification sound
          try {
            if (audioCtxRef.current) {
              const ctx = audioCtxRef.current;
              const bellOsc1 = ctx.createOscillator();
              const bellOsc2 = ctx.createOscillator();
              const bellGain = ctx.createGain();

              bellOsc1.type = 'sine';
              bellOsc1.frequency.setValueAtTime(440, ctx.currentTime);
              
              bellOsc2.type = 'triangle';
              bellOsc2.frequency.setValueAtTime(220, ctx.currentTime);

              bellGain.gain.setValueAtTime(0, ctx.currentTime);
              bellGain.gain.linearRampToValueAtTime(0.20, ctx.currentTime + 0.05);
              bellGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 2.0);

              bellOsc1.connect(bellGain);
              bellOsc2.connect(bellGain);
              bellGain.connect(ctx.destination);
              
              bellOsc1.start();
              bellOsc2.start();
              bellOsc1.stop(ctx.currentTime + 2.5);
              bellOsc2.stop(ctx.currentTime + 2.5);
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

  // Clean up synthesis oscillators on component unmount
  useEffect(() => {
    return () => {
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

  // Gather currently active solfeggio affirmations
  const activeAffirmations = channels
    .filter(c => c.active && c.type === 'solfeggio' && c.affirmation)
    .map(c => ({ id: c.id, text: c.affirmation, name: c.name, color: c.color }));

  // Separate channels by type
  const ambientChannels = channels.filter(c => c.type === 'ambient');
  const solfeggioChannels = channels.filter(c => c.type === 'solfeggio');

  return (
    <div id="soundscape-root" className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
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
          <h1 className="text-3xl font-bold text-white font-sans tracking-tight">Focus Chamber & Solfeggio Vibration Mixer</h1>
          <p className="text-slate-400 mt-1">
            Engineered with real-time browser DSP. Mix immersive nature soundscapes with raw well-being vibrational waves to unlock wealth consciousness, headache release, peace, and high intelligence.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Pomodoro Timer & Affirmation Mirror */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Pomodoro Card */}
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl flex flex-col items-center justify-center space-y-6 shadow-md relative overflow-hidden">
            <div className="text-center">
              <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isBreak ? 'bg-indigo-500/10 text-indigo-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                {isBreak ? '☕ Break Time' : '⚡ Flow Focus'}
              </span>
            </div>

            {/* Progress Dial */}
            <div className="relative w-44 h-44 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle 
                  cx="50" 
                  cy="50" 
                  r="44" 
                  className="stroke-slate-950 fill-none" 
                  strokeWidth="5" 
                />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="44" 
                  className={`fill-none transition-all duration-1000 ${isBreak ? 'stroke-indigo-500' : 'stroke-emerald-400'}`} 
                  strokeWidth="5" 
                  strokeDasharray="276"
                  strokeDashoffset={276 - (276 * progressPercent) / 100}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute text-center">
                <span className="text-3xl font-mono text-white font-black block">
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
                    ? 'bg-slate-800 hover:bg-slate-750 text-white border border-slate-700' 
                    : 'bg-white hover:bg-slate-100 text-slate-950 shadow-lg shadow-white/5'
                }`}
              >
                {isActive ? <><Pause className="w-4 h-4" /> Pause</> : <><Play className="w-4 h-4 text-emerald-500 fill-emerald-500" /> Start Session</>}
              </button>

              <button
                id="btn-pomodoro-reset"
                onClick={resetTimer}
                title="Reset session"
                className="p-3 bg-slate-950 hover:bg-slate-850 border border-slate-850 rounded-xl text-slate-400 hover:text-white transition cursor-pointer"
              >
                <RotateCcw className="w-5 h-5" />
              </button>
            </div>

            {/* Quick presets */}
            <div className="space-y-2 w-full pt-2 border-t border-slate-850">
              <div className="grid grid-cols-3 gap-1.5">
                <button 
                  onClick={() => setCustomMinutes(15)} 
                  className={`text-[11px] py-1.5 rounded-lg border text-center transition cursor-pointer font-semibold ${minutes === 15 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-950 hover:bg-slate-850 border-slate-850 text-slate-400'}`}
                >
                  15m Min
                </button>
                <button 
                  onClick={() => setCustomMinutes(25)} 
                  className={`text-[11px] py-1.5 rounded-lg border text-center transition cursor-pointer font-semibold ${minutes === 25 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-950 hover:bg-slate-850 border-slate-850 text-slate-400'}`}
                >
                  25m Pom
                </button>
                <button 
                  onClick={() => setCustomMinutes(45)} 
                  className={`text-[11px] py-1.5 rounded-lg border text-center transition cursor-pointer font-semibold ${minutes === 45 ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-slate-950 hover:bg-slate-850 border-slate-850 text-slate-400'}`}
                >
                  45m Deep
                </button>
              </div>
            </div>
          </div>

          {/* Abundance & Solfeggio Affirmation Mirror Card */}
          <div className="bg-gradient-to-b from-slate-900 to-indigo-950/20 border border-slate-850 p-6 rounded-3xl relative overflow-hidden shadow-md">
            <div className="absolute top-0 right-0 p-3 text-indigo-500/20">
              <Award className="w-24 h-24 stroke-[1]" />
            </div>

            <div className="relative z-10 space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-2.5 py-1 rounded-full inline-flex items-center gap-1.5">
                <Sparkle className="w-3.5 h-3.5 text-indigo-400 animate-spin" /> Vibrational Affirmation Mirror
              </span>
              <h3 className="text-sm font-bold text-white tracking-wide">Dynamic Subconscious Resonance</h3>
              
              {activeAffirmations.length === 0 ? (
                <p className="text-xs text-slate-450 leading-relaxed italic">
                  Turn on any Solfeggio Healing frequency on the right channel deck to project powerful manifestation codes on this subconscious mirror screen!
                </p>
              ) : (
                <div className="space-y-4 max-h-[220px] overflow-y-auto pr-1">
                  {activeAffirmations.map((aff) => (
                    <div 
                      key={aff.id} 
                      className="bg-slate-950/80 border border-slate-850/50 p-3.5 rounded-xl space-y-1.5 animate-in slide-in-from-left duration-300"
                    >
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${aff.color}`}>
                        {aff.name} Active
                      </span>
                      <p className="text-xs text-white leading-relaxed font-sans font-medium">
                        {aff.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Right Side: Multi-channel Synthesis Deck */}
        <div className="lg:col-span-8 space-y-6">
          
          <div className="bg-slate-900 border border-slate-800 p-6 rounded-3xl space-y-6 shadow-md">
            
            {/* Context overview */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <h2 className="text-lg font-black text-white tracking-tight flex items-center gap-2">
                  <Volume2 className="w-5 h-5 text-violet-400" /> Channel Mixer Deck
                </h2>
                <p className="text-xs text-slate-400 mt-1">Multi-channel browser soundscapes. Mix and play multiple waves together to map your target calm.</p>
              </div>
              <span className="text-[10px] uppercase font-bold tracking-widest bg-violet-500/10 text-violet-400 px-3 py-1 rounded-full border border-violet-500/20">
                DSP Node Synthesis
              </span>
            </div>

            {/* SECTION 1: Earth Soundscapes */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                🌿 Low-Key Natural Ambiance
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {ambientChannels.map((chan) => {
                  const IconComp = chan.icon;
                  return (
                    <div 
                      key={chan.id}
                      className={`bg-slate-950 border p-4 rounded-2xl flex flex-col justify-between gap-4 transition-all duration-300 ${
                        chan.active ? 'border-violet-500/40 shadow-lg shadow-violet-500/5' : 'border-slate-850'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={() => toggleChannel(chan.id)}
                            className={`p-2.5 rounded-xl transition cursor-pointer ${
                              chan.active ? 'bg-violet-500/15 text-violet-400 animate-pulse' : 'bg-slate-900 text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            <IconComp className="w-5 h-5" />
                          </button>
                          <div>
                            <span className={`text-sm font-bold block ${chan.active ? 'text-white' : 'text-slate-400'}`}>
                              {chan.name}
                            </span>
                          </div>
                        </div>

                        {/* Toggle Pill */}
                        <button 
                          onClick={() => toggleChannel(chan.id)}
                          className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded cursor-pointer ${
                            chan.active ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-900 text-slate-500 border border-transparent'
                          }`}
                        >
                          {chan.active ? 'Live' : 'Mute'}
                        </button>
                      </div>

                      {/* Description */}
                      <p className="text-[11px] text-slate-500 leading-normal line-clamp-2 min-h-[32px]">
                        {chan.desc}
                      </p>

                      {/* Slider volume control */}
                      <div className="flex items-center gap-2 pt-1 border-t border-slate-900">
                        <Volume2 className="w-3.5 h-3.5 text-slate-600" />
                        <input 
                          type="range" 
                          min="0" 
                          max="1" 
                          step="0.05"
                          disabled={!chan.active}
                          value={chan.volume} 
                          onChange={(e) => handleVolumeChange(chan.id, parseFloat(e.target.value))}
                          className="w-full accent-violet-400 bg-slate-900 rounded-lg cursor-pointer h-1 outline-none disabled:opacity-20"
                        />
                        <span className="text-[9px] font-mono font-bold text-slate-650 w-7 text-right text-slate-550">
                          {Math.round(chan.volume * 100)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SECTION 2: Solfeggio & Cosmic Abundance Vibration waves */}
            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5">
                🌌 Solfeggio Vibration Resonance Chamber
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {solfeggioChannels.map((chan) => {
                  const IconComp = chan.icon;
                  return (
                    <div 
                      key={chan.id}
                      className={`bg-slate-950 border p-4.5 rounded-2xl flex flex-col justify-between gap-3.5 transition-all duration-300 ${
                        chan.active ? 'border-amber-400/30 bg-slate-950/90 shadow-lg shadow-amber-405/5' : 'border-slate-850'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          <button
                            onClick={() => toggleChannel(chan.id)}
                            className={`p-3 rounded-xl transition cursor-pointer ${
                              chan.active ? 'bg-amber-450/15 text-amber-400 animate-pulse bg-amber-500/10' : 'bg-slate-900 text-slate-500 hover:text-slate-350'
                            }`}
                          >
                            <IconComp className="w-5 h-5" />
                          </button>
                          <div>
                            <span className={`text-sm font-bold block ${chan.active ? 'text-white' : 'text-slate-400'}`}>
                              {chan.name}
                            </span>
                            <span className="text-[9px] text-slate-500 font-mono">
                              Pure tuning • Oscillating sinusoids
                            </span>
                          </div>
                        </div>

                        {/* Status marker */}
                        <button 
                          onClick={() => toggleChannel(chan.id)}
                          className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded cursor-pointer ${
                            chan.active ? 'bg-amber-500/10 text-amber-400 border border-amber-550/20' : 'bg-slate-900 text-slate-500 border border-transparent'
                          }`}
                        >
                          {chan.active ? 'On' : 'Off'}
                        </button>
                      </div>

                      {/* Full description */}
                      <p className="text-[11px] text-slate-450 leading-relaxed font-sans">
                        {chan.desc}
                      </p>

                      {/* Separator & dynamic fine adjusting slider */}
                      <div className="flex items-center gap-2 pt-2 border-t border-slate-900">
                        <Volume2 className="w-3.5 h-3.5 text-slate-600" />
                        <input 
                          type="range" 
                          min="0" 
                          max="1" 
                          step="0.05"
                          disabled={!chan.active}
                          value={chan.volume} 
                          onChange={(e) => handleVolumeChange(chan.id, parseFloat(e.target.value))}
                          className="w-full accent-amber-400 bg-slate-900 rounded-lg cursor-pointer h-1 outline-none disabled:opacity-20"
                        />
                        <span className="text-[9px] font-mono font-bold w-7 text-right text-slate-550">
                          {Math.round(chan.volume * 100)}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Warning/Help notice */}
            <div className="bg-slate-950 border border-slate-850 p-4 rounded-2xl flex gap-3.5 text-xs text-slate-400 leading-relaxed">
              <HelpCircle className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-white">🎛️ Dynamic Dual-Layer Mix Architecture</p>
                <p className="mt-0.5 text-slate-450">
                  This mixer allows you to blend nature buffers together with deep frequency beats. Play <strong>Calm Forest Rain</strong> and turn on the <strong>528 Hz Abundance frequency</strong> to create a personalized, comforting rich-vibe workspace. Close your eyes, breathe, and let the mind re-sync.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
