export type ViewType = 'home' | 'lotto' | 'fancytext' | 'qrblender' | 'symbols' | 'seo' | 'case' | 'bmi';

export interface LottoResult {
  combinations: string[][];
  analysis: string;
}

export interface StylistResult {
  tiktok: string;
  instagram: string;
  youtube: string;
}

export interface QrBlendResult {
  themeName: string;
  bgGradient: string;
  glowColor: string;
  qrColor: string;
  borderColor: string;
  brandIcon: string;
  styleTips: string;
}

export interface ThemePreset {
  name: string;
  gradient: string;
  from: string;
  to: string;
  accent: string;
}
