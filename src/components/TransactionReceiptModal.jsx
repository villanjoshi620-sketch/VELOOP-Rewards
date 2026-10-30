import React from 'react';
import { X, CheckCircle, AlertCircle, Copy } from 'lucide-react';
import { GemIcon, VeCoinIcon } from './GemCoinIcons';

const TransactionReceiptModal = ({ transaction, onClose, onShowToast }) => {
  if (!transaction) return null;

  const isCompleted = transaction.status === 'Completed';

  const handleCopyHash = () => {
    navigator.clipboard?.writeText(transaction.txHash || `0x${transaction.id}bf98`);
    onShowToast('Receipt ID copied!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-md bg-[#140e32] border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-purple-950/80 z-10 overflow-hidden text-center">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Status Badge */}
        <div className="flex justify-end mb-1">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className={`w-14 h-14 rounded-full mx-auto flex items-center justify-center mb-3 ${
          isCompleted ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
        }`}>
          {isCompleted ? <CheckCircle className="w-8 h-8" /> : <AlertCircle className="w-8 h-8" />}
        </div>

        <h3 className="text-xl font-extrabold text-white">
          {isCompleted ? 'Conversion Complete' : 'Conversion Failed'}
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">
          VELOOP Rewards Conversion Record
        </p>

        {/* Receipt Box */}
        <div className="my-5 bg-[#0d0920] rounded-2xl p-4 border border-white/5 text-left text-xs space-y-2.5">
          <div className="flex items-center justify-between pb-2 border-b border-white/5">
            <span className="text-slate-400">Reward conversion</span>
            <div className="flex items-center gap-1.5 font-bold text-white">
              <GemIcon color={transaction.color || 'purple'} size={18} />
              <span>{transaction.gems} Gems</span>
              <span className="text-slate-500">→</span>
              <VeCoinIcon size={18} />
              <span className="text-amber-300">{transaction.ves} VEs</span>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Date & time</span>
            <span className="font-semibold text-white">{transaction.date}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Conversion value</span>
            <span className="font-semibold text-purple-300">
              {(transaction.ves / transaction.gems).toFixed(2)} VEs / Gem
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-400">Receipt ID</span>
            <button
              onClick={handleCopyHash}
              className="font-mono text-purple-400 hover:text-purple-300 flex items-center gap-1"
            >
              <span>{transaction.txHash || `0x${transaction.id}...bf98`}</span>
              <Copy className="w-3 h-3" />
            </button>
          </div>

        </div>

        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/30 transition-all duration-200"
        >
          Close Receipt
        </button>
      </div>
    </div>
  );
};

export default TransactionReceiptModal;
