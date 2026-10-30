import React, { useEffect, useState } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Trigger entrance animation
    const showTimer = setTimeout(() => setVisible(true), 10);
    const closeTimer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 3800);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, [onClose]);

  const config = {
    success: {
      icon: <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />,
      style: 'border-emerald-500/40 bg-[#0a1f14]/95',
      bar: 'bg-emerald-500',
      text: 'text-emerald-100',
    },
    error: {
      icon: <AlertCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />,
      style: 'border-rose-500/40 bg-[#200a0e]/95',
      bar: 'bg-rose-500',
      text: 'text-rose-100',
    },
    info: {
      icon: <Info className="w-5 h-5 text-purple-400 flex-shrink-0" />,
      style: 'border-purple-500/40 bg-[#130d28]/95',
      bar: 'bg-purple-500',
      text: 'text-purple-100',
    },
  };

  const c = config[type] || config.info;

  return (
    <div
      className={`fixed bottom-6 right-6 z-[9999] select-none transition-all duration-300 ${
        visible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
      style={{ maxWidth: 'calc(100vw - 48px)' }}
    >
      <div className={`relative flex items-center gap-3 px-4 py-3.5 rounded-2xl border shadow-2xl backdrop-blur-xl overflow-hidden ${c.style}`}>
        {/* Progress bar */}
        <div className={`absolute bottom-0 left-0 h-0.5 ${c.bar} opacity-60 animate-progress`} style={{ width: '100%' }} />

        {c.icon}
        <span className={`text-xs font-semibold ${c.text} leading-snug`}>{message}</span>
        <button
          onClick={() => { setVisible(false); setTimeout(onClose, 300); }}
          className="ml-2 text-slate-500 hover:text-white transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
