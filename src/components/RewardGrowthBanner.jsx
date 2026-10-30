import React from 'react';
import { Crown, ArrowRight, Sparkles } from 'lucide-react';
import treasureChestImg from '../assets/images/treasure_chest.jpg';

const RewardGrowthBanner = ({ onOpenTiers }) => {
  return (
    <div
      onClick={onOpenTiers}
      className="relative rounded-2xl p-5 flex items-center justify-between overflow-hidden shadow-2xl mt-6 cursor-pointer group transition-all duration-300 hover:scale-[1.015] hover:-translate-y-1.5"
      style={{
        background: 'radial-gradient(ellipse 90% 80% at 75% 50%, rgba(245, 158, 11, 0.14) 0%, transparent 60%), linear-gradient(135deg, #1c113b 0%, #1a0e44 40%, #180c35 70%, #120829 100%)',
        border: '1px solid rgba(168, 85, 247, 0.28)',
        boxShadow: '0 12px 36px rgba(5, 3, 18, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.08)'
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.55)';
        e.currentTarget.style.boxShadow = '0 18px 45px rgba(217, 119, 6, 0.25), 0 0 20px rgba(168, 85, 247, 0.2)';
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.28)';
        e.currentTarget.style.boxShadow = '0 12px 36px rgba(5, 3, 18, 0.45), inset 0 1px 1px rgba(255, 255, 255, 0.08)';
      }}
      role="button"
      tabIndex={0}
      aria-label="View Tier Perks banner: The more Gems you have, the better the rewards!"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenTiers?.();
        }
      }}
    >
      {/* Animated glow orbs */}
      <div className="absolute left-8 top-0 w-52 h-52 bg-amber-500/15 rounded-full blur-2xl pointer-events-none animate-particle" />
      <div className="absolute right-24 top-0 w-52 h-52 bg-purple-500/18 rounded-full blur-2xl pointer-events-none animate-particle-delay" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400/60 to-transparent pointer-events-none" />
      <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none" />

      <div className="flex items-center gap-4 z-10 flex-1 min-w-0">
        {/* Crown Icon with gold glow */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-115 transition-transform duration-300"
          style={{
            background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.25), rgba(217, 119, 6, 0.15))',
            border: '1px solid rgba(245, 158, 11, 0.45)',
            boxShadow: '0 0 16px rgba(245, 158, 11, 0.3)'
          }}
        >
          <Crown className="w-6 h-6 text-amber-300" style={{ filter: 'drop-shadow(0 0 8px rgba(245, 158, 11, 0.8))' }} />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-purple-400 flex-shrink-0" />
            <h4 className="text-sm md:text-base font-extrabold text-white tracking-wide group-hover:text-amber-200 transition-colors truncate">
              The more Gems you have, the better the rewards!
            </h4>
          </div>
          <div className="flex items-center gap-3 mt-1">
            <p className="text-xs text-purple-200/70">Keep earning and unlock higher multiplier tiers.</p>
            <span className="text-[11px] font-bold text-amber-400 flex items-center gap-1 flex-shrink-0 group-hover:translate-x-1.5 transition-transform">
              <span>View Tier Perks</span>
              <ArrowRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>

      {/* Floating Treasure Chest */}
      <div className="relative w-20 h-16 md:w-24 md:h-20 flex-shrink-0 z-10 flex items-center justify-center">
        <img
          src={treasureChestImg}
          alt="Treasure Chest"
          className="w-full h-full object-contain animate-float group-hover:scale-115 transition-transform duration-300"
          style={{ filter: 'drop-shadow(0 0 16px rgba(245, 158, 11, 0.65))' }}
        />
      </div>
    </div>
  );
};

export default RewardGrowthBanner;
