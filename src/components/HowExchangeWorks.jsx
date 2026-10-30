import React, { useState } from 'react';
import { Info, ListFilter, Search, ShieldCheck, Check, ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { GemIcon, VeCoinIcon } from './GemCoinIcons';

const HowExchangeWorks = ({ steps, onOpenGuide }) => {
  const [activeStep, setActiveStep] = useState(null);

  const getStepIcon = (iconType, color) => {
    switch (iconType) {
      case 'gem':    return <GemIcon color={color} size={24} />;
      case 'list':   return <ListFilter className="w-5 h-5 text-blue-300" />;
      case 'search': return <Search className="w-5 h-5 text-teal-300" />;
      case 'shield': return <ShieldCheck className="w-5 h-5 text-amber-300" />;
      case 've':     return <VeCoinIcon size={24} />;
      default:       return <Check className="w-5 h-5 text-purple-300" />;
    }
  };

  const stepColors = {
    purple: { border: 'rgba(168, 85, 247, 0.4)', shadow: 'rgba(168, 85, 247, 0.25)', badge: 'rgba(168, 85, 247, 0.15)', badgeText: '#c084fc', badgeBorder: 'rgba(168, 85, 247, 0.4)', connector: '#a855f7' },
    blue:   { border: 'rgba(59, 130, 246, 0.4)',  shadow: 'rgba(59, 130, 246, 0.25)',  badge: 'rgba(59, 130, 246, 0.15)',  badgeText: '#93c5fd', badgeBorder: 'rgba(59, 130, 246, 0.4)',  connector: '#3b82f6' },
    teal:   { border: 'rgba(20, 184, 166, 0.4)',  shadow: 'rgba(20, 184, 166, 0.25)',  badge: 'rgba(20, 184, 166, 0.15)',  badgeText: '#5eead4', badgeBorder: 'rgba(20, 184, 166, 0.4)',  connector: '#14b8a6' },
    amber:  { border: 'rgba(245, 158, 11, 0.4)',  shadow: 'rgba(245, 158, 11, 0.25)',  badge: 'rgba(245, 158, 11, 0.15)',  badgeText: '#fcd34d', badgeBorder: 'rgba(245, 158, 11, 0.4)',  connector: '#f59e0b' },
    green:  { border: 'rgba(16, 185, 129, 0.4)',  shadow: 'rgba(16, 185, 129, 0.25)',  badge: 'rgba(16, 185, 129, 0.15)',  badgeText: '#6ee7b7', badgeBorder: 'rgba(16, 185, 129, 0.4)',  connector: '#10b981' },
  };

  return (
    <div
      className="rounded-2xl p-6 backdrop-blur-md shadow-xl shadow-purple-950/20 mb-8"
      style={{ background: 'rgba(20, 15, 48, 0.82)', border: '1px solid rgba(255, 255, 255, 0.055)' }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: 'rgba(168, 85, 247, 0.18)', border: '1px solid rgba(168, 85, 247, 0.35)' }}>
            <BookOpen className="w-4 h-4 text-purple-300" />
          </div>
          <h3 className="font-bold text-white text-lg tracking-wide">How Exchange Works</h3>
          <button
            type="button"
            title="Read Complete Exchange Guide"
            onClick={onOpenGuide}
            className="text-slate-500 hover:text-purple-300 transition-colors ml-1"
          >
            <Info className="w-4 h-4 cursor-pointer" />
          </button>
        </div>
        <button
          onClick={onOpenGuide}
          className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1 group"
        >
          <span>View Full Guide</span>
          <ChevronDown className="w-3 h-3 rotate-[-90deg] group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* 5-step horizontal flow */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 lg:gap-3 items-start">
        {steps.map((step, index) => {
          const colors = stepColors[step.color] || stepColors.purple;
          const isLast = index === steps.length - 1;
          const isExpanded = activeStep === step.number;

          return (
            <div
              key={step.number}
              onClick={() => setActiveStep(isExpanded ? null : step.number)}
              className={`relative flex flex-col items-center text-center p-4 rounded-2xl cursor-pointer transition-all duration-300 ${
                isExpanded
                  ? 'scale-105'
                  : 'hover:scale-102'
              }`}
              style={{
                background: isExpanded ? 'rgba(255,255,255,0.04)' : 'transparent',
                border: isExpanded ? '1px solid rgba(255,255,255,0.09)' : '1px solid transparent',
              }}
            >
              {/* Connector dashed line between steps (desktop only) */}
              {!isLast && (
                <div
                  className="hidden lg:block absolute top-10 left-[70%] w-[55%] border-t-2 border-dashed z-0 pointer-events-none"
                  style={{ borderColor: `${colors.connector}40` }}
                />
              )}

              {/* Step Icon Badge */}
              <div
                className={`relative z-10 w-14 h-14 rounded-2xl flex items-center justify-center mb-3 transition-all duration-300 ${isExpanded ? 'scale-110' : 'hover:scale-105'}`}
                style={{
                  background: 'rgba(26, 19, 59, 0.9)',
                  border: `1px solid ${colors.border}`,
                  boxShadow: `0 0 18px ${colors.shadow}`,
                }}
              >
                {getStepIcon(step.iconType, step.color)}
              </div>

              {/* Step Number Tag */}
              <span
                className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full mb-2"
                style={{
                  background: colors.badge,
                  color: colors.badgeText,
                  border: `1px solid ${colors.badgeBorder}`,
                }}
              >
                {step.number}
              </span>

              {/* Step Title */}
              <h4 className="font-bold text-sm mb-1 text-white">{step.title}</h4>

              {/* Step Description */}
              <p className="text-xs text-slate-400 max-w-[160px] leading-relaxed">{step.description}</p>

              {/* Expand toggle */}
              <div className="mt-2.5 flex items-center gap-1 text-[11px] font-semibold" style={{ color: colors.badgeText, opacity: 0.8 }}>
                <span>{isExpanded ? 'Hide Info' : 'More Info'}</span>
                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
              </div>

              {/* Expanded Detail Box */}
              {isExpanded && step.details && (
                <div
                  className="mt-3 p-3 rounded-xl text-left text-[11px] text-slate-300 leading-snug animate-fadeIn"
                  style={{ background: 'rgba(8, 6, 20, 0.9)', border: `1px solid ${colors.border}` }}
                >
                  {step.details}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HowExchangeWorks;
