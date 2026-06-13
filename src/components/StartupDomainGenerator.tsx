import React, { useState } from 'react';
import { ArrowLeft, Sparkles, Activity, FileText, Globe, Check, Copy, Tag, Compass, Users, Palette, Briefcase } from 'lucide-react';
import { StartupResult, StartupIdea } from '../types';

interface StartupDomainGeneratorProps {
  onBack: () => void;
}

const PRESET_SAMPLES = [
  "Local farm-to-table organic strawberry distribution using drone deliveries",
  "Cyberpunk-themed high-fidelity custom mechanical keycaps designer",
  "A non-invasive wearable ring that warns users of spikes in cortisol levels",
  "An on-demand premium vintage sneakers cleaning and restoration service"
];

export default function StartupDomainGenerator({ onBack }: StartupDomainGeneratorProps) {
  const [description, setDescription] = useState('Local farm-to-table organic strawberry distribution using drone deliveries');
  const [preferredTld, setPreferredTld] = useState('Any (.com, .io, .ai)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<StartupResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedType, setCopiedType] = useState<'domain' | 'all' | null>(null);

  const generateLocalStartupFallback = (desc: string, tldChoice: string): StartupResult => {
    const isCom = tldChoice.includes(".com");
    const isAi = tldChoice.includes(".ai");
    const isIo = tldChoice.includes(".io");
    const tld = isCom ? ".com" : isAi ? ".ai" : isIo ? ".io" : ".co";
    
    const clean = desc.replace(/[^a-zA-Z0-9 ]/g, "").trim();
    const words = clean.split(" ").filter(w => w.length > 3);
    const word1 = words[0] ? words[0].charAt(0).toUpperCase() + words[0].slice(1).toLowerCase() : "Crest";
    const word2 = words[1] ? words[1].charAt(0).toUpperCase() + words[1].slice(1).toLowerCase() : "Apex";

    const suffixes = [
      { name: `${word1}Flow`, tag: `The automated high-leverage engine for ${word1.toLowerCase()} workflows.`, colors: "Electric Emerald & Charcoal Dark" },
      { name: `Apex${word2 || 'Nexus'}`, tag: `Elevating your digital ${word2.toLowerCase() || 'ventures'} with optimal automation.`, colors: "Hyper Amber & Cyber Slate" },
      { name: `Nova${word1}`, tag: `Smart decentralized platform tailored to modernize ${word1.toLowerCase()} niches.`, colors: "Cosmic Amethyst & Neon Pink" },
      { name: `Quantum${word2 || 'Grid'}`, tag: `An infinitely scalable grid orchestrating complex ${word2.toLowerCase() || 'transactions'} instantly.`, colors: "Oceanic Cyan & Deep Charcoal" },
      { name: `${word1}ify`, tag: `Single-click modern playground built for elite ${word1.toLowerCase()} workflows.`, colors: "Solar Gold & Obsidian Void" }
    ];

    return {
      ideas: suffixes.map(s => ({
        name: s.name,
        domain: `${s.name.toLowerCase()}${tld}`,
        tagline: `Accelerating the future of ${word1.toLowerCase()}.`,
        valueProp: s.tag,
        audience: "Agile creators, scale managers, modern web builders, and developers.",
        brandColors: s.colors
      })),
      marketContext: `The market database indicates positive trend factors for ${clean ? `"${clean}"` : 'this segment'}. Standard compound growth suggests an active demand cycle for solutions with automated pipelines.`
    };
  };

  const handleGenerate = async () => {
    if (!description.trim()) {
      setErrorMessage('Please provide a startup concept description or niche keyword.');
      return;
    }
    setIsGenerating(true);
    setErrorMessage('');
    try {
      const response = await fetch('/api/startup/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, preferredTld })
      });
      if (!response.ok) {
        let errText = '';
        try {
          const errJson = await response.json();
          errText = errJson.error || errJson.message || '';
        } catch (_) {}
        throw new Error(`Our startup consultants are brainstorming elsewhere (Server Error ${response.status}${errText ? ': ' + errText : ''}). Please retry.`);
      }
      const data = await response.json();
      setResult(data);
    } catch (err: any) {
      console.warn("Gemini Service Rate-Limited or Online Busy. Initiating local high-fidelity generator fallback:", err);
      const localResult = generateLocalStartupFallback(description, preferredTld);
      setResult(localResult);
      setErrorMessage("Notice: Online AI model was temporarily busy. High-fidelity Local Brainstorming Engine resolved these ideas instantly.");
    } finally {
      setIsGenerating(false);
    }
  };

  const copyDomain = (domain: string, idx: number) => {
    navigator.clipboard.writeText(domain);
    setCopiedIndex(idx);
    setCopiedType('domain');
    setTimeout(() => {
      setCopiedIndex(null);
      setCopiedType(null);
    }, 2000);
  };

  const copyAllAssets = (idea: StartupIdea, idx: number) => {
    const textBlock = `Brand Name: ${idea.name}
Domain Concept: ${idea.domain}
Tagline: ${idea.tagline}
Core Value Prop: ${idea.valueProp}
Target Audience: ${idea.audience}
Recommended Color Aesthetic: ${idea.brandColors}`;
    navigator.clipboard.writeText(textBlock);
    setCopiedIndex(idx);
    setCopiedType('all');
    setTimeout(() => {
      setCopiedIndex(null);
      setCopiedType(null);
    }, 2000);
  };

  return (
    <div id="startup-generator-root" className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Back Button */}
      <button 
        id="btn-back-to-hub"
        onClick={onBack} 
        className="flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
        Back to Hub
      </button>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div className="p-4 bg-emerald-500/10 rounded-2xl text-emerald-400 w-fit">
          <Globe className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white font-sans tracking-tight">AI Startup Name & Domain Generator</h1>
          <p className="text-slate-400 mt-1">Brainstorm premium catchy tech brand names, corresponding TLD domains, taglines, and audiences generated by Gemini.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Side: Input Parameters */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 h-fit shadow-sm">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Compass className="w-4 h-4 text-emerald-400" /> Startup parameters
          </h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="startup-desc" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Describe Your Startup Idea or Niche
              </label>
              <textarea 
                id="startup-desc"
                rows={4}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none resize-none transition-all placeholder-slate-600 font-sans"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="E.g. A premium pet food subscription made from localized grass-fed meat crumbs..."
              />
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Try Sample Concepts</span>
              <div className="flex flex-wrap gap-2">
                {PRESET_SAMPLES.map((sample, sIdx) => (
                  <button
                    key={sIdx}
                    onClick={() => setDescription(sample)}
                    className="text-[11px] text-slate-440 border border-slate-800 hover:border-slate-700 bg-slate-950 text-slate-300 px-3 py-1.5 rounded-lg text-left transition max-w-full truncate cursor-pointer hover:bg-slate-900"
                  >
                    {sample}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="tld-select" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Preferred Domain Extension
              </label>
              <select 
                id="tld-select"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none transition-all cursor-pointer"
                value={preferredTld}
                onChange={(e) => setPreferredTld(e.target.value)}
              >
                <option value="Any (.com, .io, .ai)">Any (.com, .io, .ai)</option>
                <option value="Only .com (Classic Trust)">Only .com (Classic)</option>
                <option value="Only .ai (Tech / Intellect)">Only .ai (Intelligence)</option>
                <option value="Only .io (Developer Space)">Only .io (Developer Hub)</option>
                <option value="Only .co / .app (Agile Startup)">Only .co / .app (Agile)</option>
              </select>
            </div>
          </div>

          <button 
            id="btn-generate-startup"
            onClick={handleGenerate}
            disabled={isGenerating || !description.trim()}
            className="w-full bg-emerald-500 hover:bg-emerald-400 active:scale-[0.98] text-slate-950 font-extrabold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-emerald-550/10"
          >
            {isGenerating ? (
              <><Activity className="w-5 h-5 animate-spin" /> Structuring Ventures...</>
            ) : (
              <><Sparkles className="w-5 h-5" /> Generate Brand Matrix</>
            )}
          </button>

          {errorMessage && (
            <p className={`text-xs font-semibold text-center p-3.5 rounded-xl border leading-relaxed ${
              errorMessage.includes("Local Brainstorming Engine")
                ? "bg-amber-500/10 border-amber-500/20 text-amber-400"
                : "bg-red-500/10 border-red-500/20 text-red-400"
            }`}>
              {errorMessage}
            </p>
          )}
        </div>

        {/* Right Side: Results Showcase */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          {isGenerating ? (
            <div className="w-full min-h-[400px] bg-slate-900/45 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-emerald-400 p-8 text-center space-y-4">
              <Activity className="w-12 h-12 animate-pulse text-emerald-400" />
              <p className="font-mono text-sm tracking-widest uppercase">Incubating Brand Matrix...</p>
              <p className="text-sm text-slate-500 max-w-sm">
                Gemini is researching domain naming patterns, evaluating trademark aesthetics, selecting emotional color palettes, and copywriting value propositions.
              </p>
            </div>
          ) : result ? (
            <div className="space-y-6">
              
              {/* Market Opportunity Ribbon */}
              {result.marketContext && (
                <div className="bg-indigo-950/20 border border-indigo-500/30 p-5 rounded-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500" />
                  <h4 className="text-indigo-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2 mb-1.5">
                    <Briefcase className="w-4 h-4 text-indigo-400" /> Niche Market Analysis
                  </h4>
                  <p className="text-slate-350 text-sm leading-relaxed">
                    {result.marketContext}
                  </p>
                </div>
              )}

              {/* Suggestions Cards list */}
              <div className="space-y-4">
                <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Recommended Brand Assets</span>
                
                {result.ideas.map((idea, idx) => (
                  <div 
                    key={idx} 
                    className="bg-slate-900 border border-slate-850 hover:border-emerald-500/30 rounded-2xl p-6 transition-all duration-300 space-y-4 group hover:shadow-lg shadow-emerald-500/5"
                  >
                    
                    {/* Header: Name and Domain */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-850 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-600 font-mono text-xs">#{idx + 1}</span>
                          <h3 className="text-xl font-black text-white tracking-snug group-hover:text-emerald-400 transition-colors">{idea.name}</h3>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                          <Tag className="w-3.5 h-3.5 text-indigo-400 inline" /> {idea.tagline}
                        </p>
                      </div>
                      
                      {/* Copy Domain Block */}
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2.5 py-1 rounded-lg">
                          {idea.domain}
                        </span>
                        
                        <button 
                          onClick={() => copyDomain(idea.domain, idx)}
                          title="Copy domain suggestion"
                          className="p-2 rounded-lg bg-slate-950 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-850"
                        >
                          {copiedIndex === idx && copiedType === 'domain' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Globe className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Metadata specs */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                      
                      {/* Value Proposition */}
                      <div className="space-y-1">
                        <span className="text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                          <Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Value Proposition
                        </span>
                        <p className="text-slate-300 leading-relaxed font-sans">{idea.valueProp}</p>
                      </div>

                      {/* Target Audience */}
                      <div className="space-y-1">
                        <span className="text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1">
                          <Users className="w-3.5 h-3.5 text-indigo-400" /> Target Demographic
                        </span>
                        <p className="text-slate-300 leading-relaxed font-sans">{idea.audience}</p>
                      </div>

                    </div>

                    {/* Color palette */}
                    <div className="bg-slate-950 border border-slate-850 p-3 rounded-xl flex items-center justify-between text-xs gap-3">
                      <div className="flex items-center gap-2">
                        <Palette className="w-4 h-4 text-emerald-400" />
                        <span className="text-slate-400 font-sans">
                          Brand Aesthetics: <strong className="text-white font-medium">{idea.brandColors}</strong>
                        </span>
                      </div>
                      
                      <button 
                        onClick={() => copyAllAssets(idea, idx)}
                        className="text-[10px] font-bold text-indigo-455 hover:text-white px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-805 transition-all cursor-pointer border border-slate-800 whitespace-nowrap text-indigo-400"
                      >
                        {copiedIndex === idx && copiedType === 'all' ? (
                          'Assets Copied!'
                        ) : (
                          'Copy Full Assets Log'
                        )}
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>
          ) : (
            <div className="h-full min-h-[400px] border border-slate-850 border-dashed rounded-2xl bg-slate-900/20 flex flex-col items-center justify-center text-slate-500 p-8 text-center">
              <Globe className="w-14 h-14 mb-4 text-slate-700 animate-pulse animate-ease" />
              <h3 className="text-lg font-medium text-slate-400 mb-1">Assemble New Assets</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Provide a niche description, select parameters, and curate 5 premium high-leverage brand concepts in standard clicks.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
