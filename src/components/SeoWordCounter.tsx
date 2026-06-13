import React, { useState } from 'react';
import { Sigma, ArrowLeft, BarChart2, MessageSquare, Info, Star, Percent, RefreshCw } from 'lucide-react';

interface SeoWordCounterProps {
  onBack: () => void;
}

export default function SeoWordCounter({ onBack }: SeoWordCounterProps) {
  const [content, setContent] = useState('Google AI Studio is a fast prototyping environment for building with Gemini models in the browser.');

  // Live Calculations
  const cleanText = content.trim();
  const wordCount = cleanText === '' ? 0 : cleanText.split(/\s+/).length;
  const charWithSpaces = content.length;
  const charWithoutSpaces = content.replace(/\s+/g, '').length;
  const paragraphs = cleanText === '' ? 0 : cleanText.split(/\n+/).filter(p => p.trim() !== '').length;
  const sentences = cleanText === '' ? 0 : cleanText.split(/[.!?]+/).filter(s => s.trim() !== '').length;

  // Approximate Reading Time (assuming average 220 words per minute)
  const readingTimeSeconds = Math.ceil((wordCount / 220) * 60);
  const readingTimeString = readingTimeSeconds >= 60 
    ? `${Math.floor(readingTimeSeconds / 60)}m ${readingTimeSeconds % 60}s`
    : `${readingTimeSeconds} seconds`;

  // Calculating Keyword Densities (excluding common stop words)
  const computeDensities = () => {
    if (!cleanText) return [];
    
    const stopWords = new Set([
      'the', 'is', 'a', 'to', 'and', 'of', 'in', 'for', 'on', 'with', 'at', 'by', 'an', 'this', 'that', 'it', 'are', 'was', 'be', 'or', 'as', 'from', 'your', 'about', 'with', 'has'
    ]);

    const words = cleanText.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 1);
    const frequencies: Record<string, number> = {};

    words.forEach(word => {
      if (!stopWords.has(word)) {
        frequencies[word] = (frequencies[word] || 0) + 1;
      }
    });

    const totalWords = words.length || 1;
    return Object.entries(frequencies)
      .map(([word, count]) => ({
        word,
        count,
        density: Number(((count / totalWords) * 100).toFixed(1))
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8); // Top 8 words
  };

  const wordDensities = computeDensities();

  // Custom SEO Optimization Checks
  const seoChecks = [
    {
      title: "Title Length Optimization",
      status: charWithSpaces >= 30 && charWithSpaces <= 60 ? "perfect" : charWithSpaces > 60 ? "long" : "short",
      desc: "Optimal meta titles for search layouts should fall between 30 and 60 characters."
    },
    {
      title: "Content Value Richness",
      status: wordCount >= 300 ? "perfect" : wordCount >= 100 ? "medium" : "thin",
      desc: "Blog posts and core pages benefit from exceeding 300 words of rich topical value."
    },
    {
      title: "Readability & Sentence Layout",
      status: wordCount > 0 ? (sentences === 0 ? "thin" : (wordCount / sentences) <= 18 ? "perfect" : "long") : "thin",
      desc: "Keep sentence lengths average below 18 words to increase user readability ratings."
    }
  ];

  return (
    <div id="seo-counter-root" className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        id="btn-back-to-hub"
        onClick={onBack} 
        className="flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
        Back to Hub
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div className="p-4 bg-slate-800/80 border border-slate-700/50 rounded-2xl text-white w-fit shadow-md">
          <Sigma className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white font-sans tracking-tight">SEO Word & Density Counter</h1>
          <p className="text-slate-400 mt-1">Live analysis of structural word frequencies, character lengths, and SEO performance metrics.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Input Box */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <label htmlFor="seo-content-input" className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Live Copy Editor</label>
              <button 
                onClick={() => setContent('')}
                className="text-xs text-slate-500 hover:text-white cursor-pointer transition-colors"
              >
                Clear All
              </button>
            </div>
            
            <textarea 
              id="seo-content-input"
              rows={12}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white text-base leading-relaxed focus:ring-2 focus:ring-slate-500 outline-none resize-none transition-all placeholder-slate-650 font-sans"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start typing/pasting your content here for a comprehensive SEO layout and density report..."
            />
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-xl shadow-inner text-center">
              <span className="text-2xl font-bold text-white block font-mono">{wordCount}</span>
              <span className="text-[10px] uppercase font-semibold text-slate-500">Words</span>
            </div>
            <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-xl shadow-inner text-center">
              <span className="text-2xl font-bold text-white block font-mono">{charWithSpaces}</span>
              <span className="text-[10px] uppercase font-semibold text-slate-500">Chars (Spaces)</span>
            </div>
            <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-xl shadow-inner text-center">
              <span className="text-2xl font-bold text-white block font-mono">{charWithoutSpaces}</span>
              <span className="text-[10px] uppercase font-semibold text-slate-500">Chars (No space)</span>
            </div>
            <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-xl shadow-inner text-center">
              <span className="text-[10px] sm:text-base font-bold text-white block font-mono leading-tight">{readingTimeString}</span>
              <span className="text-[10px] uppercase font-semibold text-slate-500">Reading Time</span>
            </div>
          </div>
        </div>

        {/* Right Column: Density & Auditing Panels */}
        <div className="lg:col-span-5 space-y-6">
          {/* Frequencies Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-350 uppercase tracking-wider flex items-center gap-2">
              <Percent className="w-4 h-4 text-emerald-400" /> Topical Density Map
            </h3>

            <div className="space-y-3.5 pt-2">
              {wordDensities.length > 0 ? (
                wordDensities.map((item, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-300 font-medium font-sans">{item.word}</span>
                      <span className="text-slate-500 font-mono">
                        {item.count}x ({item.density}%)
                      </span>
                    </div>
                    {/* Visual Meter */}
                    <div className="w-full h-1.5 bg-slate-950 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-500 h-full rounded-full transition-all duration-500" 
                        style={{ width: `${Math.min(item.density * 5, 100)}%` }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500 italic text-center py-6">Enter copy on the left to map density keywords.</p>
              )}
            </div>
          </div>

          {/* Audit Checklist */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-350 uppercase tracking-wider flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-emerald-400" /> Structure Health Audit
            </h3>

            <div className="space-y-4 pt-1">
              {seoChecks.map((check, idx) => {
                const isPerfect = check.status === 'perfect';
                const isWarning = check.status === 'long' || check.status === 'short' || check.status === 'medium';
                return (
                  <div key={idx} className="bg-slate-950/40 border border-slate-850 p-4 rounded-xl flex items-start gap-3">
                    <div className="mt-0.5">
                      {isPerfect ? (
                        <div className="w-3.5 h-3.5 rounded-full bg-emerald-500 border border-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                      ) : isWarning ? (
                        <div className="w-3.5 h-3.5 rounded-full bg-yellow-500 border border-yellow-400 shadow-[0_0_8px_rgba(234,179,8,0.3)]" />
                      ) : (
                        <div className="w-3.5 h-3.5 rounded-full bg-slate-700" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{check.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{check.desc}</p>
                      
                      {/* Live Badge */}
                      <span className={`inline-block text-[9px] font-mono font-bold uppercase tracking-widest px-2 py-0.5 rounded mt-2 ${
                        isPerfect 
                          ? 'bg-emerald-500/10 text-emerald-400' 
                          : isWarning 
                            ? 'bg-yellow-500/10 text-yellow-500' 
                            : 'bg-slate-800 text-slate-500'
                      }`}>
                        Current Status: {check.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
