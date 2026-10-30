import React from 'react';
import { X, CheckCircle } from 'lucide-react';
import { GemIcon, VeCoinIcon } from './GemCoinIcons';

const CurrencyInfoModal = ({ type = 'gems', balance, onClose, onOpenExchange, onOpenEarn }) => {
  const isGems = type === 'gems';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#140e32] border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-purple-950/80 z-10 overflow-hidden text-center">
        {/* Glow */}
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${
          isGems ? 'bg-purple-600/15' : 'bg-amber-500/15'
        }`} />

        <div className="flex justify-end mb-1">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Currency Icon */}
        <div className="w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-3 bg-[#0d0920] border border-white/5 shadow-inner">
          {isGems ? <GemIcon color="purple" size={44} /> : <VeCoinIcon size={44} />}
        </div>

        <h3 className="text-2xl font-extrabold text-white">
          {isGems ? 'About Gems' : 'About VEs'}
        </h3>
        <p className={`text-xs font-semibold mt-0.5 ${isGems ? 'text-purple-300' : 'text-amber-300'}`}>
          {isGems ? 'VELOOP reward credits' : 'VELOOP reward currency'}
        </p>

        {/* Balance Display */}
        <div className="my-5 bg-[#0d0920] rounded-2xl p-4 border border-white/5 text-left space-y-3">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="text-xs text-slate-400">Your Current Balance</span>
            <span className="text-lg font-extrabold text-white">
              {isGems ? `${balance.gems.toLocaleString()} Gems` : `${balance.ves.toLocaleString()} VEs`}
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            {isGems
              ? 'Gems are reward credits earned through eligible VELOOP activities. Choose an available conversion to exchange them for VEs.'
              : "VEs are VELOOP's virtual reward currency and may be used for eligible redemption options according to platform rules."}
          </p>

          <div className="space-y-1.5 pt-1">
            <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">
              Key Features
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>{isGems ? 'Earned through eligible activities' : 'Added after a successful conversion'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>{isGems ? 'Exchange using listed conversion options' : 'Available for eligible redemptions'}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>{isGems ? 'Balance updates after conversion' : 'Platform rules apply'}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex items-center gap-3">
          {isGems ? (
            <button
              onClick={() => {
                onClose();
                onOpenEarn && onOpenEarn();
              }}
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all duration-200"
            >
              Earn More Gems
            </button>
          ) : (
            <button
              onClick={() => {
                onClose();
                onOpenExchange && onOpenExchange();
              }}
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs shadow-lg shadow-amber-500/30 transition-all duration-200"
            >
              Convert Gems to VEs
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CurrencyInfoModal;
