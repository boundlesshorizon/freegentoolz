import React, { useState, useRef, useEffect } from 'react';
import { QrCode, ArrowLeft, Wand2, Sparkles, Activity, FileDown, Layers, Link as LinkIcon, Palette, HelpCircle, Check } from 'lucide-react';
import QRCode from 'qrcode';
import { QrBlendResult } from '../types';

interface QrBlenderProps {
  onBack: () => void;
}

export default function QrBlender({ onBack }: QrBlenderProps) {
  const [url, setUrl] = useState('https://ai.studio/build');
  const [stylePrompt, setStylePrompt] = useState('hyper-slick neon purple cyber punk with futuristic glassmorphism accents');
  const [colorAccent, setColorAccent] = useState('Indigo');
  const [isBlending, setIsBlending] = useState(false);
  const [blendResult, setBlendResult] = useState<QrBlendResult | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Default theme tokens if they haven't blended yet
  const defaultTokens: QrBlendResult = {
    themeName: "Neon Cyberpunk Core",
    bgGradient: "from-slate-950 via-slate-900 to-indigo-950/90",
    glowColor: "shadow-[0_0_30px_rgba(139,92,246,0.2)]",
    qrColor: "#a78bfa",
    borderColor: "border-purple-500/30",
    brandIcon: "sparkles",
    styleTips: "Holographic fusion style. Optimized for mobile cameras."
  };

  const activeTokens = blendResult || defaultTokens;

  // Generate the actual QR code on the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    QRCode.toCanvas(
      canvas,
      url,
      {
        width: 256,
        margin: 2,
        color: {
          dark: activeTokens.qrColor || '#ffffff',
          light: '#030712' // Dark background for the QR container
        },
        errorCorrectionLevel: 'H' // High error correction so it's resilient
      },
      (error) => {
        if (error) console.error("Error generating QR code:", error);
      }
    );
  }, [url, activeTokens.qrColor]);

  const handleBlend = async () => {
    if (!url.trim()) {
      setErrorMessage('Please provide a URL or plain text.');
      return;
    }
    setIsBlending(true);
    setErrorMessage('');
    try {
      const response = await fetch('/api/qr/blend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, stylePrompt, colorAccent })
      });
      if (!response.ok) {
        throw new Error('Creative model is designing elsewhere. Please retry.');
      }
      const data = await response.json();
      setBlendResult(data);
    } catch (err: any) {
      setErrorMessage(err.toString());
    } finally {
      setIsBlending(false);
    }
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `fancy-qr-${activeTokens.themeName.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = dataUrl;
    link.click();
  };

  // Convert icon key to Lucide element
  const renderBrandIcon = () => {
    const iconName = activeTokens.brandIcon.toLowerCase();
    if (iconName.includes('sparkle')) return <Sparkles className="w-6 h-6" />;
    if (iconName.includes('link')) return <LinkIcon className="w-6 h-6" />;
    return <QrCode className="w-6 h-6" />;
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

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 border-b border-slate-800 pb-6">
        <div className="p-4 bg-purple-500/10 rounded-2xl text-purple-400 w-fit">
          <QrCode className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white font-sans tracking-tight">AI Smart QR Blender</h1>
          <p className="text-slate-400 mt-1">Blend dynamic URL destinations with customized generative branding styles curated by Gemini.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 lg:col-span-5 h-fit shadow-sm">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" /> Blender Parameters
          </h3>

          <div className="space-y-4">
            <div>
              <label htmlFor="qr-url-input" className="block text-xs font-semibold text-slate-450 uppercase tracking-wilder mb-2 flex items-center gap-1">
                <LinkIcon className="w-3 h-3" /> Target URL
              </label>
              <input 
                id="qr-url-input"
                type="text"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all placeholder-slate-650"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com"
              />
            </div>

            <div>
              <label htmlFor="qr-color-input" className="block text-xs font-semibold text-slate-450 uppercase tracking-wilder mb-2 flex items-center gap-1">
                <Palette className="w-3 h-3" /> Preferred Core Accent
              </label>
              <select 
                id="qr-color-input"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white text-sm focus:ring-2 focus:ring-purple-500 outline-none transition-all"
                value={colorAccent}
                onChange={(e) => setColorAccent(e.target.value)}
              >
                <option value="Indigo">Electric Indigo</option>
                <option value="Emerald">Neo Pink-Emerald</option>
                <option value="Holographic Slate">Holographic Slate</option>
                <option value="Gold">Monolithic Amber Gold</option>
                <option value="Red">Crimson Cyber Alert</option>
              </select>
            </div>

            <div>
              <label htmlFor="qr-style-prompt" className="block text-xs font-semibold text-slate-450 uppercase tracking-wilder mb-2 flex items-center gap-1">
                <Wand2 className="w-3 h-3" /> Branding & Styling Prompt
              </label>
              <textarea 
                id="qr-style-prompt"
                rows={3}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3.5 text-white text-sm focus:ring-2 focus:ring-purple-500 outline-none resize-none transition-all placeholder-slate-650"
                value={stylePrompt}
                onChange={(e) => setStylePrompt(e.target.value)}
                placeholder="Describe your brand's aesthetic (e.g. vintage warm coffee house, deep neon retro wave)..."
              />
            </div>
          </div>

          <button 
            id="btn-blend-style"
            onClick={handleBlend}
            disabled={isBlending || !url.trim()}
            className="w-full bg-purple-600 hover:bg-purple-500 active:scale-[0.98] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer shadow-lg shadow-purple-650/10"
          >
            {isBlending ? (
              <><Activity className="w-5 h-5 animate-spin" /> Curating Style Tokens...</>
            ) : (
              <><Sparkles className="w-5 h-5 text-yellow-300" /> Assemble Brand QR</>
            )}
          </button>

          {errorMessage && (
            <p className="text-xs text-red-400 font-medium text-center">{errorMessage}</p>
          )}
        </div>

        {/* Live Presentation Layer */}
        <div className="lg:col-span-7 flex flex-col justify-center items-center">
          {isBlending ? (
            <div className="w-full max-w-md aspect-square bg-slate-900/40 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-purple-400 p-8 text-center space-y-4">
              <Activity className="w-12 h-12 animate-pulse text-purple-400" />
              <p className="font-mono text-sm tracking-widest uppercase">GENERATING THEME MATRICES...</p>
              <p className="text-xs text-slate-500">
                Gemini is choosing high-contrast hex variables and designing gradients with optimal scan properties.
              </p>
            </div>
          ) : (
            <div className="w-full max-w-md space-y-6">
              {/* The Styled Brand Card */}
              <div className={`bg-gradient-to-br ${activeTokens.bgGradient} border ${activeTokens.borderColor} rounded-3xl p-8 ${activeTokens.glowColor} transition-all duration-700 flex flex-col items-center relative overflow-hidden backdrop-blur-md`}>
                
                {/* Visual Glass Ring Decoration */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-purple-500/10 rounded-full blur-xl pointer-events-none" />

                {/* Theme Name Header */}
                <div className="flex items-center gap-2 mb-6">
                  {renderBrandIcon()}
                  <span className="font-mono text-xs font-bold uppercase tracking-widest text-slate-300">
                    {activeTokens.themeName}
                  </span>
                </div>

                {/* QR Canvas Container */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 shadow-xl relative group">
                  <canvas ref={canvasRef} className="w-52 h-52 rounded-lg" />
                </div>

                {/* Tagline / Style Tips */}
                <div className="mt-6 text-center">
                  <p className="text-white text-sm font-semibold tracking-wide">
                    {url}
                  </p>
                  <p className="text-slate-400 text-xs mt-2 italic font-mono max-w-[280px] mx-auto">
                    "{activeTokens.styleTips}"
                  </p>
                </div>
              </div>

              {/* Action Operations */}
              <div className="flex gap-4">
                <button 
                  onClick={handleDownload}
                  className="flex-1 bg-slate-900 hover:bg-slate-800 border border-slate-850 text-white font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors text-sm"
                >
                  <FileDown className="w-4 h-4 text-purple-400" /> Save Code (PNG)
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(url);
                    setCopySuccess(true);
                    setTimeout(() => setCopySuccess(false), 2000);
                  }}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-850 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer transition-colors text-sm"
                >
                  {copySuccess ? 'Copied Link' : 'Copy Destination'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
