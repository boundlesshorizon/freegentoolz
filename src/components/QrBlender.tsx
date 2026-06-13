import React, { useState, useRef, useEffect } from 'react';
import { 
  QrCode, 
  ArrowLeft, 
  Sparkles, 
  FileDown, 
  Layers, 
  Link as LinkIcon, 
  Palette, 
  Check, 
  Sliders, 
  Sunset, 
  Zap, 
  Star, 
  Compass,
  Heart,
  Lightbulb
} from 'lucide-react';
import QRCode from 'qrcode';

interface QrBlenderProps {
  onBack: () => void;
}

interface ThemePreset {
  name: string;
  id: string;
  bgGradient: string;
  borderColor: string;
  glowColor: string;
  qrColor: string;
  brandIcon: string;
  styleTips: string;
}

const PRESET_THEMES: ThemePreset[] = [
  {
    id: 'nebula',
    name: 'Cosmic Nebula',
    bgGradient: 'from-slate-950 via-slate-900 to-purple-950',
    borderColor: 'border-purple-500/30',
    glowColor: 'shadow-[0_0_25px_rgba(168,85,247,0.25)]',
    qrColor: '#c084fc',
    brandIcon: 'sparkles',
    styleTips: 'Woven with celestial ultraviolet spectrum light'
  },
  {
    id: 'cyberpunk',
    name: 'Emerald Cyberpunk',
    bgGradient: 'from-slate-950 via-slate-900 to-emerald-950',
    borderColor: 'border-emerald-500/30',
    glowColor: 'shadow-[0_0_25px_rgba(16,185,129,0.25)]',
    qrColor: '#34d399',
    brandIcon: 'zap',
    styleTips: 'High-speed data matrix routing through neon grids'
  },
  {
    id: 'amber',
    name: 'Golden Monolith',
    bgGradient: 'from-slate-950 via-slate-900 to-amber-950',
    borderColor: 'border-amber-500/30',
    glowColor: 'shadow-[0_0_25px_rgba(245,158,11,0.25)]',
    qrColor: '#fbbf24',
    brandIcon: 'star',
    styleTips: 'Timeless luxury aesthetics with golden ratios'
  },
  {
    id: 'sunset',
    name: 'Sunset Solstice',
    bgGradient: 'from-slate-950 via-slate-900 to-rose-950',
    borderColor: 'border-rose-500/30',
    glowColor: 'shadow-[0_0_25px_rgba(244,63,94,0.25)]',
    qrColor: '#fb7185',
    brandIcon: 'heart',
    styleTips: 'Cozy emotional warmth combined with modern gradients'
  },
  {
    id: 'minimalist',
    name: 'Sleek Obsidian',
    bgGradient: 'from-slate-950 via-slate-900 to-slate-800',
    borderColor: 'border-slate-700/40',
    glowColor: 'shadow-[0_0_25px_rgba(255,255,255,0.08)]',
    qrColor: '#e2e8f0',
    brandIcon: 'compass',
    styleTips: 'High contrast pure geometric precision code'
  }
];

export default function QrBlender({ onBack }: QrBlenderProps) {
  const [url, setUrl] = useState('https://ai.studio/build');
  const [selectedThemeId, setSelectedThemeId] = useState('nebula');
  
  // Custom design overrides
  const [customQrColor, setCustomQrColor] = useState('#c084fc');
  const [customTagline, setCustomTagline] = useState('Scan to discover next-gen digital experience');
  const [customBrandIcon, setCustomBrandIcon] = useState('sparkles');
  const [customBorderColor, setCustomBorderColor] = useState('border-purple-500/30');
  const [customBgFrom, setCustomBgFrom] = useState('from-slate-950');
  const [customBgTo, setCustomBgTo] = useState('to-purple-950');
  const [customGlow, setCustomGlow] = useState('shadow-[0_0_25px_rgba(168,85,247,0.25)]');

  const [activeTab, setActiveTab] = useState<'presets' | 'advanced'>('presets');
  const [copySuccess, setCopySuccess] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Sync active theme settings to states when theme changes
  useEffect(() => {
    const theme = PRESET_THEMES.find(t => t.id === selectedThemeId);
    if (theme) {
      setCustomQrColor(theme.qrColor);
      setCustomTagline(theme.styleTips);
      setCustomBrandIcon(theme.brandIcon);
      setCustomBorderColor(theme.borderColor);
      
      const grads = theme.bgGradient.split(' ');
      setCustomBgFrom(grads[0] || 'from-slate-950');
      setCustomBgTo(grads[grads.length - 1] || 'to-purple-950');
      setCustomGlow(theme.glowColor);
    }
  }, [selectedThemeId]);

  // Generate the actual QR code on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    QRCode.toCanvas(
      canvas,
      url || 'https://ai.studio/build',
      {
        width: 256,
        margin: 2,
        color: {
          dark: customQrColor || '#ffffff',
          light: '#030712' // Dark background for the QR container
        },
        errorCorrectionLevel: 'H' // High resiliency
      },
      (error) => {
        if (error) console.error("Error generating QR code:", error);
      }
    );
  }, [url, customQrColor]);

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `fancy-qr-${selectedThemeId}.png`;
    link.href = dataUrl;
    link.click();
  };

  // Render chosen brand icon
  const renderBrandIcon = (iconName: string) => {
    switch (iconName) {
      case 'sparkles':
        return <Sparkles className="w-5 h-5 text-yellow-300" />;
      case 'zap':
        return <Zap className="w-5 h-5 text-emerald-400" />;
      case 'star':
        return <Star className="w-5 h-5 text-amber-400" />;
      case 'heart':
        return <Heart className="w-5 h-5 text-rose-450 text-rose-400" />;
      case 'compass':
        return <Compass className="w-5 h-5 text-indigo-400" />;
      default:
        return <QrCode className="w-5 h-5 text-slate-350" />;
    }
  };

  return (
    <div id="qr-blender-root" className="max-w-6xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
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
          <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400 w-fit">
            <QrCode className="w-10 h-10" />
          </div>
          <div>
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest font-mono bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Client-Side Engine</span>
            <h1 className="text-3xl font-extrabold text-white font-sans tracking-tight mt-1">Custom QR Code Architect</h1>
            <p className="text-slate-400 text-sm">Design, customize, and stylize ultra-high resolution interactive QR cards locally with zero latency.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Controls Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-6 lg:col-span-5 h-fit shadow-sm">
          
          {/* Header Controls */}
          <div>
            <label htmlFor="qr-target-url" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <LinkIcon className="w-3.5 h-3.5 text-purple-400" /> Target Destination URL or Text
            </label>
            <input 
              id="qr-target-url"
              type="text"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all placeholder-slate-700"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
            />
          </div>

          {/* Tab switching between Preset Themes and Custom controls */}
          <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-850">
            <button 
              onClick={() => setActiveTab('presets')}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'presets' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Palette className="w-3.5 h-3.5" /> Preset Masterpieces
            </button>
            <button 
              onClick={() => setActiveTab('advanced')}
              className={`flex-1 text-center py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'advanced' 
                  ? 'bg-purple-600 text-white shadow-md' 
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" /> Advanced Designer
            </button>
          </div>

          {activeTab === 'presets' ? (
            <div className="space-y-3.5">
              <span className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Select Visual Vibe</span>
              <div className="space-y-2.5">
                {PRESET_THEMES.map((theme) => (
                  <div 
                    key={theme.id}
                    onClick={() => {
                      setSelectedThemeId(theme.id);
                    }}
                    className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                      selectedThemeId === theme.id 
                        ? 'bg-purple-500/10 border-purple-500/60 text-white shadow-md shadow-purple-500/5' 
                        : 'bg-slate-950/60 border-slate-850 text-slate-400 hover:text-slate-200 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${theme.bgGradient} border border-slate-700/50 flex items-center justify-center`}>
                        {renderBrandIcon(theme.brandIcon)}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white tracking-wide">{theme.name}</h4>
                        <p className="text-[10px] text-slate-500 font-mono italic mt-0.5 max-w-[200px] truncate">"{theme.styleTips}"</p>
                      </div>
                    </div>
                    {selectedThemeId === theme.id && <Check className="w-4 h-4 text-purple-400" />}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4 animate-in fade-in duration-300">
              
              {/* QR pixel color selector */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">QR Code Core Color</label>
                <div className="flex gap-2">
                  <input 
                    type="color" 
                    className="w-12 h-10 rounded-xl bg-slate-950 border border-slate-800 p-1 cursor-pointer"
                    value={customQrColor}
                    onChange={(e) => setCustomQrColor(e.target.value)}
                  />
                  <input 
                    type="text" 
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3.5 text-sm text-white font-mono uppercase focus:ring-1 focus:ring-purple-500 outline-none"
                    value={customQrColor}
                    onChange={(e) => setCustomQrColor(e.target.value)}
                  />
                </div>
              </div>

              {/* Tagline / Caption Override */}
              <div>
                <label htmlFor="custom-tagline-input" className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Bottom Brand Card Memo</label>
                <input 
                  id="custom-tagline-input"
                  type="text"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs focus:ring-1 focus:ring-purple-500 outline-none placeholder-slate-700"
                  value={customTagline}
                  onChange={(e) => setCustomTagline(e.target.value)}
                />
              </div>

              {/* Brand Icon Override */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Center Overlay Icon Vibe</label>
                <div className="grid grid-cols-5 gap-2 bg-slate-950 p-2 rounded-xl border border-slate-850">
                  {['sparkles', 'zap', 'star', 'heart', 'compass'].map((iconKey) => (
                    <button
                      key={iconKey}
                      onClick={() => setCustomBrandIcon(iconKey)}
                      className={`py-2 rounded-lg flex justify-center items-center transition cursor-pointer ${
                        customBrandIcon === iconKey 
                          ? 'bg-purple-600/30 border border-purple-500/40 text-purple-300 scale-105' 
                          : 'text-slate-500 hover:text-slate-350'
                      }`}
                    >
                      {renderBrandIcon(iconKey)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom background overrides */}
              <div className="grid grid-cols-2 gap-3 pb-1">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Gradient Start</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                    value={customBgFrom}
                    onChange={(e) => {
                      setCustomBgFrom(e.target.value);
                      setSelectedThemeId('custom');
                    }}
                  >
                    <option value="from-slate-950">Slate Void</option>
                    <option value="from-indigo-950">Midnight Blue</option>
                    <option value="from-purple-950">Deep Violet</option>
                    <option value="from-emerald-950">Abyssal Green</option>
                    <option value="from-rose-950">Rosewood</option>
                    <option value="from-zinc-900">Charcoal Dark</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Gradient End</label>
                  <select 
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-xs text-white"
                    value={customBgTo}
                    onChange={(e) => {
                      setCustomBgTo(e.target.value);
                      setSelectedThemeId('custom');
                    }}
                  >
                    <option value="to-purple-950">Purple Mist</option>
                    <option value="to-indigo-950">Indigo Abyss</option>
                    <option value="to-emerald-950">Emerald Swirl</option>
                    <option value="to-rose-950">Rose Sunset</option>
                    <option value="to-slate-800">Slate Minimal</option>
                    <option value="to-zinc-950">Void Dark</option>
                  </select>
                </div>
              </div>

              {/* Custom Glow Intensity Preset */}
              <div>
                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1.5">Aura Glow Color</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label: 'Purple', class: 'shadow-[0_0_25px_rgba(168,85,247,0.25)]' },
                    { label: 'Emerald', class: 'shadow-[0_0_25px_rgba(16,185,129,0.25)]' },
                    { label: 'Amethyst', class: 'shadow-[0_0_25px_rgba(244,63,94,0.25)]' },
                    { label: 'None', class: 'shadow-none' }
                  ].map((g) => (
                    <button
                      key={g.label}
                      onClick={() => setCustomGlow(g.class)}
                      className={`py-1.5 rounded text-[10px] font-bold border cursor-pointer transition ${
                        customGlow === g.class 
                          ? 'bg-purple-600 border-purple-500 text-white' 
                          : 'bg-slate-950 border-slate-850 text-slate-400'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="bg-slate-950 rounded-2xl p-4 border border-slate-850/50 flex gap-3 text-xs items-start">
            <Lightbulb className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div className="text-slate-400 leading-relaxed">
              <strong className="text-white">Instant Engine Advice:</strong> Scan resiliency is automatically calibrated to High Error Correction level (30%), allowing you to customize colors and logos without losing scannability.
            </div>
          </div>

        </div>

        {/* Live Presentation Layer */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center">
          <div className="w-full max-w-md space-y-6">
            
            {/* The Styled Brand Card */}
            <div className={`bg-gradient-to-br ${customBgFrom} via-slate-900 ${customBgTo} border ${customBorderColor} rounded-3xl p-8 ${customGlow} transition-all duration-500 flex flex-col items-center relative overflow-hidden backdrop-blur-md border-purple-500/20`}>
              
              {/* Glass Rings decoration */}
              <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />

              {/* Theme Name Header */}
              <div className="flex items-center gap-2 mb-6">
                {renderBrandIcon(customBrandIcon)}
                <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-350 bg-slate-950/50 border border-slate-800 px-3 py-1 rounded-full">
                  {selectedThemeId === 'custom' ? 'Custom Style Layout' : PRESET_THEMES.find(t=>t.id===selectedThemeId)?.name}
                </span>
              </div>

              {/* QR Canvas Container */}
              <div className="bg-slate-950 p-4.5 rounded-2xl border border-slate-800 shadow-2xl relative group transition hover:scale-[1.01]">
                <canvas ref={canvasRef} className="w-52 h-52 rounded-xl" />
              </div>

              {/* Tagline / Style Tips */}
              <div className="mt-6 text-center space-y-2">
                <p className="text-white text-sm font-semibold tracking-wide font-sans select-all truncate bg-slate-950/20 px-3 py-1 rounded-lg">
                  {url || 'https://ai.studio/build'}
                </p>
                <p className="text-slate-400 text-xs italic font-mono max-w-[280px] mx-auto leading-relaxed">
                  "{customTagline || 'Ready to scan'}"
                </p>
              </div>
            </div>

            {/* Action Operations */}
            <div className="flex gap-4">
              <button 
                onClick={handleDownload}
                className="flex-1 bg-purple-650 hover:bg-purple-600 bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-98 text-sm shadow-md shadow-purple-500/10"
              >
                <FileDown className="w-4 h-4" /> Download SVG/PNG (Save)
              </button>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(url);
                  setCopySuccess(true);
                  setTimeout(() => setCopySuccess(false), 2000);
                }}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-white font-semibold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors text-sm"
              >
                {copySuccess ? 'Copied Link' : 'Copy Destination'}
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
