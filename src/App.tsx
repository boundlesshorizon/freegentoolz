import React, { useState } from 'react';
import {
  Wand2,
  Dices,
  QrCode,
  Hash,
  Type,
  Sigma,
  CaseSensitive,
  Activity,
  ChevronRight,
  ArrowLeft,
  Sparkles,
  Zap,
  Star,
  ExternalLink
} from 'lucide-react';

import { ViewType } from './types';
import LottoAnalyzer from './components/LottoAnalyzer';
import BrandStylist from './components/BrandStylist';
import QrBlender from './components/QrBlender';
import SymbolsCopier from './components/SymbolsCopier';
import SeoWordCounter from './components/SeoWordCounter';
import CaseConverter from './components/CaseConverter';
import BmiCalculator from './components/BmiCalculator';

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('home');

  return (
    <div id="app-root" className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Premium Global Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            id="brand-header"
            onClick={() => setActiveView('home')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="p-2 bg-gradient-to-tr from-emerald-500 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md group-hover:scale-105 transition-transform">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-extrabold text-white text-lg tracking-tight font-sans">
                FreeGen<span className="text-emerald-400">Tools</span>
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] font-mono font-bold tracking-widest text-slate-550 uppercase bg-slate-900 border border-slate-850 px-2 py-0.5 rounded">
                V2.1 Pure Web
              </span>
            </div>
          </div>

          {/* Nav Items (Visual aesthetics) */}
          <nav className="flex items-center gap-6">
            <span className="text-xs text-slate-400 font-medium hover:text-white transition-colors cursor-pointer hidden sm:inline" onClick={() => setActiveView('home')}>
              Tools Hub
            </span>
            <span className="text-xs text-slate-500 font-medium hover:text-slate-300 transition-colors cursor-not-allowed flex items-center gap-1">
              Developer API <ExternalLink className="w-3 h-3" />
            </span>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-full cursor-not-allowed">
              Unlock Enterprise
            </span>
          </nav>
        </div>
      </header>

      {/* Main Core Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Premium Sponsor Ad Slot */}
        <div className="w-full bg-slate-900/50 border border-slate-900/80 rounded-2xl p-4 sm:p-6 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3.5 text-center md:text-left">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-450 hidden sm:block">
              <Sparkles className="w-5 h-5 animate-pulse text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <span className="text-[9px] uppercase font-bold tracking-widest bg-slate-800 text-emerald-400 px-2 py-0.5 rounded font-mono">Sponsored</span>
                <h4 className="text-xs font-bold text-white tracking-wide">Accelerate Creative Copy & Code with Google AI Studio</h4>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-xl leading-relaxed">
                Connect your workspace directly to Google Gemini models to unlock automated copywriting, predictive lotto statistics, and customized branding.
              </p>
            </div>
          </div>
          <a 
            href="https://ai.studio/build" 
            target="_blank" 
            rel="noopener noreferrer"
            className="w-full md:w-auto bg-slate-800 hover:bg-slate-750 text-white font-bold py-2.5 px-5 rounded-xl text-xs flex items-center justify-center gap-1 transition-colors border border-slate-700/50"
          >
            Launch Prototype <ChevronRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Dynamic Route Switching */}
        <div id="content-view-container">
          {activeView === 'home' && (
            <div className="space-y-12 animate-in fade-in duration-500">
              
              {/* Marketing Display Header */}
              <div className="text-center space-y-4 max-w-3xl mx-auto py-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-xs font-semibold select-none">
                  <Sparkles className="w-3.5 h-3.5" /> Fully Integrated Server-Side Gemini Engines Now Live
                </div>
                <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                  High-Leverage <br className="sm:hidden" /> AI Utilities Box
                </h2>
                <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto leading-relaxed">
                  Enterprise-grade data analysis and content structuring tools designed for creators, statistic analysts, and founders. Execute manual loops in single clicks.
                </p>
              </div>

              {/* TIER 1: Premium AI Hubs */}
              <div className="space-y-6">
                <h2 className="text-xl font-bold text-white uppercase tracking-wider flex items-center gap-2.5">
                  <Wand2 className="w-5 h-5 text-emerald-400" /> Premium AI Tool Suites
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  
                  {/* Lotto AI Card */}
                  <div 
                    id="card-lotto"
                    onClick={() => setActiveView('lotto')} 
                    className="group relative bg-slate-900 border border-slate-900 hover:border-emerald-500/40 p-6 rounded-3xl cursor-pointer transition-all overflow-hidden shadow-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 transition-colors group-hover:bg-emerald-500/20 w-fit">
                          <Dices className="w-8 h-8" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-550/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                          Gemini 3.5
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Global Lotto AI Analyzer</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Analyze past draws for USA, Canada, Australia, and Philippines. Extract frequency distribution formulas and custom bell curve combinations.
                        </p>
                      </div>
                      <div className="flex items-center text-emerald-404 text-xs font-semibold pt-2 text-emerald-400 group-hover:translate-x-1.5 transition-transform">
                        Launch Analyzer <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Brand Stylist Card */}
                  <div 
                    id="card-fancytext"
                    onClick={() => setActiveView('fancytext')} 
                    className="group relative bg-slate-900 border border-slate-900 hover:border-cyan-555/40 p-6 rounded-3xl cursor-pointer transition-all overflow-hidden shadow-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400 transition-colors group-hover:bg-cyan-500/20 w-fit">
                          <Type className="w-8 h-8" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-cyan-550/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded font-mono">
                          Dynamic 200+
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Brand & Text Stylist</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Convert raw string tags into 200+ Unicode styles and formulate viral social platform hook descriptions powered by server-side Gemini.
                        </p>
                      </div>
                      <div className="flex items-center text-cyan-404 text-xs font-semibold pt-2 text-cyan-405 group-hover:translate-x-1.5 transition-transform text-cyan-400">
                        Customize Branding <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* QR Blender Card */}
                  <div 
                    id="card-qrblender"
                    onClick={() => setActiveView('qrblender')} 
                    className="group relative bg-slate-900 border border-slate-900 hover:border-purple-500/40 p-6 rounded-3xl cursor-pointer transition-all overflow-hidden shadow-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400 transition-colors group-hover:bg-purple-500/20 w-fit">
                          <QrCode className="w-8 h-8" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-purple-550/10 text-purple-400 border border-purple-500/20 px-2 py-0.5 rounded font-mono">
                          Creative AI
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">AI Smart QR Blender</h3>
                        <p className="text-xs text-slate-400 leading-relaxed">
                          Standard boring black QRs are inoperable. Render beautiful high-contrast aesthetic QR canvas codes designed with themes matching target prompts.
                        </p>
                      </div>
                      <div className="flex items-center text-purple-404 text-xs font-semibold pt-2 text-purple-405 group-hover:translate-x-1.5 transition-transform text-purple-400">
                        Generate Code <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              {/* TIER 2: Advanced Content Utilities */}
              <div className="space-y-6">
                <div className="flex justify-between items-center border-b border-slate-900 pb-3">
                  <h2 className="text-lg font-bold text-slate-450 uppercase tracking-wider flex items-center gap-2.5">
                    <Activity className="w-5 h-5 text-slate-500" /> Advanced Content Utilities
                  </h2>
                  <span className="text-xs text-slate-600 font-mono">No subscription required</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  
                  {/* Symbols Copier */}
                  <div 
                    id="tile-symbols"
                    onClick={() => setActiveView('symbols')}
                    className="p-5 bg-slate-900/55 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-2xl transition hover:shadow-sm cursor-pointer flex flex-col justify-between min-h-[140px] group"
                  >
                    <div className="p-2.5 bg-slate-950 rounded-xl text-slate-450 w-fit border border-slate-850 group-hover:bg-slate-850 transition">
                      <Hash className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm tracking-wide mt-3 group-hover:text-emerald-400 transition">Viral Symbol Copier</h4>
                      <p className="text-[11px] text-slate-500 mt-1 lines-clamp-2">500+ custom emoticons, arrows, shapes, and star boundaries.</p>
                    </div>
                  </div>

                  {/* SEO Word Counter */}
                  <div 
                    id="tile-seo"
                    onClick={() => setActiveView('seo')}
                    className="p-5 bg-slate-900/55 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-2xl transition hover:shadow-sm cursor-pointer flex flex-col justify-between min-h-[140px] group"
                  >
                    <div className="p-2.5 bg-slate-950 rounded-xl text-slate-450 w-fit border border-slate-850 group-hover:bg-slate-850 transition">
                      <Sigma className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm tracking-wide mt-3 group-hover:text-emerald-400 transition">SEO Word Counter</h4>
                      <p className="text-[11px] text-slate-500 mt-1 lines-clamp-2">Live frequency density map and text readability audit reports.</p>
                    </div>
                  </div>

                  {/* Case Converter */}
                  <div 
                    id="tile-case"
                    onClick={() => setActiveView('case')}
                    className="p-5 bg-slate-900/55 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-2xl transition hover:shadow-sm cursor-pointer flex flex-col justify-between min-h-[140px] group"
                  >
                    <div className="p-2.5 bg-slate-950 rounded-xl text-slate-450 w-fit border border-slate-850 group-hover:bg-slate-850 transition">
                      <CaseSensitive className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm tracking-wide mt-3 group-hover:text-emerald-400 transition">Auto Case Converter</h4>
                      <p className="text-[11px] text-slate-500 mt-1 lines-clamp-2">Single-click title capitalization, UPPERCASE, and lowercase formats.</p>
                    </div>
                  </div>

                  {/* BMI Calculator */}
                  <div 
                    id="tile-bmi"
                    onClick={() => setActiveView('bmi')}
                    className="p-5 bg-slate-900/55 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-2xl transition hover:shadow-sm cursor-pointer flex flex-col justify-between min-h-[140px] group"
                  >
                    <div className="p-2.5 bg-slate-950 rounded-xl text-slate-450 w-fit border border-slate-850 group-hover:bg-slate-850 transition">
                      <Activity className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm tracking-wide mt-3 group-hover:text-emerald-400 transition">Smart BMI Calculator</h4>
                      <p className="text-[11px] text-slate-500 mt-1 lines-clamp-2">Anatomical metabolic computations with physical tracking guidance.</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Sub-view Rendering */}
          {activeView === 'lotto' && <LottoAnalyzer onBack={() => setActiveView('home')} />}
          {activeView === 'fancytext' && <BrandStylist onBack={() => setActiveView('home')} />}
          {activeView === 'qrblender' && <QrBlender onBack={() => setActiveView('home')} />}
          {activeView === 'symbols' && <SymbolsCopier onBack={() => setActiveView('home')} />}
          {activeView === 'seo' && <SeoWordCounter onBack={() => setActiveView('home')} />}
          {activeView === 'case' && <CaseConverter onBack={() => setActiveView('home')} />}
          {activeView === 'bmi' && <BmiCalculator onBack={() => setActiveView('home')} />}
        </div>
      </main>

      {/* Aesthetic Footer */}
      <footer className="border-t border-slate-900 mt-20 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>© 2026 FreeGenTools Inc. All rights reserved. Built with Gemini AI.</span>
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-350 transition cursor-help">TOS & License</span>
            <span className="hover:text-slate-355 transition cursor-help">Affiliates</span>
            <span className="hover:text-slate-355 transition cursor-help">Status API</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
