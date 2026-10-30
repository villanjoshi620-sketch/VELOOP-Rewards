import React, { useState } from 'react';
import { Zap, Lock, Sparkles, Plus, ArrowRight } from 'lucide-react';
import { VeCoinIcon } from './GemCoinIcons';
import DiamondGemIcon from './DiamondGemIcon';

const entranceClasses = ['card-entrance-1', 'card-entrance-2', 'card-entrance-3', 'card-entrance-4'];

const ConversionCard = ({ conversion, balance, onConvert, onEarnGems, index = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const requiredGems = conversion.requiredGems ?? conversion.gems ?? 0;
  const receiveVEs = conversion.receiveVEs ?? conversion.ves ?? 0;
  const availableGems = balance?.gems ?? 0;
  const isAvailable = availableGems >= requiredGems;
  const missingGems = Math.max(0, requiredGems - availableGems);
  const rate = conversion.multiplier || `${(receiveVEs / (requiredGems || 1)).toFixed(1)}x`;
  const progressPercent = Math.min(100, Math.max(0, Math.round((availableGems / (requiredGems || 1)) * 100)));

  const colorStyles = {
    purple: {
      card: 'border-purple-500/35 hover:border-purple-400/80',
      cardBg: 'from-[#1e0f38] via-[#140a28] to-[#0c051a]',
      badge: 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white',
      badgeShadow: 'shadow-purple-700/50',
      glow: 'shadow-purple-900/50 hover:shadow-purple-600/30',
      gemAmt: 'text-purple-300',
      vesAmt: 'text-amber-300',
      btn: 'from-purple-600 to-indigo-700 hover:from-purple-500 hover:to-indigo-600 shadow-purple-700/40',
      arrowColor: 'text-purple-400',
      innerGlow: 'from-purple-600/18 to-transparent',
      topLine: 'via-purple-400',
      rateColor: 'text-purple-300',
      rateBg: 'bg-purple-500/15 border-purple-500/30',
      glowFilter: 'drop-shadow(0 0 18px rgba(168, 85, 247, 0.65))',
    },
    blue: {
      card: 'border-blue-500/35 hover:border-blue-400/80',
      cardBg: 'from-[#0a2347] via-[#06152e] to-[#030d1d]',
      badge: 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white',
      badgeShadow: 'shadow-blue-700/50',
      glow: 'shadow-blue-900/50 hover:shadow-blue-600/30',
      gemAmt: 'text-blue-300',
      vesAmt: 'text-amber-300',
      btn: 'from-blue-600 to-cyan-700 hover:from-blue-500 hover:to-cyan-600 shadow-blue-700/40',
      arrowColor: 'text-blue-400',
      innerGlow: 'from-blue-600/18 to-transparent',
      topLine: 'via-blue-400',
      rateColor: 'text-blue-300',
      rateBg: 'bg-blue-500/15 border-blue-500/30',
      glowFilter: 'drop-shadow(0 0 18px rgba(59, 130, 246, 0.65))',
    },
    green: {
      card: 'border-emerald-500/35 hover:border-emerald-400/80',
      cardBg: 'from-[#0a2c20] via-[#061c15] to-[#03110d]',
      badge: 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white',
      badgeShadow: 'shadow-emerald-700/50',
      glow: 'shadow-emerald-900/50 hover:shadow-emerald-600/30',
      gemAmt: 'text-emerald-300',
      vesAmt: 'text-amber-300',
      btn: 'from-teal-600 to-emerald-700 hover:from-teal-500 hover:to-emerald-600 shadow-emerald-700/40',
      arrowColor: 'text-emerald-400',
      innerGlow: 'from-emerald-600/18 to-transparent',
      topLine: 'via-emerald-400',
      rateColor: 'text-emerald-300',
      rateBg: 'bg-emerald-500/15 border-emerald-500/30',
      glowFilter: 'drop-shadow(0 0 18px rgba(16, 185, 129, 0.65))',
    },
    amber: {
      card: 'border-amber-500/35 hover:border-amber-400/80',
      cardBg: 'from-[#2c1c08] via-[#1a1104] to-[#100a02]',
      badge: 'bg-gradient-to-r from-amber-500 to-orange-600 text-black font-extrabold',
      badgeShadow: 'shadow-amber-700/50',
      glow: 'shadow-amber-900/50 hover:shadow-amber-600/30',
      gemAmt: 'text-amber-300',
      vesAmt: 'text-amber-200',
      btn: 'from-amber-500 to-orange-700 hover:from-amber-400 hover:to-orange-600 shadow-amber-700/40 text-black font-extrabold',
      arrowColor: 'text-amber-400',
      innerGlow: 'from-amber-600/18 to-transparent',
      topLine: 'via-amber-400',
      rateColor: 'text-amber-300',
      rateBg: 'bg-amber-500/15 border-amber-500/30',
      glowFilter: 'drop-shadow(0 0 18px rgba(245, 158, 11, 0.65))',
    },
  };

  const style = colorStyles[conversion.color] || colorStyles.purple;
  const entranceClass = entranceClasses[index % 4];

  return (
    <div
      className={`relative rounded-2xl border ${style.card} bg-gradient-to-b ${style.cardBg} flex flex-col shadow-xl ${style.glow} group overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${entranceClass}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Top accent line */}
      <div className={`absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent ${style.topLine} to-transparent pointer-events-none z-20`} />

      {/* Subtle radial inner glow */}
      <div className={`absolute inset-0 bg-gradient-to-b ${style.innerGlow} pointer-events-none rounded-2xl`} />

      {/* Shimmer on hover */}
      <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

      {/* Top row: badge & rate pill */}
      <div className="flex items-center justify-between p-3.5 pb-0 relative z-20">
        {conversion.badge ? (
          <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full ${style.badge} shadow-md ${style.badgeShadow} tracking-wide flex items-center gap-1`}>
            <Sparkles className="w-3 h-3" />
            {conversion.badge}
          </span>
        ) : (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
            Tier {index + 1}
          </span>
        )}

        <div className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${style.rateBg} ${style.rateColor} flex items-center gap-1`}>
          <Sparkles className="w-3 h-3" />
          {rate} rate
        </div>
      </div>

      {/* HERO ROW: Gem ➔ Arrow ➔ VE Coin */}
      <div className="flex items-center justify-center gap-4 pt-5 pb-3 px-6 relative z-10">
        <div
          className="transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1.5"
          style={{ filter: isHovered ? style.glowFilter : 'none' }}
        >
          <DiamondGemIcon color={conversion.color} size={50} />
        </div>

        {/* Animated arrow */}
        <div className="flex flex-col items-center gap-0.5">
          <svg width="24" height="16" viewBox="0 0 24 16" fill="none" className={`${style.arrowColor} flex-shrink-0 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`}>
            <path d="M1 8H23M23 8L16 1M23 8L16 15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className={`text-[9px] font-bold ${style.arrowColor} opacity-80`}>SWAP</div>
        </div>

        <div
          className="transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1.5"
          style={{ filter: isHovered ? 'drop-shadow(0 0 16px rgba(245, 158, 11, 0.7))' : 'none' }}
        >
          <VeCoinIcon size={46} />
        </div>
      </div>

      {/* Card Type label */}
      <p className="text-center text-[11px] text-slate-400 font-semibold px-4 pb-1 relative z-10 uppercase tracking-widest">
        {conversion.name || conversion.type}
      </p>

      {/* Divider */}
      <div className="mx-5 h-[1px] bg-white/10 mb-2" />

      {/* Amounts */}
      <div className="flex items-center justify-center gap-2 px-4 pb-2 relative z-10">
        <span className={`text-xl font-extrabold ${style.gemAmt} tracking-tight`}>
          {requiredGems.toLocaleString()} <span className="text-xs font-bold opacity-80">Gems</span>
        </span>
        <ArrowRight className="w-4 h-4 text-slate-500" />
        <span className={`text-xl font-extrabold ${style.vesAmt} tracking-tight`}>
          {receiveVEs.toLocaleString()} <span className="text-xs font-bold opacity-80">VEs</span>
        </span>
      </div>

      {/* Description */}
      <p className="text-[11px] text-slate-400 text-center px-4 pb-3 leading-relaxed relative z-10 min-h-[32px] flex items-center justify-center">
        {conversion.description}
      </p>

      {/* Usability Progress Bar for Insufficient Balance */}
      {!isAvailable && (
        <div className="mx-4 mb-3 p-2 rounded-xl bg-black/30 border border-white/5 relative z-10">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 mb-1">
            <span>Unlock Progress</span>
            <span className="text-purple-300">{progressPercent}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* Action Button */}
      <div className="px-4 pb-4 mt-auto relative z-10">
        {isAvailable ? (
          <button
            onClick={() => onConvert(conversion)}
            className={`w-full py-2.5 rounded-xl font-bold text-sm text-white transition-all duration-200 flex items-center justify-center gap-2 bg-gradient-to-r ${style.btn} cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-[0.98]`}
          >
            <Zap className="w-4 h-4" />
            <span>Convert Rewards</span>
          </button>
        ) : (
          <button
            onClick={() => onEarnGems ? onEarnGems() : onConvert(conversion)}
            className="w-full py-2.5 rounded-xl font-bold text-xs text-white bg-slate-800/90 hover:bg-slate-700/90 border border-white/10 transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-md hover:-translate-y-0.5"
          >
            <Plus className="w-3.5 h-3.5 text-purple-400" />
            <span>Get {missingGems.toLocaleString()} More Gems</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default ConversionCard;
