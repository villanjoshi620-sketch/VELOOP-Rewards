import React, { useState } from 'react';
import { X, Search, Filter, Download, Check, ExternalLink, Calendar } from 'lucide-react';
import { GemIcon, VeCoinIcon } from './GemCoinIcons';

const FullHistoryModal = ({ conversions, onClose, onSelectTransaction, onShowToast }) => {
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = conversions.filter(item => {
    const matchesFilter = filter === 'All' || item.status === filter;
    const matchesSearch = item.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          `${item.gems}`.includes(searchTerm) ||
                          `${item.ves}`.includes(searchTerm);
    return matchesFilter && matchesSearch;
  });

  const handleExportCSV = () => {
    const headers = 'ID,Gems,VEs,Date,Status\n';
    const rows = conversions.map(c => `${c.id},${c.gems},${c.ves},"${c.date}",${c.status}`).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'veloop_conversion_history.csv';
    a.click();
    onShowToast('Transaction history exported as CSV', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn select-none">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#140e32] border border-purple-500/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-purple-950/80 z-10 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5 relative z-10 flex-shrink-0">
          <div>
            <h3 className="text-xl font-extrabold text-white">Conversion History</h3>
            <p className="text-xs text-slate-400 mt-0.5">Complete record of your reward conversions</p>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter bar */}
        <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-3 flex-shrink-0">
          {/* Search box */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search date or amount..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0d0920] border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          {/* Status buttons & Export */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center gap-1 bg-[#0d0920] p-1 rounded-xl border border-white/5 text-xs">
              {['All', 'Completed', 'Failed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                    filter === status
                      ? 'bg-purple-600 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>

            <button
              onClick={handleExportCSV}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-colors"
              title="Export CSV"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Transaction list */}
        <div className="overflow-y-auto custom-scrollbar divide-y divide-white/5 pr-1 flex-1">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-xs">
              No transactions found matching your criteria.
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectTransaction(item);
                  onClose();
                }}
                className="py-3.5 px-3 flex items-center justify-between gap-3 hover:bg-white/[0.03] rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <GemIcon color={item.color || 'purple'} size={22} />
                    <span className="text-slate-500 text-xs">→</span>
                    <VeCoinIcon size={22} />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1.5 text-xs font-bold text-white">
                      <span>{item.gems} Gems</span>
                      <span className="text-slate-500 font-normal">→</span>
                      <span className="text-amber-300">{item.ves} VEs</span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5 flex items-center gap-2">
                      <span>{item.date}</span>
                      <span className="text-slate-600 font-mono">ID: #{item.id}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                    item.status === 'Completed'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                  }`}>
                    {item.status}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-purple-400 transition-colors" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FullHistoryModal;
