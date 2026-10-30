import React from 'react';
import {
  LayoutDashboard,
  Wallet,
  Gift,
  TrendingUp,
  ArrowLeftRight,
  Users,
  History,
  HelpCircle
} from 'lucide-react';
import purpleGemCluster from '../assets/images/purple_gem_cluster.jpg';
import { userProfile } from '../data/exchangeData';

const Sidebar = ({
  activeTab = 'exchange',
  onSelectTab,
  onOpenProfile,
  onOpenEarnGems,
  isOpen = false,
  onClose
}) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard',      icon: LayoutDashboard },
    { id: 'wallet',    label: 'Wallet',          icon: Wallet },
    { id: 'rewards',   label: 'Rewards',         icon: Gift },
    { id: 'levelup',   label: 'Level Up & Earn', icon: TrendingUp },
    { id: 'exchange',  label: 'Exchange Center', icon: ArrowLeftRight },
    { id: 'referrals', label: 'Referrals',       icon: Users },
    { id: 'history',   label: 'History',         icon: History },
    { id: 'support',   label: 'Support',         icon: HelpCircle },
  ];

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close navigation menu"
          onClick={onClose}
          className="fixed inset-0 z-40 md:hidden"
          style={{ background: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(4px)' }}
        />
      )}

      <aside
        className={`w-64 max-w-[85vw] md:w-48 flex flex-col h-screen fixed left-0 top-0 z-50 md:z-30 select-none overflow-y-auto custom-scrollbar transition-transform duration-300 md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{
          background: 'rgba(8, 6, 18, 0.97)',
          borderRight: '1px solid rgba(255, 255, 255, 0.045)',
          backdropFilter: 'blur(30px)',
        }}
      >
        {/* Subtle background gradient */}
        <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-purple-900/8 to-transparent pointer-events-none" />

        {/* Brand Logo */}
        <div
          onClick={() => onSelectTab?.('exchange')}
          className="pt-6 pb-5 px-6 flex items-center gap-3 cursor-pointer group relative z-10"
        >
          <div
            className="w-9 h-9 rounded-xl p-[1.5px] group-hover:scale-105 transition-transform shadow-lg"
            style={{ background: 'linear-gradient(135deg, #fbbf24, #a855f7, #6366f1)' }}
          >
            <div className="w-full h-full bg-[#0d091e] rounded-[10px] flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 5L12 19L20 5"
                  stroke="url(#veloop-logo-grad)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <defs>
                  <linearGradient id="veloop-logo-grad" x1="4" y1="5" x2="20" y2="19">
                    <stop stopColor="#fbbf24" />
                    <stop offset="0.5" stopColor="#a855f7" />
                    <stop offset="1" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-lg tracking-wider text-white leading-tight group-hover:text-purple-200 transition-colors">
              VELOOP
            </span>
            <span className="text-[10px] font-bold tracking-[0.22em] text-amber-400/90 leading-none">
              REWARDS
            </span>
          </div>
        </div>

        {/* Separator */}
        <div className="mx-4 h-[1px] bg-white/[0.04] mb-3" />

        {/* Navigation Links */}
        <nav className="flex-1 px-3 space-y-0.5 relative z-10">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab?.(item.id)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 group relative text-left ${
                  isActive
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
                style={isActive ? {
                  background: 'rgba(124, 58, 237, 0.2)',
                  border: '1px solid rgba(124, 58, 237, 0.35)',
                  boxShadow: '0 0 20px rgba(124, 58, 237, 0.1)',
                } : {
                  background: 'transparent',
                  border: '1px solid transparent',
                }}
                onMouseEnter={e => !isActive && (e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)')}
                onMouseLeave={e => !isActive && (e.currentTarget.style.background = 'transparent')}
              >
                {isActive && (
                  <div
                    className="absolute right-3 w-1.5 h-1.5 rounded-full"
                    style={{ background: '#a855f7', boxShadow: '0 0 8px #a855f7' }}
                  />
                )}
                <Icon
                  className={`w-4 h-4 transition-colors flex-shrink-0 ${
                    isActive ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-200'
                  }`}
                />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Profile & Promo section */}
        <div className="p-4 space-y-3 relative z-10">
          {/* User Profile Card */}
          <div
            onClick={() => { onClose?.(); onOpenProfile?.(); }}
            className="rounded-2xl p-3 flex items-center gap-3 cursor-pointer transition-all duration-200 group"
            style={{ background: 'rgba(19, 15, 40, 0.85)', border: '1px solid rgba(255, 255, 255, 0.05)' }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'rgba(24, 18, 50, 0.95)';
              e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.3)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'rgba(19, 15, 40, 0.85)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
            }}
          >
            <div
              className="w-10 h-10 rounded-full flex-shrink-0 group-hover:scale-105 transition-transform p-[1.5px]"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5, #f59e0b)' }}
            >
              <div className="w-full h-full bg-[#0d091e] rounded-full flex items-center justify-center font-bold text-white text-base">
                {userProfile.avatarChar}
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="text-xs text-slate-400">{userProfile.greeting}</span>
                <span className="text-sm font-bold text-white truncate">{userProfile.name}</span>
                <span
                  className="text-[10px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0"
                  style={{ background: 'rgba(124, 58, 237, 0.2)', color: '#c084fc', border: '1px solid rgba(124, 58, 237, 0.3)' }}
                >
                  {userProfile.level}
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-mono">
                ID: {userProfile.id}
              </div>
            </div>
          </div>

          {/* Earn More Gems Promo Card */}
          <div
            className="relative rounded-2xl p-4 overflow-hidden shadow-xl"
            style={{
              background: 'linear-gradient(145deg, #191238, #120d2b)',
              border: '1px solid rgba(168, 85, 247, 0.2)',
            }}
          >
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-purple-500/18 rounded-full blur-xl pointer-events-none" />
            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/40 to-transparent pointer-events-none" />

            {/* Floating Gems Image */}
            <div className="w-full flex items-center justify-center -mt-1 mb-2">
              <img
                src={purpleGemCluster}
                alt="Earn More Gems"
                className="w-20 h-20 object-contain animate-float cursor-pointer"
                style={{ filter: 'drop-shadow(0 0 18px rgba(168, 85, 247, 0.65))' }}
                onClick={() => { onClose?.(); onOpenEarnGems?.(); }}
              />
            </div>

            <div className="relative z-10 text-center">
              <h4 className="font-bold text-sm text-white mb-1">Earn More Gems!</h4>
              <p className="text-[11px] text-slate-300/70 leading-snug mb-3">
                Complete tasks, refer friends and unlock more ways to earn Gems.
              </p>
              <button
                onClick={() => { onClose?.(); onOpenEarnGems?.(); }}
                className="w-full py-2 text-white text-xs font-bold rounded-xl transition-all duration-200 active:scale-95 hover:opacity-90"
                style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', boxShadow: '0 0 16px rgba(124, 58, 237, 0.35)' }}
              >
                Explore Now
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
