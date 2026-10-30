import React from 'react';
import { Bell, Info, Menu, Sparkles } from 'lucide-react';
import { GemIcon, VeCoinIcon } from './GemCoinIcons';
import { userProfile } from '../data/exchangeData';

const Header = ({
  balance,
  unreadNotificationsCount = 3,
  onToggleSidebar,
  onToggleNotifications,
  onOpenProfile,
  onOpenGemsInfo,
  onOpenVesInfo
}) => {
  return (
    <div
      className="flex items-center justify-between md:justify-end w-full py-3.5 px-4 sm:px-8 select-none relative z-30"
      style={{
        background: 'rgba(9, 8, 20, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
      }}
    >
      {/* Mobile: Logo + Menu */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          type="button"
          aria-label="Open navigation menu"
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/[0.06] transition-all active:scale-95"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5">
          <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-amber-400 via-purple-500 to-indigo-600 flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-extrabold tracking-wider text-white">VELOOP</span>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Available Gems Header Pill */}
        <div
          onClick={onOpenGemsInfo}
          className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full cursor-pointer transition-all duration-200 group hover:scale-105"
          style={{
            background: 'rgba(19, 15, 42, 0.92)',
            border: '1px solid rgba(168, 85, 247, 0.22)',
            backdropFilter: 'blur(16px)',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.5)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(168, 85, 247, 0.22)'}
        >
          <GemIcon color="purple" size={20} />
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-white text-sm">{balance.gems.toLocaleString()}</span>
            <span className="text-xs text-slate-400 font-medium">Gems</span>
          </div>
          <button
            type="button"
            title="Info about Gems"
            className="text-slate-600 group-hover:text-purple-400 transition-colors ml-0.5"
            onClick={e => { e.stopPropagation(); onOpenGemsInfo?.(); }}
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Available VEs Header Pill */}
        <div
          onClick={onOpenVesInfo}
          className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full cursor-pointer transition-all duration-200 group hover:scale-105"
          style={{
            background: 'rgba(19, 15, 42, 0.92)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            backdropFilter: 'blur(16px)',
          }}
          onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.5)'}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(245, 158, 11, 0.2)'}
        >
          <VeCoinIcon size={20} />
          <div className="flex items-baseline gap-1.5">
            <span className="font-bold text-amber-300 text-sm">{balance.ves.toLocaleString()}</span>
            <span className="text-xs text-slate-400 font-medium">VEs</span>
          </div>
          <button
            type="button"
            title="Info about VEs"
            className="text-slate-600 group-hover:text-amber-400 transition-colors ml-0.5"
            onClick={e => { e.stopPropagation(); onOpenVesInfo?.(); }}
          >
            <Info className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Notification Bell */}
        <button
          onClick={onToggleNotifications}
          title="Notifications"
          className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/[0.06] transition-all cursor-pointer"
        >
          <Bell className="w-5 h-5" />
          {unreadNotificationsCount > 0 && (
            <span
              className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full text-[9px] font-bold text-white flex items-center justify-center animate-pulse"
              style={{ background: 'linear-gradient(135deg, #7c3aed, #4f46e5)', border: '1.5px solid #090814' }}
            >
              {unreadNotificationsCount > 9 ? '9+' : unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Profile Avatar */}
        <div
          onClick={onOpenProfile}
          title={`Profile: ${userProfile.name}`}
          className="w-9 h-9 rounded-full cursor-pointer hover:scale-110 transition-transform shadow-md"
          style={{
            background: 'linear-gradient(135deg, #7c3aed, #4f46e5, #f59e0b)',
            padding: '1.5px',
          }}
        >
          <div className="w-full h-full bg-[#0d091e] rounded-full flex items-center justify-center font-bold text-white text-sm">
            {userProfile.avatarChar}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
