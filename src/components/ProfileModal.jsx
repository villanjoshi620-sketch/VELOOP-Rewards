import React, { useState } from 'react';
import { X, Copy, Check, Shield, Award, Calendar, LogOut, Wallet } from 'lucide-react';
import { userProfile } from '../data/exchangeData';
import { GemIcon, VeCoinIcon } from './GemCoinIcons';

const ProfileModal = ({ balance, onClose, onShowToast }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyWallet = () => {
    navigator.clipboard?.writeText(userProfile.walletAddress);
    setCopied(true);
    onShowToast('Wallet address copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#140e32] border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-purple-950/80 z-10 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5 relative z-10">
          <h3 className="text-xl font-extrabold text-white">
            User Profile
          </h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Card */}
        <div className="my-6 space-y-5 relative z-10">
          <div className="flex items-center gap-4 bg-[#0d0920] p-4 rounded-2xl border border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 via-indigo-600 to-amber-400 p-[2px] shadow-lg shadow-purple-900/40">
              <div className="w-full h-full bg-[#120d2a] rounded-[14px] flex items-center justify-center font-extrabold text-white text-2xl">
                {userProfile.avatarChar}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-xl font-bold text-white">{userProfile.name}</h4>
                <span className="bg-purple-500/20 text-purple-300 text-xs font-bold px-2 py-0.5 rounded-full border border-purple-500/40">
                  {userProfile.level}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                Veloop ID: {userProfile.id}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] text-amber-400/90 font-medium mt-1">
                <Award className="w-3.5 h-3.5" />
                <span>Gold Tier Member (+10% Bonus)</span>
              </div>
            </div>
          </div>

          {/* Level Progress */}
          <div className="bg-[#0d0920]/70 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-slate-400">Level 7 Progress</span>
              <span className="text-purple-300 font-bold">7,450 / 10,000 XP</span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-500 via-indigo-500 to-amber-400 w-[74.5%] rounded-full shadow-[0_0_8px_#a855f7]" />
            </div>
            <p className="text-[11px] text-slate-500 mt-2">
              Earn 2,550 more XP to unlock Level 8 Diamond Tier.
            </p>
          </div>

          {/* Wallet Address Box */}
          <div className="bg-[#0d0920]/70 p-4 rounded-2xl border border-white/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-slate-400 flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-purple-400" />
                Connected Wallet
              </span>
              <button
                onClick={handleCopyWallet}
                className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 font-semibold transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="font-mono text-xs text-slate-300 truncate bg-[#161131] p-2.5 rounded-xl border border-white/5">
              {userProfile.walletAddress}
            </div>
          </div>

          {/* Balance Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[#0d0920]/70 p-3.5 rounded-2xl border border-purple-500/20 flex items-center gap-3">
              <GemIcon color="purple" size={28} />
              <div>
                <div className="text-[11px] text-slate-400">Current Gems</div>
                <div className="text-base font-bold text-white">{balance.gems.toLocaleString()}</div>
              </div>
            </div>
            <div className="bg-[#0d0920]/70 p-3.5 rounded-2xl border border-amber-500/20 flex items-center gap-3">
              <VeCoinIcon size={28} />
              <div>
                <div className="text-[11px] text-slate-400">Current VEs</div>
                <div className="text-base font-bold text-amber-300">{balance.ves.toLocaleString()}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-2 flex items-center gap-3 border-t border-white/5 relative z-10">
          <button
            onClick={() => {
              onShowToast('Account settings updated', 'info');
              onClose();
            }}
            className="flex-1 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs transition-colors"
          >
            Edit Settings
          </button>
          <button
            onClick={() => {
              onShowToast('Logged out successfully', 'info');
              onClose();
            }}
            className="px-4 py-3 rounded-xl bg-white/5 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 font-semibold text-xs transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
