import React from 'react';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import styles from '../../styles/ExchangeRules.module.css';
import shieldImage from '../../assets/images/purple_shield.jpg';

/**
 * ExchangeRules - Displays official VELOOP conversion rules and guidelines.
 */
const ExchangeRules = ({ rules = [], onViewFullRules }) => {
  return (
    <section className={styles.rulesContainer} aria-labelledby="rules-heading">
      <div className={styles.rulesHeader}>
        <h2 id="rules-heading" className={styles.rulesTitle}>
          <ShieldCheck size={18} className="text-purple-400" aria-hidden="true" />
          <span>Exchange Guidelines</span>
        </h2>

        <button
          type="button"
          className={styles.viewDetailsBtn}
          onClick={onViewFullRules}
          aria-label="View complete rules documentation"
        >
          <span>Full Terms</span>
          <ArrowRight size={13} aria-hidden="true" />
        </button>
      </div>

      <div className={styles.rulesList} role="list">
        {rules.map((rule, idx) => (
          <div key={idx} className={styles.ruleItem} role="listitem">
            <div className={styles.ruleBullet} aria-hidden="true" />
            <span>{rule}</span>
          </div>
        ))}
      </div>
      <img className={styles.rulesArtwork} src={shieldImage} alt="" aria-hidden="true" loading="lazy" />
    </section>
  );
};

export default ExchangeRules;
