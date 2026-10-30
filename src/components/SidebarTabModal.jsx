import React, { useState } from 'react';
import { 
  X, 
  Wallet, 
  Gift, 
  TrendingUp, 
  Users, 
  HelpCircle, 
  Copy, 
  Check, 
  Send, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Share2, 
  MessageCircle,
  ExternalLink
} from 'lucide-react';
import { userProfile } from '../data/exchangeData';
import { GemIcon, VeCoinIcon } from './GemCoinIcons';

const SidebarTabModal = ({ tab, balance, onClose, onShowToast, onSwitchToExchange }) => {
  const [copied, setCopied] = useState(false);
  const [supportMessage, setSupportMessage] = useState('');
  const [supportSubmitted, setSupportSubmitted] = useState(false);

  const copyRefLink = () => {
    navigator.clipboard?.writeText(`https://veloop.io/ref/${userProfile.name.toLowerCase()}-${userProfile.id}`);
    setCopied(true);
    onShowToast('Referral link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

  const renderContent = () => {
    switch (tab) {
      case 'wallet':
        return (
          <div className="space-y-4">
            <div className="bg-[#0d0920] p-4 rounded-2xl border border-white/5">
              <div className="text-xs text-slate-400 mb-1">Total Estimated Value</div>
              <div className="text-2xl font-extrabold text-white">
                ≈ ${(balance.gems * 0.25 + balance.ves * 0.1).toFixed(2)} USD
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#0d0920] p-3.5 rounded-2xl border border-purple-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <GemIcon color="purple" size={24} />
                  <span className="text-xs text-slate-400">Gems Balance</span>
                </div>
                <div className="text-lg font-bold text-white">{balance.gems.toLocaleString()}</div>
                <div className="text-[11px] text-purple-300 mt-0.5">≈ ${(balance.gems * 0.25).toFixed(2)} USD</div>
              </div>

              <div className="bg-[#0d0920] p-3.5 rounded-2xl border border-amber-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <VeCoinIcon size={24} />
                  <span className="text-xs text-slate-400">VEs Balance</span>
                </div>
                <div className="text-lg font-bold text-amber-300">{balance.ves.toLocaleString()}</div>
                <div className="text-[11px] text-amber-400/80 mt-0.5">≈ ${(balance.ves * 0.1).toFixed(2)} USD</div>
              </div>
            </div>

            <div className="bg-[#0d0920] p-3.5 rounded-2xl border border-white/5 text-xs">
              <div className="text-slate-400 mb-1">Your On-Chain Address</div>
              <div className="font-mono text-slate-300 truncate bg-[#161131] p-2 rounded-xl mb-2">
                {userProfile.walletAddress}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onShowToast('Gems Deposit address copied!', 'success')}
                  className="flex-1 py-2 rounded-xl bg-purple-600/30 border border-purple-500/40 text-purple-300 font-bold hover:bg-purple-600/50 transition-colors"
                >
                  Deposit
                </button>
                <button
                  onClick={() => onShowToast('Withdrawals enabled at Level 8', 'info')}
                  className="flex-1 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-400 font-bold hover:bg-white/10 transition-colors"
                >
                  Withdraw
                </button>
              </div>
            </div>
          </div>
        );

      case 'rewards':
        return (
          <div className="space-y-4">
            <div className="bg-[#0d0920] p-4 rounded-2xl border border-purple-500/20 text-center">
              <div className="text-xs text-purple-300 font-bold uppercase tracking-wider mb-1">
                Active Streak: 14 Days 🔥
              </div>
              <h4 className="text-lg font-extrabold text-white">Daily Login Multiplier +15%</h4>
              <p className="text-xs text-slate-400 mt-1">
                Log in tomorrow to reach your 15-day milestone for a 50 Gems bonus!
              </p>
            </div>

            <div className="space-y-2">
              <div className="p-3 rounded-xl bg-[#0d0920] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Weekly Leaderboard</div>
                  <div className="text-[11px] text-slate-400">Rank #42 • Top 2% Platform Earner</div>
                </div>
                <span className="text-xs font-bold text-amber-400">+250 VEs Pool</span>
              </div>
              <div className="p-3 rounded-xl bg-[#0d0920] border border-white/5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-white">Special Event: Lunar Drop</div>
                  <div className="text-[11px] text-slate-400">Ends in 2 days</div>
                </div>
                <span className="text-xs font-bold text-purple-400">Double Gems</span>
              </div>
            </div>
          </div>
        );

      case 'levelup':
        return (
          <div className="space-y-4">
            <div className="bg-[#0d0920] p-4 rounded-2xl border border-amber-500/20">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-amber-300">Level 7 (Gold Elite)</span>
                <span className="text-xs font-mono text-slate-400">7,450 / 10,000 XP</span>
              </div>
              <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-2">
                <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 w-[74.5%]" />
              </div>
              <div className="text-[11px] text-slate-400">
                You are 2,550 XP away from Level 8 Diamond VIP status with zero conversion fees!
              </div>
            </div>

            <div className="text-xs font-bold text-white">Ways to Earn XP:</div>
            <div className="space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-[#0d0920] border border-white/5 flex justify-between">
                <span className="text-slate-300">Every 10 Gems Converted</span>
                <span className="text-purple-400 font-bold">+25 XP</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0d0920] border border-white/5 flex justify-between">
                <span className="text-slate-300">Daily Login Streak</span>
                <span className="text-purple-400 font-bold">+50 XP</span>
              </div>
              <div className="p-2.5 rounded-xl bg-[#0d0920] border border-white/5 flex justify-between">
                <span className="text-slate-300">Successful Referral</span>
                <span className="text-purple-400 font-bold">+150 XP</span>
              </div>
            </div>
          </div>
        );

      case 'referrals':
        return (
          <div className="space-y-4">
            <div className="bg-[#0d0920] p-4 rounded-2xl border border-purple-500/20">
              <div className="text-xs text-slate-400 mb-1">Your Referral Link</div>
              <div className="flex items-center gap-2">
                <div className="flex-1 font-mono text-xs text-purple-300 bg-[#161131] p-2 rounded-xl truncate border border-white/5">
                  https://veloop.io/ref/{userProfile.name.toLowerCase()}-{userProfile.id}
                </div>
                <button
                  onClick={copyRefLink}
                  className="px-3 py-2 bg-purple-600 hover:bg-purple-500 rounded-xl text-white text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              <div className="bg-[#0d0920] p-3 rounded-2xl border border-white/5">
                <div className="text-xl font-bold text-white">12</div>
                <div className="text-[11px] text-slate-400">Referred Friends</div>
              </div>
              <div className="bg-[#0d0920] p-3 rounded-2xl border border-white/5">
                <div className="text-xl font-bold text-amber-300">+600 Gems</div>
                <div className="text-[11px] text-slate-400">Total Earned</div>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed text-center">
              Earn 50 Gems instantly whenever your friends register and make their first conversion!
            </p>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-4">
            {supportSubmitted ? (
              <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-2">
                <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-sm">Ticket Submitted!</h4>
                <p className="text-xs text-slate-300">
                  Our 24/7 priority support team will review your ticket and reply within 15 minutes.
                </p>
              </div>
            ) : (
              <>
                <div className="bg-[#0d0920] p-3.5 rounded-2xl border border-white/5 text-xs space-y-2">
                  <div className="text-slate-400 font-semibold">How can we help you, {userProfile.name}?</div>
                  <textarea
                    rows={3}
                    placeholder="Describe your question or issue with conversions..."
                    value={supportMessage}
                    onChange={(e) => setSupportMessage(e.target.value)}
                    className="w-full bg-[#161131] border border-white/10 rounded-xl p-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                  <button
                    onClick={() => {
                      if (!supportMessage.trim()) {
                        onShowToast('Please type a message first', 'error');
                        return;
                      }
                      setSupportSubmitted(true);
                      onShowToast('Support ticket #9824 created', 'success');
                    }}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Inquiry</span>
                  </button>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => onShowToast('Connecting to Discord community...', 'info')}
                    className="flex-1 py-2 rounded-xl bg-[#0d0920] border border-white/10 hover:border-purple-500/40 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-purple-400" />
                    <span>Discord Help</span>
                  </button>
                  <button
                    onClick={() => onShowToast('Connecting to Telegram support...', 'info')}
                    className="flex-1 py-2 rounded-xl bg-[#0d0920] border border-white/10 hover:border-blue-500/40 text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-blue-400" />
                    <span>Telegram VIP</span>
                  </button>
                </div>
              </>
            )}
          </div>
        );

      case 'dashboard':
      default:
        return (
          <div className="space-y-4 text-center">
            <div className="bg-[#0d0920] p-6 rounded-2xl border border-white/5 space-y-3">
              <h4 className="text-base font-bold text-white">Welcome back, {userProfile.name}!</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                You are currently in the VELOOP Rewards Exchange Center. You can convert Gems to VEs or explore all platform features anytime.
              </p>
              <button
                onClick={() => {
                  onClose();
                  onSwitchToExchange();
                }}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all"
              >
                Go to Exchange Center
              </button>
            </div>
          </div>
        );
    }
  };

  const titles = {
    wallet: 'Wallet Overview',
    rewards: 'Rewards Hub',
    levelup: 'Level Up & Earn',
    referrals: 'Referrals Program',
    support: '24/7 Support Center',
    dashboard: 'Dashboard Overview'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#140e32] border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-purple-950/80 z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5 relative z-10">
          <h3 className="text-xl font-extrabold text-white">
            {titles[tab] || 'Section Details'}
          </h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Dynamic Content */}
        <div className="my-5 relative z-10">
          {renderContent()}
        </div>

        {/* Footer */}
        <div className="pt-2 border-t border-white/5 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-semibold text-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SidebarTabModal;
