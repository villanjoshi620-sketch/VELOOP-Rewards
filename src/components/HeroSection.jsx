import React from 'react';
import { Info, Sparkles, TrendingUp } from 'lucide-react';
import { GemIcon, VeCoinIcon } from './GemCoinIcons';
import heroPortalImg from '../assets/images/hero_portal.jpg';

const HeroSection = ({ balance, onOpenGemsInfo, onOpenVesInfo }) => {
  return (
    <div className="relative rounded-3xl overflow-hidden border border-white/[0.08] shadow-2xl shadow-purple-950/60 mb-8 animate-slideUp" style={{ background: 'linear-gradient(135deg, #0f0a26 0%, #130d30 40%, #160e38 70%, #1a0d3a 100%)' }}>
      {/* Animated background orbs */}
      <div className="absolute top-0 left-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none animate-particle" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-amber-500/10 rounded-full blur-[80px] pointer-events-none animate-particle-delay" />
      <div className="absolute top-1/2 left-0 w-48 h-48 bg-indigo-600/10 rounded-full blur-[60px] pointer-events-none animate-particle-slow" />

      {/* Floating dot particles */}
      <div className="absolute top-8 left-[15%] w-1.5 h-1.5 rounded-full bg-purple-400/60 animate-particle pointer-events-none" />
      <div className="absolute top-16 left-[35%] w-1 h-1 rounded-full bg-amber-400/50 animate-particle-delay pointer-events-none" />
      <div className="absolute bottom-12 left-[20%] w-1 h-1 rounded-full bg-indigo-400/40 animate-particle-slow pointer-events-none" />
      <div className="absolute top-12 right-[38%] w-2 h-2 rounded-full bg-purple-500/30 animate-particle-delay pointer-events-none" />

      {/* Top border gradient line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-12 items-center lg:min-h-[300px]">
        {/* Left Column: Title & Balance Cards */}
        <div className="lg:col-span-7 p-6 sm:p-8 md:p-10 z-10 flex flex-col justify-between">
          <div>
            {/* Platform badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-[11px] font-bold text-purple-300 tracking-wide uppercase">VELOOP Rewards Platform</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight mb-2 leading-tight">
              Exchange Center
            </h1>
            <h2 className="text-xl md:text-2xl font-bold mb-3 gradient-text-mixed leading-tight">
              Turn Your Gems into VEs
            </h2>
            <p className="text-sm md:text-base text-slate-400 max-w-lg mb-8 leading-relaxed">
              Convert your earned Gems into VEs instantly and continue your reward journey with premium multipliers.
            </p>
          </div>

          {/* Two Balance Info Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
            {/* Available Gems Card */}
            <div
              onClick={onOpenGemsInfo}
              className="relative rounded-2xl p-4 flex items-center justify-between backdrop-blur-md cursor-pointer group transition-all duration-300 hover:scale-[1.03] animate-glow-pulse overflow-hidden"
              style={{ background: 'rgba(23, 17, 53, 0.9)', border: '1px solid rgba(168, 85, 247, 0.25)' }}
            >
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-purple-400/50 to-transparent" />

              <div className="relative z-10">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">
                  <span>Available Gems</span>
                  <Info className="w-3 h-3 text-slate-500 group-hover:text-purple-300 transition-colors" />
                </div>
                <div className="text-3xl font-extrabold text-white tracking-tight mb-0.5">
                  {balance.gems.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-purple-400/80 font-medium">
                  <TrendingUp className="w-3 h-3" />
                  <span>Your Reward Gems</span>
                </div>
              </div>
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner glow-purple">
                <GemIcon color="purple" size={40} />
              </div>
            </div>

            {/* Available VEs Card */}
            <div
              onClick={onOpenVesInfo}
              className="relative rounded-2xl p-4 flex items-center justify-between backdrop-blur-md cursor-pointer group transition-all duration-300 hover:scale-[1.03] animate-gold-glow overflow-hidden"
              style={{ background: 'rgba(23, 17, 53, 0.9)', border: '1px solid rgba(245, 158, 11, 0.22)' }}
            >
              <div className="absolute inset-0 animate-shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              <div className="absolute top-0 left-4 right-4 h-[1px] bg-gradient-to-r from-transparent via-amber-400/50 to-transparent" />

              <div className="relative z-10">
                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-semibold mb-1 uppercase tracking-wider">
                  <span>Available VEs</span>
                  <Info className="w-3 h-3 text-slate-500 group-hover:text-amber-300 transition-colors" />
                </div>
                <div className="text-3xl font-extrabold text-amber-300 tracking-tight mb-0.5">
                  {balance.ves.toLocaleString()}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-amber-400/80 font-medium">
                  <TrendingUp className="w-3 h-3" />
                  <span>Your VE Balance</span>
                </div>
              </div>
              <div className="relative z-10 w-14 h-14 rounded-2xl bg-amber-950/60 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-inner glow-gold">
                <VeCoinIcon size={40} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Portal Image */}
        <div className="lg:col-span-5 relative h-48 sm:h-60 lg:h-full lg:min-h-[300px] flex items-center justify-center overflow-hidden">
          <div className="relative w-full h-full flex items-center justify-center">
            <img
              src={heroPortalImg}
              alt="Exchange Center VE Portal"
              className="w-full h-full object-cover object-center max-h-[360px] rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl"
              style={{ filter: 'saturate(1.15) contrast(1.08) brightness(0.95)' }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f0a26] via-[#0f0a26]/55 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0a26]/65 via-transparent to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-purple-900/8 pointer-events-none rounded-b-3xl lg:rounded-b-none lg:rounded-r-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
