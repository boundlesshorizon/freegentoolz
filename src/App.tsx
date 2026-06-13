import React, { useState } from 'react';
import {
  Wand2,
  Dices,
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
  ExternalLink,
  Globe,
  Moon,
  MessageSquare,
  Send,
  HelpCircle,
  Check
} from 'lucide-react';

import { ViewType } from './types';
import LottoAnalyzer from './components/LottoAnalyzer';
import BrandStylist from './components/BrandStylist';
import SymbolsCopier from './components/SymbolsCopier';
import SeoWordCounter from './components/SeoWordCounter';
import CaseConverter from './components/CaseConverter';
import BmiCalculator from './components/BmiCalculator';
import StartupDomainGenerator from './components/StartupDomainGenerator';
import FocusSoundscape from './components/FocusSoundscape';

export default function App() {
  const [activeView, setActiveView] = useState<ViewType>('home');

  // Co-Design Zone Feedback states
  const [feedbackCategory, setFeedbackCategory] = useState<string>('UI Polish');
  const [rating, setRating] = useState<number>(5);
  const [ansNewTool, setAnsNewTool] = useState<string>('');
  const [ansVibe, setAnsVibe] = useState<string>('');
  const [ansComments, setAnsComments] = useState<string>('');
  const [feedbackSuccess, setFeedbackSuccess] = useState<boolean>(false);
  const [feedbackList, setFeedbackList] = useState<Array<{
    id: string;
    category: string;
    rating: number;
    ansNewTool: string;
    ansVibe: string;
    ansComments: string;
    date: string;
  }>>([
    {
      id: '1',
      category: 'UI Polish',
      rating: 5,
      ansNewTool: 'Interactive SVG gradients background designer',
      ansVibe: 'Sleek Obsidian has gorgeous pure geometric contrast',
      ansComments: 'The zero latency performance is absolutely fire! Best QR customized solution i found so far.',
      date: 'June 12, 2026'
    },
    {
      id: '2',
      category: 'Feature Request',
      rating: 4,
      ansNewTool: 'A sound recorder / voice branding text synthesizer',
      ansVibe: 'Cosmic Nebula is clean, love the glow colors.',
      ansComments: 'Would love if we can upload a custom center PNG overlay brand file. Otherwise spectacular.',
      date: 'June 13, 2026'
    }
  ]);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ansComments.trim() && !ansNewTool.trim() && !ansVibe.trim()) return;

    const newFeedback = {
      id: Date.now().toString(),
      category: feedbackCategory,
      rating,
      ansNewTool: ansNewTool.trim() || 'No answer provided',
      ansVibe: ansVibe.trim() || 'Default theme is elite',
      ansComments: ansComments.trim() || 'No additional comments',
      date: 'Just now'
    };

    setFeedbackList([newFeedback, ...feedbackList]);
    setFeedbackSuccess(true);
    
    // Clear form inputs
    setAnsNewTool('');
    setAnsVibe('');
    setAnsComments('');

    setTimeout(() => {
      setFeedbackSuccess(false);
    }, 4000);
  };

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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  
                  {/* Brand Stylist Card */}
                  <div 
                    id="card-fancytext"
                    onClick={() => setActiveView('fancytext')} 
                    className="group relative bg-slate-900 border border-slate-900 hover:border-cyan-550/40 p-6 rounded-3xl cursor-pointer transition-all overflow-hidden shadow-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400 transition-colors group-hover:bg-cyan-500/20 w-fit">
                          <Type className="w-8 h-8" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded font-mono">
                          Unicode 300+
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">Brand & Text Stylist</h3>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          Convert raw string tags into 300+ Unicode variations and formulate high-converting viral hooks powered by Gemini.
                        </p>
                      </div>
                      <div className="flex items-center text-cyan-450 text-xs font-semibold pt-2 text-cyan-400 group-hover:translate-x-1.5 transition-transform">
                        Customize Branding <ChevronRight className="w-3.5 h-3.5 ml-1" />
                      </div>
                    </div>
                  </div>

                  {/* Startup & Domain Generator Card */}
                  <div 
                    id="card-startup"
                    onClick={() => setActiveView('startup')} 
                    className="group relative bg-slate-900 border border-slate-900 hover:border-emerald-500/40 p-6 rounded-3xl cursor-pointer transition-all overflow-hidden shadow-sm"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400 transition-colors group-hover:bg-emerald-500/20 w-fit">
                          <Globe className="w-8 h-8" />
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded font-mono">
                          Gemini 3.5 Hybrid
                        </span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">Startup & Domain AI</h3>
                        <p className="text-xs text-slate-400 leading-relaxed font-sans">
                          Assemble 5 catchy venture brand concepts, matching premium TLD domain name recommendations, and taglines. Includes auto local fallback backup.
                        </p>
                      </div>
                      <div className="flex items-center text-emerald-450 text-xs font-semibold pt-2 text-emerald-400 group-hover:translate-x-1.5 transition-transform">
                        Launch Ideas <ChevronRight className="w-3.5 h-3.5 ml-1" />
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
                  <span className="text-xs text-slate-650 font-mono text-emerald-400">Zero Server Latency Tools</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-5">
                  
                  {/* Global Lotto Strategy Engine */}
                  <div 
                    id="tile-lotto"
                    onClick={() => setActiveView('lotto')}
                    className="p-5 bg-slate-900/55 hover:bg-slate-900 border border-slate-900 hover:border-emerald-500/30 rounded-2xl transition hover:shadow-sm cursor-pointer flex flex-col justify-between min-h-[160px] group"
                  >
                    <div className="p-2.5 bg-slate-950 rounded-xl text-slate-400 w-fit border border-slate-850 group-hover:bg-slate-850 transition">
                      <Dices className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm tracking-wide mt-3 group-hover:text-emerald-400 transition">Global Lotto Strategy</h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">Parity entropy analysis, bell curve summations for US, Canada, EU.</p>
                    </div>
                  </div>

                  {/* Symbols Copier */}
                  <div 
                    id="tile-symbols"
                    onClick={() => setActiveView('symbols')}
                    className="p-5 bg-slate-900/55 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-2xl transition hover:shadow-sm cursor-pointer flex flex-col justify-between min-h-[160px] group"
                  >
                    <div className="p-2.5 bg-slate-950 rounded-xl text-slate-450 w-fit border border-slate-850 group-hover:bg-slate-850 transition">
                      <Hash className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm tracking-wide mt-3 group-hover:text-emerald-450 transition">Viral Symbol Copier</h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">500+ custom emoticons, arrows, shapes, and star boundaries.</p>
                    </div>
                  </div>

                  {/* SEO Word Counter */}
                  <div 
                    id="tile-seo"
                    onClick={() => setActiveView('seo')}
                    className="p-5 bg-slate-900/55 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-2xl transition hover:shadow-sm cursor-pointer flex flex-col justify-between min-h-[160px] group"
                  >
                    <div className="p-2.5 bg-slate-950 rounded-xl text-slate-450 w-fit border border-slate-850 group-hover:bg-slate-850 transition">
                      <Sigma className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm tracking-wide mt-3 group-hover:text-emerald-450 transition">SEO Word Counter</h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">Live frequency density map and text readability audit reports.</p>
                    </div>
                  </div>

                  {/* Case Converter */}
                  <div 
                    id="tile-case"
                    onClick={() => setActiveView('case')}
                    className="p-5 bg-slate-900/55 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-2xl transition hover:shadow-sm cursor-pointer flex flex-col justify-between min-h-[160px] group"
                  >
                    <div className="p-2.5 bg-slate-950 rounded-xl text-slate-450 w-fit border border-slate-850 group-hover:bg-slate-850 transition">
                      <CaseSensitive className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm tracking-wide mt-3 group-hover:text-emerald-450 transition">Auto Case Converter</h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">Single-click title capitalization, UPPERCASE, and lowercase formats.</p>
                    </div>
                  </div>

                  {/* BMI Calculator */}
                  <div 
                    id="tile-bmi"
                    onClick={() => setActiveView('bmi')}
                    className="p-5 bg-slate-900/55 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-2xl transition hover:shadow-sm cursor-pointer flex flex-col justify-between min-h-[160px] group"
                  >
                    <div className="p-2.5 bg-slate-950 rounded-xl text-slate-450 w-fit border border-slate-850 group-hover:bg-slate-850 transition">
                      <Activity className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm tracking-wide mt-3 group-hover:text-emerald-450 transition">Smart BMI Calculator</h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">Anatomical metabolic computations with physical tracking guidance.</p>
                    </div>
                  </div>

                  {/* Focus Soundscape */}
                  <div 
                    id="tile-soundscape"
                    onClick={() => setActiveView('soundscape')}
                    className="p-5 bg-slate-900/55 hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-2xl transition hover:shadow-sm cursor-pointer flex flex-col justify-between min-h-[160px] group"
                  >
                    <div className="p-2.5 bg-slate-950 rounded-xl text-slate-400 w-fit border border-slate-850 group-hover:bg-slate-850 transition">
                      <Moon className="w-5 h-5 text-violet-400" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-sm tracking-wide mt-3 group-hover:text-emerald-400 transition">Focus Soundscape</h4>
                      <p className="text-[11px] text-slate-500 mt-1 line-clamp-2">Interactive Pomodoro timer with procedural binaural noise mixer.</p>
                    </div>
                  </div>

                </div>
              </div>

              {/* GLOBAL FEEDBACK & IMPROVEMENT CO-DESIGN ZONE */}
              <div id="co-design-improvement-zone" className="border-t border-slate-900 pt-10 mt-12 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-indigo-505/10 bg-indigo-500/10 rounded-2xl text-indigo-400">
                      <MessageSquare className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-white font-sans tracking-tight">Co-Design & Site Improvement Hub</h2>
                      <p className="text-slate-400 text-xs">Answer improvement questions or leave comments to shape the future of our content tools!</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-indigo-500/10 text-indigo-300 px-3 py-1 rounded-full border border-indigo-500/15">
                    Community-Driven Development
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Questions form card */}
                  <form 
                    onSubmit={handleFeedbackSubmit}
                    className="bg-slate-900 border border-slate-900 rounded-3xl p-6 space-y-5 lg:col-span-7 shadow-sm"
                  >
                    <div className="flex flex-wrap gap-4 items-center justify-between border-b border-slate-850 pb-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                        <HelpCircle className="w-4 h-4 text-purple-400" /> Share Your Insights
                      </span>
                      
                      <div className="flex items-center gap-2">
                        <label className="text-[10px] font-bold text-slate-505 text-slate-500 uppercase tracking-wider">Scope:</label>
                        <div className="flex gap-1.5">
                          {['UI Polish', 'Feature Request', 'General Love'].map((cat) => (
                            <button
                              key={cat}
                              type="button"
                              onClick={() => setFeedbackCategory(cat)}
                              className={`text-[9px] font-bold px-2.5 py-1 rounded-md transition ${
                                feedbackCategory === cat 
                                  ? 'bg-purple-600 text-white' 
                                  : 'bg-slate-950 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {cat}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Question 1 */}
                      <div>
                        <label htmlFor="q-new-tool" className="block text-xs font-semibold text-slate-350 mb-1.5">
                          1. If you could add any new utility tool to this hub, what would it be?
                        </label>
                        <input 
                          id="q-new-tool"
                          type="text"
                          value={ansNewTool}
                          onChange={(e) => setAnsNewTool(e.target.value)}
                          placeholder="e.g. SVG pattern generator, CSS animation keyframes playground, etc."
                          className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-slate-200 text-xs focus:ring-1 focus:ring-purple-500 outline-none placeholder-slate-705"
                        />
                      </div>

                      {/* Question 2 */}
                      <div>
                        <label htmlFor="q-preset-vibe" className="block text-xs font-semibold text-slate-355 text-slate-300 mb-1.5">
                          2. Which color aesthetic or design preset feels the most elite?
                        </label>
                        <input 
                          id="q-preset-vibe"
                          type="text"
                          value={ansVibe}
                          onChange={(e) => setAnsVibe(e.target.value)}
                          placeholder="e.g. Love Cosmic Nebula glow details / Emerald code vibe..."
                          className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-slate-200 text-xs focus:ring-1 focus:ring-purple-500 outline-none placeholder-slate-705"
                        />
                      </div>

                      {/* Question 3 (General Comments) */}
                      <div>
                        <label htmlFor="q-comments" className="block text-xs font-semibold text-slate-355 text-slate-300 mb-1.5">
                          3. Please share any additional comments or general feedback:
                        </label>
                        <textarea 
                          id="q-comments"
                          rows={3}
                          value={ansComments}
                          onChange={(e) => setAnsComments(e.target.value)}
                          placeholder="Type your recommendations or what comments you have in mind..."
                          className="w-full bg-slate-950 border border-slate-900 rounded-xl p-3 text-slate-200 text-xs focus:ring-1 focus:ring-purple-500 outline-none placeholder-slate-705 resize-none"
                        />
                      </div>

                      {/* App rating stars */}
                      <div className="flex items-center gap-3 pt-1">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">How satisfied are you with this Hub?</span>
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setRating(star)}
                              className="text-slate-600 hover:scale-110 transition cursor-pointer font-sans"
                            >
                              <Star className={`w-4 h-4 ${rating >= star ? 'text-yellow-400 fill-yellow-400' : 'text-slate-700'}`} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <button
                        type="submit"
                        className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2.5 px-6 rounded-xl text-xs flex items-center gap-2 transition cursor-pointer select-none active:scale-95 shadow-md shadow-indigo-600/10"
                      >
                        <Send className="w-3.5 h-3.5" /> Submit Suggestions
                      </button>

                      {feedbackSuccess && (
                        <span className="text-xs font-semibold text-emerald-400 animate-pulse flex items-center gap-1.5">
                          <Check className="w-4 h-4 text-emerald-400" /> Responses registered successfully!
                        </span>
                      )}
                    </div>
                  </form>

                  {/* Feedback Board Stream (Real-Time Added Comments) */}
                  <div className="lg:col-span-5 space-y-4">
                    <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest pl-1">
                      Live Suggestions & Feature Board
                    </span>

                    <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
                      {feedbackList.map((feedback) => (
                        <div 
                          key={feedback.id}
                          className="bg-slate-950/60 border border-slate-900 p-4 rounded-2xl space-y-3 hover:border-slate-850 transition"
                        >
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/10 uppercase tracking-wider">
                              {feedback.category}
                            </span>
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                              <span className="text-[10px] text-slate-400 font-bold">{feedback.rating}/5</span>
                              <span className="text-[9px] text-slate-600 ml-2 font-mono">{feedback.date}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {feedback.ansNewTool !== 'No answer provided' && (
                              <div className="text-[11px]">
                                <span className="text-slate-500 block font-mono">Suggested Tool:</span>
                                <p className="text-slate-300 font-sans italic">"{feedback.ansNewTool}"</p>
                              </div>
                            )}
                            {feedback.ansComments !== 'No additional comments' && (
                              <div className="text-[11px]">
                                <span className="text-slate-505 text-slate-500 block font-mono">Comments:</span>
                                <p className="text-slate-300 font-sans">"{feedback.ansComments}"</p>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* Sub-view Rendering */}
          {activeView === 'lotto' && <LottoAnalyzer onBack={() => setActiveView('home')} />}
          {activeView === 'fancytext' && <BrandStylist onBack={() => setActiveView('home')} />}
          {activeView === 'symbols' && <SymbolsCopier onBack={() => setActiveView('home')} />}
          {activeView === 'seo' && <SeoWordCounter onBack={() => setActiveView('home')} />}
          {activeView === 'case' && <CaseConverter onBack={() => setActiveView('home')} />}
          {activeView === 'bmi' && <BmiCalculator onBack={() => setActiveView('home')} />}
          {activeView === 'startup' && <StartupDomainGenerator onBack={() => setActiveView('home')} />}
          {activeView === 'soundscape' && <FocusSoundscape onBack={() => setActiveView('home')} />}
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
