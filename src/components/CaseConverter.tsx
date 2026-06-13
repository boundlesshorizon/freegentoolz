import React, { useState } from 'react';
import { CaseSensitive, ArrowLeft, Copy, Check, FileText } from 'lucide-react';

interface CaseConverterProps {
  onBack: () => void;
}

export default function CaseConverter({ onBack }: CaseConverterProps) {
  const [content, setContent] = useState('DESIGN SYSTEMS ARE THE BEDROCK OF COHESIVE PRODUCTS.');
  const [copied, setCopied] = useState(false);

  // Conversions
  const handleUpper = () => {
    setContent(content.toUpperCase());
  };

  const handleLower = () => {
    setContent(content.toLowerCase());
  };

  const handleTitle = () => {
    const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|of|on|or|the|to|v\.?|via|vs\.?)$/i;
    const words = content.toLowerCase().split(/\s+/);
    
    const titleCased = words.map((word, index) => {
      if (index > 0 && word.search(smallWords) > -1) {
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    }).join(' ');

    setContent(titleCased);
  };

  const handleSentence = () => {
    if (!content) return;
    const sentences = content.toLowerCase().split(/([.!?]\s*)/);
    const sentenceCased = sentences.map((part) => {
      // If it is just punctuation/space, return as is
      if (/^[.!?]\s*$/.test(part)) return part;
      // Capitalize first letter of sentence content
      return part.charAt(0).toUpperCase() + part.slice(1);
    }).join('');

    setContent(sentenceCased);
  };

  const handleInvert = () => {
    const chars = content.split('').map(char => {
      if (char === char.toUpperCase()) return char.toLowerCase();
      return char.toUpperCase();
    }).join('');
    setContent(chars);
  };

  const handleSarcastic = () => {
    const chars = content.split('').map((char, index) => {
      return index % 2 === 0 ? char.toLowerCase() : char.toUpperCase();
    }).join('');
    setContent(chars);
  };

  const handleCopy = () => {
    if (!content) return;
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div id="case-converter-root" className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
          <CaseSensitive className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white font-sans tracking-tight">Smart Case Converter</h1>
          <p className="text-slate-400 mt-1">Convert text instantly to UPPER, lower, Sentence, Title, or Inverted cases in single taps.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input & Output Area */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-center text-xs">
            <span className="font-semibold text-slate-450 uppercase tracking-wider flex items-center gap-1.5 font-mono">
              <FileText className="w-4 h-4 text-emerald-450" /> Live Editor Workspace
            </span>
            <span className="text-slate-550 font-mono">
              {content.length} characters | {content.trim() === '' ? 0 : content.trim().split(/\s+/).length} words
            </span>
          </div>

          <textarea 
            rows={10}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-white text-base leading-relaxed focus:ring-2 focus:ring-slate-505 outline-none resize-none transition-all placeholder-slate-650"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Type or paste any text block you want formatted..."
          />

          <div className="flex justify-end gap-3 pt-2">
            <button 
              onClick={() => setContent('')}
              className="text-xs text-slate-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-slate-800 transition"
            >
              Clear Workspace
            </button>
            <button 
              onClick={handleCopy}
              disabled={!content}
              className="bg-emerald-500 hover:bg-emerald-405 active:scale-[0.98] text-slate-950 px-4 py-2 text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer transition-all disabled:opacity-40"
            >
              {copied ? <><Check className="w-3.5 h-3.5" /> Copied!</> : <><Copy className="w-3.5 h-3.5" /> Copy String</>}
            </button>
          </div>
        </div>

        {/* Action Controls Panel */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit space-y-5">
          <div className="border-b border-slate-850 pb-3">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest font-mono">Conversion Deck</h3>
            <p className="text-xs text-slate-500 mt-1">Transform the casing layout of your workspace block inside these presets.</p>
          </div>

          <div className="space-y-3 pt-1">
            <button 
              onClick={handleUpper}
              className="w-full bg-slate-950 hover:bg-slate-850 border border-slate-850 text-white font-semibold py-3 px-4 rounded-xl text-xs cursor-pointer text-left transition flex justify-between items-center"
            >
              <span>UPPERCASE PRES-L</span>
              <span className="font-mono text-slate-550 text-[10px]">ALL LETTERS SMALL NO</span>
            </button>

            <button 
              onClick={handleLower}
              className="w-full bg-slate-950 hover:bg-slate-850 border border-slate-850 text-white font-semibold py-3 px-4 rounded-xl text-xs cursor-pointer text-left transition flex justify-between items-center"
            >
              <span>lowercase text</span>
              <span className="font-mono text-slate-550 text-[10px]">all letters capitalized no</span>
            </button>

            <button 
              onClick={handleSentence}
              className="w-full bg-slate-950 hover:bg-slate-850 border border-slate-850 text-white font-semibold py-3 px-4 rounded-xl text-xs cursor-pointer text-left transition flex justify-between items-center"
            >
              <span>Sentence case.</span>
              <span className="font-mono text-slate-550 text-[10px]">First letter capitalized.</span>
            </button>

            <button 
              onClick={handleTitle}
              className="w-full bg-slate-950 hover:bg-slate-850 border border-slate-850 text-white font-semibold py-3 px-4 rounded-xl text-xs cursor-pointer text-left transition flex justify-between items-center"
            >
              <span>Title Case Style</span>
              <span className="font-mono text-slate-550 text-[10px]">Major Words Capitalized</span>
            </button>

            <button 
              onClick={handleInvert}
              className="w-full bg-slate-950 hover:bg-slate-850 border border-slate-850 text-white font-semibold py-3 px-4 rounded-xl text-xs cursor-pointer text-left transition flex justify-between items-center"
            >
              <span>iNVERT cASE</span>
              <span className="font-mono text-slate-550 text-[10px]">uPpEr AnD lOwEr SwAp</span>
            </button>

            <button 
              onClick={handleSarcastic}
              className="w-full bg-slate-950 hover:bg-slate-850 border border-slate-850 text-white font-semibold py-3 px-4 rounded-xl text-xs cursor-pointer text-left transition flex justify-between items-center"
            >
              <span>sArCaStIc CaSe</span>
              <span className="font-mono text-slate-550 text-[10px]">aLtErNaTiNg ChArAcTeRs</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
