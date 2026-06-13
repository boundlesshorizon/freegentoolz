import React, { useState } from 'react';
import { Type, Sparkles, Activity, Copy, ArrowLeft, Search, Check, Send, Smartphone } from 'lucide-react';
import { generateFancyTexts, StyleItem } from '../utils/unicodeUtils';
import { StylistResult } from '../types';

interface BrandStylistProps {
  onBack: () => void;
}

export default function BrandStylist({ onBack }: BrandStylistProps) {
  const [text, setText] = useState('Build empires daily.');
  const [search, setSearch] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [aiAdvice, setAiAdvice] = useState<StylistResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedId, setCopiedId] = useState<string | number | null>(null);

  const generatedTexts = generateFancyTexts(text);
  
  // Filter the 200+ results
  const filteredTexts = generatedTexts.filter(item => 
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  const handleAiAdvice = async () => {
    if (!text.trim()) return;
    setIsThinking(true);
    setErrorMessage('');
    try {
      const response = await fetch('/api/stylist/hooks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rawText: text })
      });
      if (!response.ok) {
        let errText = '';
        try {
          const errJson = await response.json();
          errText = errJson.error || errJson.message || '';
        } catch (_) {}
        throw new Error(`Our copywriters are writing elsewhere (Server Error ${response.status}${errText ? ': ' + errText : ''}). Please retry.`);
      }
      const data = await response.json();
      setAiAdvice(data);
    } catch (err: any) {
      setErrorMessage(err.toString());
    } finally {
      setIsThinking(false);
    }
  };

  const copyToClipboard = (textToCopy: string, id: string | number) => {
    navigator.clipboard.writeText(textToCopy);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  return (
    <div id="brand-stylist-root" className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        id="btn-back-to-hub"
        onClick={onBack} 
        className="flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
        Back to Hub
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div className="p-4 bg-cyan-500/10 rounded-2xl text-cyan-400 w-fit">
          <Type className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white font-sans tracking-tight">200+ Brand & Copy Stylist</h1>
          <p className="text-slate-400 mt-1">Convert text into standard aesthetic Unicode variations and deploy real Gemini copy optimizations.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Inputs & AI Hub */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="text-base font-bold text-white uppercase tracking-wider mb-2">Original Copy input</h3>
            <textarea 
              rows={4}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white focus:ring-2 focus:ring-cyan-500 outline-none resize-none text-base font-medium placeholder-slate-600 transition-all focus:border-cyan-500/50"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type or paste your tagline here..."
            />
            
            <button 
              id="btn-get-social-hooks"
              onClick={handleAiAdvice}
              disabled={isThinking || !text.trim()}
              className="w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-indigo-500/10"
            >
              {isThinking ? (
                <><Activity className="w-5 h-5 animate-spin" /> Synthesizing Hooks...</>
              ) : (
                <><Sparkles className="w-5 h-5 text-cyan-300" /> Synthesize Viral Hooks</>
              )}
            </button>

            {errorMessage && (
              <p className="text-xs text-red-400 font-medium text-center">{errorMessage}</p>
            )}
          </div>

          {/* AI Advice Block */}
          {(isThinking || aiAdvice) && (
            <div className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden space-y-4 shadow-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 to-cyan-400"></div>
              <h3 className="font-bold text-indigo-400 flex items-center gap-2 text-sm uppercase tracking-widest">
                <Smartphone className="w-5 h-5 text-indigo-400" /> AI Social Hooks Channel Feed
              </h3>

              {isThinking ? (
                <div className="space-y-4 py-3">
                  <div className="h-4 bg-slate-800 rounded w-11/12 animate-pulse"></div>
                  <div className="h-4 bg-slate-800 rounded w-5/6 animate-pulse"></div>
                  <div className="h-4 bg-slate-800 rounded w-3/4 animate-pulse"></div>
                </div>
              ) : aiAdvice ? (
                <div className="space-y-4">
                  {/* TikTok */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 group relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-500 tracking-wider font-mono">TikTok / Reels Hook</span>
                      <button 
                        onClick={() => copyToClipboard(aiAdvice.tiktok, 'tiktok')}
                        className="text-[11px] text-indigo-400 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === 'tiktok' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                      </button>
                    </div>
                    <p className="text-white text-sm whitespace-pre-wrap leading-relaxed">{aiAdvice.tiktok}</p>
                  </div>

                  {/* Instagram */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 group relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-500 tracking-wider font-mono">Instagram Feed Story</span>
                      <button 
                        onClick={() => copyToClipboard(aiAdvice.instagram, 'instagram')}
                        className="text-[11px] text-indigo-400 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === 'instagram' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                      </button>
                    </div>
                    <p className="text-white text-sm whitespace-pre-wrap leading-relaxed">{aiAdvice.instagram}</p>
                  </div>

                  {/* YouTube */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 group relative">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-bold text-slate-500 tracking-wider font-mono">YouTube High-Retention Hook</span>
                      <button 
                        onClick={() => copyToClipboard(aiAdvice.youtube, 'youtube')}
                        className="text-[11px] text-indigo-400 hover:text-white flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === 'youtube' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <><Copy className="w-3.5 h-3.5" /> Copy</>}
                      </button>
                    </div>
                    <p className="text-white text-sm whitespace-pre-wrap leading-relaxed">{aiAdvice.youtube}</p>
                  </div>
                </div>
              ) : null}
            </div>
          )}
        </div>

        {/* Right Column: 200+ Stylist Grid */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col h-[750px] shadow-sm">
          <div className="sticky top-0 bg-slate-900 pb-4 z-10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <h3 className="text-sm font-semibold text-slate-300">
                Instant Unicode Conversions ({filteredTexts.length} styles shown)
              </h3>
              <span className="text-[10px] uppercase font-bold tracking-wider bg-cyan-500/10 text-cyan-400 px-2 py-1 rounded">
                Realtime rendering
              </span>
            </div>

            {/* Search filter */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-550 absolute left-3 top-3.5" />
              <input 
                type="text" 
                placeholder="Search styled fonts, decorators, brackets..." 
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-all font-sans"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Results list */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
            {filteredTexts.length > 0 ? (
              filteredTexts.map((item, idx) => (
                <div 
                  key={idx} 
                  className="bg-slate-950 border border-slate-850 hover:border-slate-700/50 p-4 rounded-xl flex justify-between items-center group transition-colors shadow-sm"
                >
                  <div className="overflow-hidden pr-4 leading-relaxed">
                    <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">{item.name}</p>
                    <p className="text-white text-base truncate font-normal mt-1">{item.text || '...'}</p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(item.text, idx)}
                    className="flex-shrink-0 text-slate-400 hover:text-white p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-650 cursor-pointer transition-colors"
                    title="Copy styled content"
                  >
                    {copiedId === idx ? (
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              ))
            ) : (
              <div className="h-64 flex flex-col items-center justify-center text-slate-600">
                <Type className="w-10 h-10 mb-2 opacity-30" />
                <p className="text-sm">No style combinations match your query.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
