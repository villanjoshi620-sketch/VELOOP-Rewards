import React, { useEffect, useState } from 'react';
import { CheckCircle, Sparkles, TrendingUp } from 'lucide-react';
import { GemIcon, VeCoinIcon } from './GemCoinIcons';

const ConversionSuccess = ({ conversion, newBalance, onClose }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 50);
    const t2 = setTimeout(() => setPhase(2), 350);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (!conversion) return null;

  const confettiItems = [
    { color: '#a855f7', left: '20%', cls: 'animate-confetti-1' },
    { color: '#f59e0b', left: '35%', cls: 'animate-confetti-2' },
    { color: '#10b981', left: '50%', cls: 'animate-confetti-3' },
    { color: '#6366f1', left: '65%', cls: 'animate-confetti-4' },
    { color: '#ec4899', left: '80%', cls: 'animate-confetti-5' },
    { color: '#fbbf24', left: '12%', cls: 'animate-confetti-6' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fadeIn">
      <div className="absolute inset-0" onClick={onClose} />

      <div
        className={`relative w-full max-w-md rounded-3xl p-6 md:p-8 shadow-2xl text-center z-10 overflow-hidden transition-all duration-500 ${
          phase >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
        style={{
          background: 'linear-gradient(135deg, #0c1f18 0%, #0a1520 40%, #140e32 100%)',
          border: '1px solid rgba(16, 185, 129, 0.35)',
          boxShadow: '0 0 60px rgba(16, 185, 129, 0.15), 0 25px 50px rgba(0,0,0,0.5)',
        }}
      >
        {/* Confetti */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {phase >= 2 && confettiItems.map((c, i) => (
            <div
              key={i}
              className={`absolute top-4 w-2 h-2 rounded-sm ${c.cls}`}
              style={{ left: c.left, backgroundColor: c.color }}
            />
          ))}
        </div>

        {/* Background glows */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/12 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" />

        {/* Success Icon */}
        <div className={`relative z-10 transition-all duration-500 ${phase >= 2 ? 'animate-success-burst' : 'scale-0 opacity-0'}`}>
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 border-2 border-emerald-400/70 flex items-center justify-center mx-auto mb-4"
            style={{ boxShadow: '0 0 30px rgba(16, 185, 129, 0.4), 0 0 60px rgba(16, 185, 129, 0.15)' }}>
            <CheckCircle className="w-11 h-11 text-emerald-400" />
          </div>
        </div>

        {/* Sparkles */}
        <div className="flex justify-center gap-2 mb-1 relative z-10">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <Sparkles className="w-3 h-3 text-purple-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
          <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
        </div>

        <h3 className="text-2xl font-extrabold text-white mb-1 relative z-10">
          Conversion Complete!
        </h3>
        <p className="text-sm text-emerald-300/90 font-medium mb-6 relative z-10">
          Your VEs have been credited instantly ?
        </p>

        {/* Transaction Summary Card */}
        <div className="relative z-10 rounded-2xl p-5 mb-6 overflow-hidden"
          style={{ background: 'rgba(0, 0, 0, 0.3)', border: '1px solid rgba(255, 255, 255, 0.07)' }}>
          <div className="flex items-center justify-center gap-5 py-2">
            <div className="flex flex-col items-center gap-1.5">
              <GemIcon color={conversion.color} size={32} />
              <span className="font-extrabold text-white text-xl">-{conversion.gems}</span>
              <span className="text-[11px] text-slate-400 font-medium">Gems</span>
            </div>

            <div className="flex flex-col items-center gap-1">
              <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-amber-400" />
              </div>
              <span className="text-[10px] text-slate-500">?</span>
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <VeCoinIcon size={32} />
              <span className="font-extrabold text-amber-300 text-xl">+{conversion.ves}</span>
              <span className="text-[11px] text-slate-400 font-medium">VEs</span>
            </div>
          </div>

          <div className="border-t border-white/5 pt-4 mt-4 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-xl p-3" style={{ background: 'rgba(168, 85, 247, 0.08)', border: '1px solid rgba(168, 85, 247, 0.15)' }}>
              <div className="text-slate-400 mb-1">New Gems Balance</div>
              <div className="font-bold text-white text-base">{newBalance.gems.toLocaleString()}</div>
            </div>
            <div className="rounded-xl p-3" style={{ background: 'rgba(245, 158, 11, 0.08)', border: '1px solid rgba(245, 158, 11, 0.15)' }}>
              <div className="text-slate-400 mb-1">New VEs Balance</div>
              <div className="font-bold text-amber-300 text-base">{newBalance.ves.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="relative z-10 w-full py-3.5 rounded-xl font-bold text-sm text-white shadow-lg transition-all duration-200 active:scale-[0.98] hover:shadow-xl hover:-translate-y-0.5"
          style={{ background: 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #7c3aed 100%)', boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)' }}
        >
          Done — View Balance
        </button>
      </div>
    </div>
  );
};

export default ConversionSuccess;
