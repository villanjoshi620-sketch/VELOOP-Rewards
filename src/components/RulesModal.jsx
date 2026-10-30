import React from 'react';
import { X, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { exchangeRulesList } from '../data/exchangeData';

const RulesModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#140e32] border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-purple-950/80 z-10 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5 relative z-10 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-purple-400" />
            <h3 className="text-xl font-extrabold text-white">Platform Exchange Rules</h3>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto custom-scrollbar my-4 pr-1 space-y-4 text-xs text-slate-300 flex-1">
          <div className="bg-[#0d0920] p-4 rounded-2xl border border-white/5">
            <h4 className="font-bold text-white text-sm mb-2">Core Exchange Policy</h4>
            <div className="space-y-2">
              {exchangeRulesList.map((rule, idx) => (
                <div key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 flex-shrink-0 mt-0.5" />
                  <span>{rule}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-3 border-t border-white/5 flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

export default RulesModal;
