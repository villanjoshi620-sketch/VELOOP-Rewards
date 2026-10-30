import React, { useState } from 'react';
import { Info, Shield, CheckCircle2 } from 'lucide-react';
import purpleShieldImg from '../assets/images/purple_shield.jpg';

const ExchangeRules = ({ rules, onOpenRulesModal }) => {
  const [selectedRule, setSelectedRule] = useState(null);

  const ruleExplanations = [
    'Only Gems accumulated through approved VELOOP activities and daily logins are eligible for exchange.',
    'Conversion rates are algorithmically maintained by VELOOP Rewards based on platform reserves and liquidity.',
    'Daily and weekly exchange limits or tiers may be updated periodically to maintain reward equilibrium.',
    'Every processed conversion is cryptographically signed and cannot be reversed or duplicated.',
    'Updated VEs and deducted Gems are written immediately to your verified profile balance.',
    'General VELOOP Terms of Service and community guidelines govern all conversions.',
  ];

  return (
    <div
      id="rules"
      className="rounded-2xl p-6 backdrop-blur-md shadow-xl shadow-purple-950/20 flex flex-col justify-between h-full"
      style={{ background: 'rgba(20, 15, 48, 0.82)', border: '1px solid rgba(255, 255, 255, 0.055)' }}
    >
      {/* Title */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(168, 85, 247, 0.18)', border: '1px solid rgba(168, 85, 247, 0.35)' }}>
            <Shield className="w-4 h-4 text-purple-300" />
          </div>
          <h3 className="font-bold text-white text-lg tracking-wide">Exchange Rules</h3>
          <button
            type="button"
            title="Read Detailed Rules"
            onClick={onOpenRulesModal}
            className="text-slate-500 hover:text-purple-300 transition-colors"
          >
            <Info className="w-4 h-4 cursor-pointer" />
          </button>
        </div>
        <button
          onClick={onOpenRulesModal}
          className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
        >
          View Full Policy
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center flex-1">
        {/* Rules checklist */}
        <div className="md:col-span-8 space-y-2">
          {rules.map((rule, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedRule(selectedRule === idx ? null : idx)}
              className="p-2 -mx-1 rounded-xl cursor-pointer transition-all duration-200 group"
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'}
              onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
            >
              <div className="flex items-start gap-2.5">
                <div
                  className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ background: selectedRule === idx ? 'rgba(168, 85, 247, 0.3)' : 'rgba(168, 85, 247, 0.15)' }}
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
                </div>
                <div className="flex-1">
                  <span className="text-xs text-slate-300/90 leading-relaxed font-medium group-hover:text-white transition-colors">
                    {rule}
                  </span>
                  {selectedRule === idx && (
                    <p
                      className="mt-2 text-[11px] text-purple-300/80 p-2.5 rounded-xl leading-relaxed animate-fadeIn"
                      style={{ background: 'rgba(8, 6, 20, 0.9)', border: '1px solid rgba(168, 85, 247, 0.2)' }}
                    >
                      {ruleExplanations[idx] || rule}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Shield Badge */}
        <div
          onClick={onOpenRulesModal}
          className="md:col-span-4 flex items-center justify-center cursor-pointer group"
          title="Click to view security and guarantee policy"
        >
          <div className="relative w-28 h-28 flex items-center justify-center">
            <img
              src={purpleShieldImg}
              alt="Security Shield"
              className="w-full h-full object-contain animate-float group-hover:scale-110 transition-transform duration-300"
              style={{ filter: 'drop-shadow(0 0 18px rgba(168, 85, 247, 0.55))' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeRules;
