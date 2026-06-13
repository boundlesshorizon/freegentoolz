import React, { useState } from 'react';
import { Activity, ArrowLeft, Layers, Sparkles, Scale, Info, Check } from 'lucide-react';

interface BmiCalculatorProps {
  onBack: () => void;
}

export default function BmiCalculator({ onBack }: BmiCalculatorProps) {
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  
  // Metric States
  const [weightKg, setWeightKg] = useState('70');
  const [heightCm, setHeightCm] = useState('175');

  // Imperial States
  const [weightLbs, setWeightLbs] = useState('154');
  const [heightFt, setHeightFt] = useState('5');
  const [heightIn, setHeightIn] = useState('9');

  const calculateBmi = (): number | null => {
    if (unitSystem === 'metric') {
      const w = parseFloat(weightKg);
      const h = parseFloat(heightCm) / 100;
      if (w > 0 && h > 0) {
        return Number((w / (h * h)).toFixed(1));
      }
    } else {
      const w = parseFloat(weightLbs);
      const ft = parseFloat(heightFt) || 0;
      const inch = parseFloat(heightIn) || 0;
      const totalInches = (ft * 12) + inch;
      if (w > 0 && totalInches > 0) {
        return Number(((w / (totalInches * totalInches)) * 703).toFixed(1));
      }
    }
    return null;
  };

  const bmi = calculateBmi();

  const getWeightStatus = (val: number | null) => {
    if (!val) return { label: 'Awaiting values', color: 'text-slate-400', bg: 'bg-slate-805', message: 'Enter height and weight values to initiate analytics.', percent: 0 };
    if (val < 18.5) return { 
      label: 'Underweight', 
      color: 'text-blue-400', 
      bg: 'bg-blue-500/10 border-blue-500/20', 
      message: 'Your current BMI suggests minimal lipid coverage. Consider consulting a dietitian to construct a structured calorie-rich program.',
      percent: Math.min((val / 40) * 100, 100)
    };
    if (val < 25.0) return { 
      label: 'Normal/Healthy', 
      color: 'text-emerald-400', 
      bg: 'bg-emerald-500/10 border-emerald-500/20', 
      message: 'Incredible! You occupy the premium medical body mass percentile. Maintain structural active routines and balanced metabolic nutrients.',
      percent: Math.min((val / 40) * 100, 100)
    };
    if (val < 30.0) return { 
      label: 'Overweight', 
      color: 'text-yellow-400', 
      bg: 'bg-yellow-500/10 border-yellow-500/20', 
      message: 'Slight muscle/lipid density increase detected. Modifying caloric intake limits and elevating weekly cardiovascular resistance loops is recommended.',
      percent: Math.min((val / 40) * 100, 100)
    };
    return { 
      label: 'Obese Range', 
      color: 'text-red-400', 
      bg: 'bg-red-500/10 border-red-500/20', 
      message: 'Body mass ratio indicates health elevation challenges. Formulating structured guidance with registered healthcare practitioners is highly advised.',
      percent: Math.min((val / 40) * 100, 100)
    };
  };

  const status = getWeightStatus(bmi);

  return (
    <div id="bmi-calculator-root" className="max-w-5xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
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
          <Activity className="w-10 h-10" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white font-sans tracking-tight">Smart BMI Calculator</h1>
          <p className="text-slate-400 mt-1">Instant anatomical body mass calculations paired with diagnostic healthy scale ranges.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Unit Selector & Input Form */}
        <div className="lg:col-span-4 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 h-fit shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-400" /> Human metrics
            </h3>
            {/* Unit Toggle */}
            <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-850">
              <button 
                onClick={() => setUnitSystem('metric')}
                className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md transition ${unitSystem === 'metric' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300 pointer-events-auto cursor-pointer'}`}
              >
                Metric
              </button>
              <button 
                onClick={() => setUnitSystem('imperial')}
                className={`text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md transition ${unitSystem === 'imperial' ? 'bg-slate-800 text-white' : 'text-slate-500 hover:text-slate-300 pointer-events-auto cursor-pointer'}`}
              >
                Imperial
              </button>
            </div>
          </div>

          <div className="space-y-4 pt-1">
            {unitSystem === 'metric' ? (
              <>
                <div>
                  <label htmlFor="height-cm" className="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2">Height (Centimeters)</label>
                  <div className="relative">
                    <input 
                      id="height-cm"
                      type="number" 
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl py-3 pl-4 pr-12 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-base"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      placeholder="e.g. 175"
                    />
                    <span className="text-xs text-slate-500 absolute right-4 top-3.5 font-mono">cm</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="weight-kg" className="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2">Weight (Kilograms)</label>
                  <div className="relative">
                    <input 
                      id="weight-kg"
                      type="number" 
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl py-3 pl-4 pr-12 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-base"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      placeholder="e.g. 70"
                    />
                    <span className="text-xs text-slate-500 absolute right-4 top-3.5 font-mono">kg</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2">Height (Feet & Inches)</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="relative">
                      <input 
                        type="number" 
                        aria-label="Height in feet"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl py-3 pl-4 pr-10 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-base"
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                        placeholder="5"
                      />
                      <span className="text-xs text-slate-500 absolute right-4 top-3.5 font-mono">ft</span>
                    </div>
                    <div className="relative">
                      <input 
                        type="number" 
                        aria-label="Height in inches"
                        className="w-full bg-slate-950 border border-slate-850 rounded-xl py-3 pl-4 pr-10 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-base"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        placeholder="9"
                      />
                      <span className="text-xs text-slate-500 absolute right-4 top-3.5 font-mono">in</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="weight-lbs" className="block text-xs font-semibold text-slate-450 uppercase tracking-wider mb-2">Weight (Pounds)</label>
                  <div className="relative">
                    <input 
                      id="weight-lbs"
                      type="number" 
                      className="w-full bg-slate-950 border border-slate-850 rounded-xl py-3 pl-4 pr-12 text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 font-mono text-base"
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(e.target.value)}
                      placeholder="154"
                    />
                    <span className="text-xs text-slate-500 absolute right-4 top-3.5 font-mono">lbs</span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Live BMI Gauge & Recommendations */}
        <div className="lg:col-span-8 bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col justify-between space-y-8">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 font-mono">Calculated Health Index</span>
            
            <div className="flex items-baseline gap-4 mt-2">
              <h2 className="text-6x1 md:text-7xl font-extrabold text-white font-sans tracking-tight leading-none">
                {bmi ? bmi : '--.-'}
              </h2>
              <div>
                <span className={`text-base md:text-lg font-bold font-sans tracking-wide block ${status.color}`}>
                  {status.label}
                </span>
                <span className="text-[10px] text-slate-550 block font-mono">Anatomical Body Mass Density Index</span>
              </div>
            </div>
          </div>

          {/* Visual BMI Slider scale */}
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-mono font-bold text-slate-500 tracking-wide uppercase px-1">
              <span>Underweight</span>
              <span>Healthy</span>
              <span>Overweight</span>
              <span>Clinical Obese</span>
            </div>
            
            {/* Progress needle track */}
            <div className="w-full h-8 bg-gradient-to-r from-blue-500 via-emerald-505 via-yellow-500 to-red-500 rounded-2xl relative shadow-inner overflow-visible">
              {/* Scale Tick lines */}
              <div className="absolute left-[46.25%] top-0 w-0.5 h-full bg-slate-950/20" title="18.5 limit" />
              <div className="absolute left-[62.5%] top-0 w-0.5 h-full bg-slate-950/20" title="25.0 limit" />
              <div className="absolute left-[75%] top-0 w-0.5 h-full bg-slate-950/20" title="30.0 limit" />

              {/* Indicator Needle */}
              {bmi && (
                <div 
                  className="absolute -top-1 w-6 h-10 bg-white border-2 border-slate-950 rounded-lg shadow-xl flex items-center justify-center -translate-x-1/2 transition-all duration-700 select-none cursor-default"
                  style={{ left: `${Math.min(Math.max((bmi / 40) * 100, 5), 95)}%` }}
                >
                  <div className="w-1 h-6 bg-slate-950 rounded-full" />
                </div>
              )}
            </div>

            <div className="flex justify-between text-[9px] text-slate-600 font-mono px-1">
              <span>0.0</span>
              <span>18.5 limit</span>
              <span>25.0 limit</span>
              <span>30.0 limit</span>
              <span>40.0+</span>
            </div>
          </div>

          {/* Diagnostic status advice card */}
          <div className={`border p-6 rounded-2xl relative overflow-hidden transition-all duration-700 ${status.bg || 'bg-slate-950 border-slate-850'}`}>
            <h3 className="font-bold text-white mb-2 text-sm uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" /> AI Metabolic Diagnostic Insights
            </h3>
            <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
              {status.message}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
