import React, { useState } from 'react';
import { Hash, ArrowLeft, Copy, Check, Star, Play, MessageSquare, Plus, Hash as HashIcon, Trash } from 'lucide-react';

interface SymbolsCopierProps {
  onBack: () => void;
}

const SYMBOL_CATEGORIES = [
  {
    name: "Aesthetic Stars & Sparkles",
    icon: "★",
    items: ["★", "☆", "✦", "✧", "✩", "✪", "✫", "✬", "✭", "✮", "✯", "✰", "🌟", "⭐", "✨", "💫", "✴", "✵", "✹", "✸", "☄", "❂", "❃", "❄"]
  },
  {
    name: "Arrows & Directions",
    icon: "➜",
    items: ["➜", "➔", "➛", "➙", "➚", "➘", "➔", "➵", "➸", "➳", "➲", "➬", "➭", "➮", "➯", "➱", "➲", "➳", "➴", "➵", "➶", "➷", "➸", "➹", "➺", "➻", "➼", "➽", "↕", "↖", "↗", "↘", "↙", "↚", "↛", "↜", "↝", "↞", "↟", "➔"]
  },
  {
    name: "Aesthetic Brackets",
    icon: "【",
    items: ["【", "】", "『", "』", "「", "」", "《", "》", "｢", "｣", "⟨", "⟩", "〔", "〕", "〚", "〛", "（", "）", "｛", "｝", "［", "］", "❨", "❩", "❪", "❫", "❬", "❭", "❮", "❯"]
  },
  {
    name: "Classic Kawaii Face Emoticons",
    icon: "ʕ•ᴥ•ʔ",
    items: [
      "( ͡° ͜ʖ ͡°)", "ʕ•ᴥ•ʔ", "(づ｡◕‿‿◕｡)づ", "(•‿•)", "(ᵔᴥᵔ)", "(=^·^=)", "(*^▽^*)", "ヽ(^Д ^)ﾉ", "＼(￣▽￣)／", "o(≧▽≦)o", "(o_O)", "(X_X)", "(>_<)", "(;_;)", "t(>.<t)", "ಠ_ಠ", "¯\\_(ツ)_/¯", "( ͡° 5 ͡°)", "(◕‿◕)", "(つ✧ω✧)つ", "( ˘ ³˘)♥"
    ]
  },
  {
    name: "Retro Block Art & Shadows",
    icon: "░",
    items: ["░", "▒", "▓", "█", "▄", "▀", "■", "□", "▢", "▣", "▤", "▥", "▦", "▧", "▨", "▩", "▪", "▫", "▬", "▲", "▼", "◄", "►", "◆", "◇", "◈", "◉", "◊", "○", "◌", "◍", "◎", "●", "◐", "◑", "◒", "◓", "◔", "◕", "◖", "◗"]
  },
  {
    name: "Social Framing Crests",
    icon: "❦",
    items: ["❦", "❧", "❀", "✿", "✾", "⚜", "⚓", "⚔", "🛡", "⚙", "⛓", "🔑", "📦", "✉", "📌", "🧿", "🔱", "⚛", "☣", "☢", "☠", "♠", "♥", "♦", "♣", "🔇", "🎵", "🔱", "🎲"]
  }
];

export default function SymbolsCopier({ onBack }: SymbolsCopierProps) {
  const [copiedSymbol, setCopiedSymbol] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [copiedAll, setCopiedAll] = useState(false);
  const [customCollection, setCustomCollection] = useState<string[]>([]);
  const [inputVal, setInputVal] = useState('');

  const handleCopy = (sym: string) => {
    navigator.clipboard.writeText(sym);
    setCopiedSymbol(sym);
    setTimeout(() => setCopiedSymbol(null), 1500);
  };

  const handleAddToCustom = (sym: string) => {
    if (!customCollection.includes(sym)) {
      setCustomCollection([...customCollection, sym]);
    }
  };

  const handleManualAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputVal.trim()) {
      setCustomCollection([...customCollection, inputVal.trim()]);
      setInputVal('');
    }
  };

  const copyCustomCollection = () => {
    const syms = customCollection.join(' ');
    navigator.clipboard.writeText(syms);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const clearCustomCollection = () => {
    setCustomCollection([]);
  };

  return (
    <div id="symbols-copier-root" className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        id="btn-back-to-hub"
        onClick={onBack} 
        className="flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors cursor-pointer group"
      >
        <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" /> 
        Back to Hub
      </button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-slate-800/80 border border-slate-700/50 rounded-2xl text-white w-fit shadow-md">
            <span className="text-2xl font-bold font-serif">#</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white font-sans tracking-tight">Viral Symbol Copier</h1>
            <p className="text-slate-400 mt-1">Instant copy access to 500+ ASCII symbols, retro shapes, and decorative star elements.</p>
          </div>
        </div>

        {/* Global Copied Badge */}
        {copiedSymbol && (
          <div className="bg-emerald-500 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 animate-bounce shadow-lg shadow-emerald-500/20">
            <Check className="w-3.5 h-3.5" /> Copied: "{copiedSymbol}" to Clipboard
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Grid: Categories */}
        <div className="lg:col-span-8 space-y-8">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Search symbols or categories..." 
              className="w-full bg-slate-900 border border-slate-800 text-sm rounded-xl p-3.5 text-white focus:outline-none focus:ring-2 focus:ring-slate-500 transition-all font-sans placeholder-slate-650"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="space-y-8">
            {SYMBOL_CATEGORIES.map((category, catIdx) => {
              const filteredItems = category.items.filter(item => 
                item.toLowerCase().includes(search.toLowerCase()) || 
                category.name.toLowerCase().includes(search.toLowerCase())
              );

              if (filteredItems.length === 0) return null;

              return (
                <div key={catIdx} className="bg-slate-900/40 border border-slate-900 shadow-sm p-6 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center border-b border-slate-850 pb-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2 tracking-wide uppercase">
                      <span className="text-emerald-400 font-mono text-base">{category.icon}</span>
                      {category.name}
                    </h3>
                    <span className="text-xs text-slate-550 font-mono">{filteredItems.length} items</span>
                  </div>

                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
                    {filteredItems.map((sym, symIdx) => (
                      <div 
                        key={symIdx} 
                        className="group bg-slate-950 hover:bg-slate-800 border border-slate-850 hover:border-slate-700/80 aspect-square rounded-xl flex flex-col items-center justify-center p-2 relative cursor-pointer select-all transition-all shadow-inner active:scale-95"
                        onClick={() => handleCopy(sym)}
                      >
                        <div className="text-white text-lg font-medium tracking-tight">
                          {sym}
                        </div>
                        {/* Custom collection trigger */}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCustom(sym);
                          }}
                          className="absolute bottom-1 right-1 p-0.5 rounded opacity-0 group-hover:opacity-100 hover:bg-slate-700 text-slate-400 hover:text-white transition-opacity"
                          title="Queue in Deck"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Grid: Custom Assembly Deck */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 h-fit space-y-6 shadow-sm">
          <div className="border-b border-slate-800 pb-3">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <Star className="w-4 h-4 text-emerald-400" /> Clipboard Assembly Deck
            </h3>
            <p className="text-xs text-slate-500 mt-1">Queue symbols together from the lists, add manual notes, and copy everything as a single chain!</p>
          </div>

          {/* Quick manual entry */}
          <form onSubmit={handleManualAdd} className="flex gap-2">
            <input 
              type="text" 
              placeholder="Type single emoji/tagline..." 
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none' focus:ring-1 focus:ring-emerald-500 font-sans"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
            />
            <button 
              type="submit" 
              className="px-4 py-2 bg-slate-800 text-white hover:bg-emerald-500 hover:text-slate-950 font-bold text-xs rounded-xl cursor-pointer transition-colors"
            >
              Add
            </button>
          </form>

          {/* Render Deck */}
          <div className="bg-slate-950 border border-slate-850 rounded-xl p-4 min-h-[140px] flex flex-wrap gap-2 items-start content-start">
            {customCollection.length > 0 ? (
              customCollection.map((sym, index) => (
                <span 
                  key={index} 
                  className="inline-flex items-center gap-1.5 bg-slate-850 hover:bg-red-950/20 hover:border-red-500/30 text-white py-1 px-2.5 rounded-lg text-sm border border-slate-800 group transition-colors cursor-pointer"
                  onClick={() => {
                    setCustomCollection(customCollection.filter((_, i) => i !== index));
                  }}
                  title="Remove"
                >
                  {sym}
                  <Trash className="w-3 h-3 text-slate-500 group-hover:text-red-400 transition-colors" />
                </span>
              ))
            ) : (
              <span className="text-xs text-slate-600 italic mx-auto mt-8 text-center block">
                Click "+" on any symbols above or type words to queue them in your build deck.
              </span>
            )}
          </div>

          {customCollection.length > 0 && (
            <div className="flex gap-3">
              <button 
                onClick={copyCustomCollection}
                className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer text-xs transition-colors"
              >
                {copiedAll ? <><Check className="w-4 h-4" /> Copied Deck!</> : <><Copy className="w-4 h-4" /> Copy Entire String</>}
              </button>
              <button 
                onClick={clearCustomCollection}
                className="bg-slate-800 hover:bg-slate-700 text-slate-350 hover:text-white font-medium py-3 px-4 rounded-xl cursor-pointer text-xs transition-colors"
              >
                Reset Deck
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
