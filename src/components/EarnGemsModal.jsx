import React, { useState } from 'react';
import { X, Calendar, Share2, MessageSquare, Users, Check, Sparkles } from 'lucide-react';
import { initialGemsTasks } from '../data/exchangeData';
import { GemIcon } from './GemCoinIcons';

const EarnGemsModal = ({ onClose, onAddGems, onShowToast }) => {
  const [tasks, setTasks] = useState(initialGemsTasks);

  const getTaskIcon = (iconName) => {
    switch (iconName) {
      case 'calendar': return <Calendar className="w-5 h-5 text-purple-400" />;
      case 'share': return <Share2 className="w-5 h-5 text-blue-400" />;
      case 'message': return <MessageSquare className="w-5 h-5 text-indigo-400" />;
      case 'users': return <Users className="w-5 h-5 text-amber-400" />;
      default: return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  const handleClaim = (taskId, reward) => {
    setTasks(tasks.map(t => t.id === taskId ? { ...t, claimed: true } : t));
    onAddGems(reward);
    onShowToast(`Claimed +${reward} Gems! Added to your balance.`, 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-lg bg-[#140e32] border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-purple-950/80 z-10 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-900/50 border border-purple-500/40 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-300" />
            </div>
            <div>
              <h3 className="text-xl font-extrabold text-white">
                Earn More Gems
              </h3>
              <p className="text-xs text-purple-300/70">
                Complete daily activities to boost your balance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quest List */}
        <div className="my-6 space-y-3 relative z-10">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                task.claimed
                  ? 'bg-white/[0.02] border-white/5 opacity-60'
                  : 'bg-[#0d0920] border-purple-500/20 hover:border-purple-500/40'
              }`}
            >
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-purple-950/60 border border-white/5 flex items-center justify-center flex-shrink-0">
                  {getTaskIcon(task.icon)}
                </div>
                <div>
                  <div className="font-bold text-sm text-white">{task.title}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{task.desc}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="flex items-center gap-1 font-bold text-sm text-purple-300">
                  <GemIcon color="purple" size={16} />
                  <span>+{task.reward}</span>
                </div>

                <button
                  onClick={() => !task.claimed && handleClaim(task.id, task.reward)}
                  disabled={task.claimed}
                  className={`px-3.5 py-1.5 rounded-xl font-bold text-xs transition-all ${
                    task.claimed
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 cursor-default flex items-center gap-1'
                      : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-lg shadow-purple-600/30 cursor-pointer active:scale-95'
                  }`}
                >
                  {task.claimed ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Claimed</span>
                    </>
                  ) : (
                    <span>Claim</span>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 border-t border-white/5 text-center text-xs text-slate-400 relative z-10">
          New quests reset every 24 hours at 00:00 UTC.
        </div>
      </div>
    </div>
  );
};

export default EarnGemsModal;
