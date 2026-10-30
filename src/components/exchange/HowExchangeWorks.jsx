import React from 'react';
import { HelpCircle, List, Search, ShieldCheck } from 'lucide-react';
import { GemIcon, VeCoinIcon } from '../GemCoinIcons';
import styles from '../../styles/HowExchangeWorks.module.css';

const stepThemes = {
  purple: styles.stepPurple,
  blue: styles.stepBlue,
  teal: styles.stepTeal,
  amber: styles.stepAmber,
  green: styles.stepGreen
};

const StepIcon = ({ type }) => {
  if (type === 'gem') return <GemIcon size={22} />;
  if (type === 've') return <VeCoinIcon size={22} />;
  if (type === 'list') return <List size={18} aria-hidden="true" />;
  if (type === 'search') return <Search size={18} aria-hidden="true" />;
  return <ShieldCheck size={18} aria-hidden="true" />;
};

const HowExchangeWorks = ({ steps = [], onSelectStep }) => {
  return (
    <section className={styles.howItWorksContainer} aria-labelledby="how-it-works-title">
      <div className={styles.headerRow}>
        <h2 id="how-it-works-title" className={styles.title}>
          <HelpCircle size={18} className="text-purple-400" aria-hidden="true" />
          <span>How Exchange Works</span>
        </h2>
      </div>

      <div className={styles.stepsGrid}>
        {steps.map((step) => (
          <div
            key={step.number}
            className={`${styles.stepCard} ${stepThemes[step.color] || styles.stepPurple}`}
            onClick={() => onSelectStep?.(step)}
            role="button"
            tabIndex={0}
            aria-label={`Step ${step.number}: ${step.title}. ${step.description}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onSelectStep?.(step);
              }
            }}
          >
            <div className={styles.stepIcon}><StepIcon type={step.iconType} /></div>
            <div className={styles.stepNumber}>{step.number}</div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepDescription}>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowExchangeWorks;
