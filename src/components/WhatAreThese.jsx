import React from 'react';
import { Info, ChevronRight, HelpCircle } from 'lucide-react';
import { GemIcon, VeCoinIcon } from './GemCoinIcons';

const WhatAreThese = ({ onOpenRules, onOpenGemsInfo, onOpenVesInfo }) => {
  return (
    <div
      className="relative rounded-2xl p-6 backdrop-blur-xl shadow-xl flex flex-col justify-between h-full overflow-hidden transition-all duration-300"
      style={{
        background: 'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(168, 85, 247, 0.12), transparent 70%), linear-gradient(160deg, rgba(22, 16, 46, 0.88), rgba(13, 9, 28, 0.94))',
        border: '1px solid rgba(168, 85, 247, 0.22)',
        boxShadow: '0 10px 30px rgba(5, 3, 16, 0.35), inset 0 1px 1px rgba(255, 255, 255, 0.06)'
      }}
    >
      {/* Top accent illumination */}
      <div
        className="absolute top-0 left-10 right-10 h-[2px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent, #c084fc, transparent)',
          opacity: 0.7
        }}
      />

      <div>
        {/* Header */}
        <div className="flex items-center gap-2.5 mb-5">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center shadow-md transition-transform duration-300 hover:scale-110"
            style={{
              background: 'rgba(168, 85, 247, 0.18)',
              border: '1px solid rgba(168, 85, 247, 0.35)',
              boxShadow: '0 0 12px rgba(168, 85, 247, 0.25)'
            }}
          >
            <HelpCircle className="w-4 h-4 text-purple-300" />
          </div>
          <h3 className="font-extrabold text-white text-base tracking-tight">What are these?</h3>
        </div>

        <div className="space-y-3.5">
          {/* Gems Explanation */}
          <button
            type="button"
            aria-label="Learn what Gems are"
            onClick={onOpenGemsInfo}
            className="flex w-full items-start gap-3.5 p-3.5 rounded-xl text-left cursor-pointer transition-all duration-250 group relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(145deg, rgba(28, 17, 54, 0.75), rgba(18, 10, 36, 0.85))',
              border: '1px solid rgba(168, 85, 247, 0.24)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(192, 132, 252, 0.6)';
              e.currentTarget.style.boxShadow = '0 8px 22px rgba(147, 51, 234, 0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.24)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.2)';
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center p-1.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-115 group-hover:-translate-y-0.5"
              style={{
                background: 'rgba(88, 28, 135, 0.45)',
                border: '1px solid rgba(168, 85, 247, 0.35)',
                boxShadow: '0 0 10px rgba(168, 85, 247, 0.3)'
              }}
            >
              <GemIcon color="purple" size={30} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-white text-sm group-hover:text-purple-200 transition-colors">Gems</span>
                  <Info className="w-3.5 h-3.5 text-slate-400 group-hover:text-purple-400 transition-colors" />
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-300 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                Gems are reward credits earned through eligible activities on VELOOP Rewards.
              </p>
            </div>
          </button>

          {/* VEs Explanation */}
          <button
            type="button"
            aria-label="Learn what VEs are"
            onClick={onOpenVesInfo}
            className="flex w-full items-start gap-3.5 p-3.5 rounded-xl text-left cursor-pointer transition-all duration-250 group relative overflow-hidden focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 hover:-translate-y-1"
            style={{
              background: 'linear-gradient(145deg, rgba(38, 24, 8, 0.75), rgba(20, 12, 4, 0.85))',
              border: '1px solid rgba(245, 158, 11, 0.24)',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.2)'
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderColor = 'rgba(251, 191, 36, 0.6)';
              e.currentTarget.style.boxShadow = '0 8px 22px rgba(217, 119, 6, 0.25)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.24)';
              e.currentTarget.style.boxShadow = '0 4px 14px rgba(0, 0, 0, 0.2)';
            }}
          >
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center p-1.5 flex-shrink-0 transition-transform duration-300 group-hover:scale-115 group-hover:-translate-y-0.5"
              style={{
                background: 'rgba(120, 53, 15, 0.45)',
                border: '1px solid rgba(245, 158, 11, 0.35)',
                boxShadow: '0 0 10px rgba(245, 158, 11, 0.3)'
              }}
            >
              <VeCoinIcon size={30} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-amber-300 text-sm group-hover:text-amber-200 transition-colors">VEs</span>
                  <Info className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-colors" />
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-amber-300 group-hover:translate-x-1 transition-all" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                VEs are VELOOP's virtual reward currency used for eligible redemptions according to platform rules.
              </p>
            </div>
          </button>
        </div>
      </div>

      {/* Link to Rules */}
      <div className="pt-4 mt-4 border-t border-white/[0.08]">
        <button
          onClick={onOpenRules}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-purple-300 transition-colors group cursor-pointer"
        >
          <span>View All Rules</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default WhatAreThese;
