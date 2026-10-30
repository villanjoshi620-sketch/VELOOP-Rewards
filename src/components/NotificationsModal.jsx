import React from 'react';
import { X, CheckCheck, Trash2, Bell, Sparkles, Shield, AlertCircle } from 'lucide-react';

const NotificationsModal = ({ 
  notifications, 
  onClose, 
  onMarkAllRead, 
  onClearAll, 
  onShowToast 
}) => {
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'reward': return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'info': return <Shield className="w-5 h-5 text-purple-400" />;
      default: return <Bell className="w-5 h-5 text-blue-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#140e32] border border-purple-500/30 rounded-3xl p-6 shadow-2xl shadow-purple-950/80 z-10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5 relative z-10">
          <div className="flex items-center gap-2.5">
            <Bell className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-extrabold text-white">Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Action toolbar */}
        <div className="flex items-center justify-between py-3 border-b border-white/5 text-xs text-slate-400">
          <span>{notifications.length} Total Alerts</span>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onMarkAllRead();
                onShowToast('All notifications marked as read', 'success');
              }}
              className="text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark all read</span>
            </button>
            <button
              onClick={() => {
                onClearAll();
                onShowToast('All notifications cleared', 'info');
              }}
              className="text-rose-400 hover:text-rose-300 font-semibold flex items-center gap-1 transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          </div>
        </div>

        {/* List */}
        <div className="my-4 space-y-3 max-h-[360px] overflow-y-auto custom-scrollbar pr-1">
          {notifications.length === 0 ? (
            <div className="py-10 text-center text-slate-500 text-xs">
              No new notifications right now.
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3.5 rounded-2xl border transition-all ${
                  notif.read
                    ? 'bg-white/[0.02] border-white/5 opacity-70'
                    : 'bg-[#0d0920] border-purple-500/30'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-950/70 border border-white/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {getNotificationIcon(notif.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-white truncate">
                        {notif.title}
                      </h4>
                      <span className="text-[10px] text-slate-500 ml-2 whitespace-nowrap">
                        {notif.time}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1 leading-snug">
                      {notif.message}
                    </p>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsModal;
