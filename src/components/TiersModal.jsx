import React from 'react';
import { X, Crown, Check, Zap, Award, Sparkles } from 'lucide-react';

const TiersModal = ({ onClose }) => {
  const tiers = [
    {
      level: 'Levels 1 - 3',
      name: 'Bronze Starter',
      multiplier: '1.0x',
      perks: ['Standard daily exchange limits', 'Community rewards access'],
      active: false
    },
    {
      level: 'Levels 4 - 6',
      name: 'Silver Explorer',
      multiplier: '1.05x',
      perks: ['+5% bonus VEs on all conversions', 'Priority processing'],
      active: false
    },
    {
      level: 'Level 7',
      name: 'Gold Elite (Current: Pallav)',
      multiplier: '1.10x',
      perks: ['+10% bonus VEs on all conversions', 'Instant ledger settlement', '5x daily conversion limit'],
      active: true
    },
    {
      level: 'Levels 8 - 10',
      name: 'Diamond VIP',
      multiplier: '1.20x',
      perks: ['+20% bonus VEs', 'Zero conversion fees', 'Dedicated account manager'],
      active: false
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#140e32] border border-amber-500/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-purple-950/80 z-10 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5 relative z-10 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <Crown className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Reward Tiers & Perks</h3>
              <p className="text-xs text-amber-200/70">Level up to maximize your VE conversion returns</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tier Cards */}
        <div className="overflow-y-auto custom-scrollbar my-4 pr-1 space-y-3 flex-1">
          {tiers.map((t, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border transition-all ${
                t.active
                  ? 'bg-gradient-to-r from-[#211648] to-[#1a113d] border-amber-500/50 shadow-lg shadow-amber-950/30 ring-1 ring-amber-500/40'
                  : 'bg-[#0d0920] border-white/5 opacity-80'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">{t.name}</span>
                  {t.active && (
                    <span className="bg-amber-500/20 text-amber-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-amber-500/40">
                      ACTIVE
                    </span>
                  )}
                </div>
                <span className="font-mono font-bold text-sm text-amber-400">
                  {t.multiplier}
                </span>
              </div>

              <div className="text-[11px] text-slate-400 mb-2 font-mono">
                {t.level}
              </div>

              <div className="space-y-1">
                {t.perks.map((p, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-300">
                    <Check className={`w-3.5 h-3.5 flex-shrink-0 ${t.active ? 'text-amber-400' : 'text-slate-500'}`} />
                    <span>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/5 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/30 transition-all"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default TiersModal;
