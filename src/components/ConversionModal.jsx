import React from 'react';
import { X, ArrowRight, AlertCircle, Loader2, Zap, TrendingUp } from 'lucide-react';
import { GemIcon, VeCoinIcon } from './GemCoinIcons';

const ConversionModal = ({ conversion, currentBalance, onClose, onConfirm, isConverting }) => {
  if (!conversion) return null;

  const gemsAfter = currentBalance.gems - conversion.gems;
  const vesAfter = currentBalance.ves + conversion.ves;
  const canAfford = currentBalance.gems >= conversion.gems;
  const rate = (conversion.ves / conversion.gems).toFixed(2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-backdrop animate-fadeIn">
      <div className="absolute inset-0" onClick={!isConverting ? onClose : undefined} />

      <div
        className="relative w-full max-w-lg rounded-3xl p-6 md:p-8 shadow-2xl z-10 overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #0e0926 0%, #140e32 60%, #180b30 100%)',
          border: '1px solid rgba(168, 85, 247, 0.3)',
          boxShadow: '0 0 60px rgba(168, 85, 247, 0.12), 0 25px 50px rgba(0,0,0,0.6)',
        }}
      >
        {/* Background glows */}
        <div className="absolute top-0 right-0 w-56 h-56 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-amber-500/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between pb-5 border-b border-white/[0.06] relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900/50 border border-purple-500/40 flex items-center justify-center">
              <Zap className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">Confirm Conversion</h3>
              <p className="text-xs text-purple-300/60 mt-0.5">{conversion.type}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            disabled={isConverting}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-all disabled:opacity-50"
            style={{ background: 'rgba(255, 255, 255, 0.06)' }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)'}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Conversion Details */}
        <div className="my-5 relative z-10">
          {/* Main conversion box */}
          <div className="rounded-2xl p-5 mb-4 overflow-hidden relative" style={{ background: 'rgba(8, 6, 22, 0.8)', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
            <div className="text-[11px] font-bold text-slate-500 text-center mb-4 uppercase tracking-widest">
              You are converting
            </div>

            <div className="flex items-center justify-around gap-4">
              {/* Gems */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner" style={{ background: 'rgba(88, 28, 135, 0.3)', border: '1px solid rgba(168, 85, 247, 0.3)' }}>
                  <GemIcon color={conversion.color} size={40} />
                </div>
                <span className="text-2xl font-extrabold text-white">{conversion.gems}</span>
                <span className="text-xs text-slate-400 font-semibold">Gems</span>
              </div>

              {/* Arrow with rate */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(245, 158, 11, 0.2)', border: '1px solid rgba(245, 158, 11, 0.35)' }}>
                  <ArrowRight className="w-5 h-5 text-amber-400" />
                </div>
                <span className="text-[10px] font-bold text-amber-400/80 bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">{rate}x rate</span>
              </div>

              {/* VEs */}
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner" style={{ background: 'rgba(120, 53, 15, 0.3)', border: '1px solid rgba(245, 158, 11, 0.3)' }}>
                  <VeCoinIcon size={40} />
                </div>
                <span className="text-2xl font-extrabold text-amber-300">{conversion.ves}</span>
                <span className="text-xs text-slate-400 font-semibold">VEs</span>
              </div>
            </div>
          </div>

          {/* Balance Preview */}
          <div className="rounded-2xl p-4 mb-4 text-xs" style={{ background: 'rgba(8, 6, 22, 0.6)', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            <div className="flex items-center gap-1.5 mb-3">
              <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">Balance Preview</span>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Current Gems:</span>
                  <span className="font-bold text-white">{currentBalance.gems.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">After conversion:</span>
                  <span className={`font-bold ${gemsAfter < 0 ? 'text-rose-400' : 'text-purple-300'}`}>
                    {gemsAfter.toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">Current VEs:</span>
                  <span className="font-bold text-white">{currentBalance.ves.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-500">After conversion:</span>
                  <span className="font-bold text-emerald-400">{vesAfter.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-xl text-xs" style={{ background: 'rgba(88, 28, 135, 0.15)', border: '1px solid rgba(168, 85, 247, 0.2)' }}>
            <AlertCircle className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
            <span className="text-purple-200/80">
              Conversions are processed immediately and permanently. This action cannot be undone.
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 pt-1 relative z-10">
          <button
            onClick={onClose}
            disabled={isConverting}
            className="flex-1 py-3 rounded-xl font-semibold text-sm text-slate-300 transition-all disabled:opacity-50"
            style={{ background: 'rgba(255, 255, 255, 0.05)' }}
            onMouseEnter={e => !isConverting && (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.09)')}
            onMouseLeave={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={!canAfford || isConverting}
            className={`flex-1 py-3 rounded-xl font-bold text-sm text-white flex items-center justify-center gap-2 transition-all ${
              canAfford && !isConverting
                ? 'hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98]'
                : 'cursor-not-allowed opacity-50'
            }`}
            style={
              canAfford && !isConverting
                ? { background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)' }
                : { background: 'rgba(30, 26, 60, 0.8)' }
            }
          >
            {isConverting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Processing...</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4" />
                <span>Confirm & Convert</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversionModal;
