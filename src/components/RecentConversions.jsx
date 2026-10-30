import React from 'react';
import { History, Check, X, ChevronRight, ExternalLink, Receipt } from 'lucide-react';
import { GemIcon, VeCoinIcon } from './GemCoinIcons';

const colorMap = {
  purple: { bg: 'rgba(168, 85, 247, 0.12)', border: 'rgba(168, 85, 247, 0.25)' },
  blue:   { bg: 'rgba(59, 130, 246, 0.12)',  border: 'rgba(59, 130, 246, 0.25)' },
  green:  { bg: 'rgba(16, 185, 129, 0.12)',  border: 'rgba(16, 185, 129, 0.25)' },
  amber:  { bg: 'rgba(245, 158, 11, 0.12)',  border: 'rgba(245, 158, 11, 0.25)' },
};

const RecentConversions = ({ conversions, onOpenFullHistory, onSelectTransaction }) => {
  const items = conversions.slice(0, 5);

  return (
    <div
      className="rounded-2xl p-6 backdrop-blur-md shadow-xl shadow-purple-950/20 flex flex-col justify-between h-full"
      style={{ background: 'rgba(20, 15, 48, 0.82)', border: '1px solid rgba(255, 255, 255, 0.055)' }}
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(168, 85, 247, 0.18)', border: '1px solid rgba(168, 85, 247, 0.35)' }}>
              <History className="w-4 h-4 text-purple-300" />
            </div>
            <h3 className="font-bold text-white text-lg tracking-wide">Recent Conversions</h3>
          </div>
          <button
            onClick={onOpenFullHistory}
            className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors cursor-pointer flex items-center gap-1 group"
          >
            <span>View All</span>
            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* List of Transactions */}
        <div className="space-y-1">
          {items.map((item) => {
            const isCompleted = item.status === 'Completed';
            const colors = colorMap[item.color] || colorMap.purple;

            return (
              <div
                key={item.id}
                onClick={() => onSelectTransaction?.(item)}
                className="group flex items-center justify-between gap-3 px-3 py-3 rounded-xl transition-all duration-200 cursor-pointer"
                style={{ border: '1px solid transparent' }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.035)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.borderColor = 'transparent';
                }}
                title="Click to view transaction receipt"
              >
                {/* Left: Color dot + icons + rate */}
                <div className="flex items-center gap-3 min-w-0">
                  {/* Color indicator */}
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                    style={{ background: colors.bg, border: `1px solid ${colors.border}` }}
                  >
                    <GemIcon color={item.color || 'purple'} size={18} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                      <span>{item.gems} Gems</span>
                      <span className="text-slate-600">?</span>
                      <span className="text-amber-300">{item.ves} VEs</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 font-mono truncate">{item.date}</div>
                  </div>
                </div>

                {/* Right: Status + receipt icon */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  {isCompleted ? (
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                      style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#34d399', border: '1px solid rgba(16, 185, 129, 0.3)' }}
                    >
                      <Check className="w-3 h-3 stroke-[3]" />
                      <span>Done</span>
                    </span>
                  ) : (
                    <span
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold"
                      style={{ background: 'rgba(239, 68, 68, 0.15)', color: '#f87171', border: '1px solid rgba(239, 68, 68, 0.3)' }}
                    >
                      <X className="w-3 h-3 stroke-[3]" />
                      <span>Failed</span>
                    </span>
                  )}
                  <Receipt className="w-3.5 h-3.5 text-slate-600 group-hover:text-purple-400 transition-colors" />
                </div>
              </div>
            );
          })}

          {items.length === 0 && (
            <div className="text-center py-8 text-slate-500 text-sm">
              No conversions yet. Start converting to see history!
            </div>
          )}
        </div>
      </div>

      {/* Bottom link */}
      <div className="pt-4 mt-2 border-t border-white/[0.05]">
        <button
          onClick={onOpenFullHistory}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-purple-300 transition-colors group cursor-pointer"
        >
          <History className="w-3.5 h-3.5 group-hover:text-purple-400 transition-colors" />
          <span>View Full History</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
};

export default RecentConversions;
