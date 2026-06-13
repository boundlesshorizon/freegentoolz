import React, { useState } from 'react';
import { Dices, Activity, ChevronRight, ArrowLeft, Sparkles, Copy, RefreshCw, Layers } from 'lucide-react';
import { LottoResult } from '../types';

const LOTTO_DATABASES = {
  USA: ['Powerball (5/69 + 1/26)', 'Mega Millions (5/70 + 1/25)'],
  Canada: ['Lotto Max (7/50)', 'Lotto 6/49 (6/49)'],
  Australia: ['Oz Lotto (7/47)', 'Powerball (7/35 + 1/20)'],
  Philippines: ['PCSO Ultra 6/58', 'PCSO Grand 6/55', 'PCSO Super 6/49']
};

interface LottoAnalyzerProps {
  onBack: () => void;
}

export default function LottoAnalyzer({ onBack }: LottoAnalyzerProps) {
  const [country, setCountry] = useState<keyof typeof LOTTO_DATABASES>('USA');
  const [game, setGame] = useState(LOTTO_DATABASES['USA'][0]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<LottoResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    setErrorMessage('');
    try {
      const response = await fetch('/api/lotto/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ country, game })
      });
      if (!response.ok) {
        throw new Error('Our AI models are temporarily busy. Please try again.');
      }
      const data = await response.json();
      setResults(data);
    } catch (err: any) {
      setErrorMessage(err.toString());
    } finally {
      setIsAnalyzing(false);
    }
  };

  const copyTicket = (numbers: string[], index: number) => {
    const formatted = numbers.join(', ');
    navigator.clipboard.writeText(formatted);
    setCopiedIndex(index);
    setTimeout(() => {
      setCopiedIndex(null);
    }, 2000);
  };

  return (
    <div id="lotto-analyzer-root" className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        id="btn-back-to-hub"
        onClick={onBack} 
        className="flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
        Back to Hub
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400 w-fit">
          <Dices className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white font-sans tracking-tight">Global Lotto AI Analyzer</h1>
          <p className="text-slate-400 mt-1">Data-driven frequency distribution and neural combination predictor for international draws.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 lg:col-span-4 h-fit">
          <h3 className="text-lg font-semibold text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-emerald-400" /> Specify Universe
          </h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="country-selector" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Region / Country</label>
              <select 
                id="country-selector"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={country}
                onChange={(e) => {
                  const val = e.target.value as keyof typeof LOTTO_DATABASES;
                  setCountry(val);
                  setGame(LOTTO_DATABASES[val][0]);
                }}
              >
                {Object.keys(LOTTO_DATABASES).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label htmlFor="game-selector" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Active Lottery Pool</label>
              <select 
                id="game-selector"
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                value={game}
                onChange={(e) => setGame(e.target.value)}
              >
                {LOTTO_DATABASES[country].map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
          </div>

          <button 
            id="btn-run-analyzer"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
            className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-emerald-500/10"
          >
            {isAnalyzing ? (
              <><Activity className="w-5 h-5 animate-spin" /> Processing Neural Data...</>
            ) : (
              <><Sparkles className="w-5 h-5" /> Calculate Combinations</>
            )}
          </button>

          {errorMessage && (
            <div className="bg-red-950/40 border border-red-500/30 rounded-xl p-4 text-red-300 text-sm">
              {errorMessage}
            </div>
          )}
        </div>

        {/* Results */}
        <div className="lg:col-span-8 space-y-6">
          {isAnalyzing ? (
            <div className="h-full min-h-[350px] border border-slate-800 rounded-2xl bg-slate-900/40 flex flex-col items-center justify-center text-emerald-400/80 space-y-4 p-8 text-center">
              <RefreshCw className="w-12 h-12 animate-spin text-emerald-400 mb-2" />
              <p className="font-mono text-sm tracking-widest uppercase">Calculating distribution curves...</p>
              <p className="text-xs text-slate-500 max-w-sm">
                Gemini is analyzing the game format, computing 3:2 odd/even parity ratios, and generating optimal bell curve range metrics.
              </p>
            </div>
          ) : results ? (
            <div className="space-y-6">
              {/* Analysis Box */}
              <div className="bg-indigo-950/20 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-indigo-500"></div>
                <h3 className="text-lg font-bold text-indigo-300 mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-indigo-400" /> Generative Statistical Analysis
                </h3>
                <p className="text-slate-300 leading-relaxed font-sans text-sm sm:text-base">
                  {results.analysis}
                </p>
              </div>

              {/* Tickets */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Recommended Tickets</h4>
                {results.combinations.map((combo, idx) => (
                  <div 
                    key={idx} 
                    className="bg-slate-900/60 border border-slate-850 hover:border-emerald-500/40 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 transition-all group shadow-sm hover:shadow-emerald-500/5"
                  >
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-slate-500 font-mono text-xs w-8">#{idx + 1}</span>
                      {combo.map((num, nIdx) => {
                        const isSpecialBall = num.startsWith('PB:') || num.startsWith('MB:') || num.includes(':');
                        return (
                          <span 
                            key={nIdx} 
                            className={`min-w-10 h-10 px-2 flex items-center justify-center rounded-full font-bold text-sm shadow-inner transition-transform group-hover:scale-105 duration-300 ${
                              isSpecialBall 
                                ? 'bg-gradient-to-br from-emerald-500 to-indigo-600 text-white rounded-lg px-3' 
                                : 'bg-slate-800 border border-slate-700 text-white'
                            }`}
                          >
                            {num}
                          </span>
                        );
                      })}
                    </div>
                    <button 
                      onClick={() => copyTicket(combo, idx)}
                      className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-slate-800 border border-slate-700 font-medium cursor-pointer flex items-center gap-1 hover:bg-slate-700 transition"
                    >
                      {copiedIndex === idx ? 'Copied' : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-full min-h-[350px] border border-slate-850 border-dashed rounded-2xl bg-slate-900/20 flex flex-col items-center justify-center text-slate-500 p-8 text-center">
              <Dices className="w-14 h-14 mb-4 text-slate-700 animate-pulse" />
              <h3 className="text-lg font-medium text-slate-400 mb-1">Frequency Matrix Idle</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Choose a regional pool on the left side and compute combinations to generate optimal numbers aligned with statistical probability rules.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
