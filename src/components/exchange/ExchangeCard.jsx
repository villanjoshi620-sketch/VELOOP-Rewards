import React from 'react';
import { ArrowRight, LockKeyhole, Zap, Sparkles, Plus, CheckCircle2 } from 'lucide-react';
import { GemIcon, VeCoinIcon } from '../GemCoinIcons';
import styles from '../../styles/ExchangeCard.module.css';

const themeClasses = {
  purple: styles.cardPurple,
  blue: styles.cardBlue,
  green: styles.cardGreen,
  amber: styles.cardAmber
};

const buttonClasses = {
  purple: styles.convertBtnPurple,
  blue: styles.convertBtnBlue,
  green: styles.convertBtnGreen,
  amber: styles.convertBtnAmber
};

const ExchangeCard = ({ option, balance, onConvert, onEarnGems, index = 0 }) => {
  const requiredGems = option.requiredGems ?? option.gems ?? 0;
  const receiveVEs = option.receiveVEs ?? option.ves ?? 0;
  const availableGems = balance?.gems ?? 0;
  const isAvailable = availableGems >= requiredGems;
  const missingGems = Math.max(0, requiredGems - availableGems);
  const multiplier = option.multiplier || `${(receiveVEs / (requiredGems || 1)).toFixed(1)}x`;

  // Calculate percentage of progress towards unlocking this package
  const progressPercent = Math.min(
    100,
    Math.max(0, Math.round((availableGems / (requiredGems || 1)) * 100))
  );

  const handleCardClick = (e) => {
    // Avoid double triggering if user clicked directly on the button
    if (e.target.closest('button')) return;
    if (isAvailable) {
      onConvert?.(option);
    } else {
      onEarnGems?.();
    }
  };

  return (
    <article
      className={`${styles.card} ${themeClasses[option.color] || styles.cardPurple}`}
      onClick={handleCardClick}
      style={{ cursor: 'pointer' }}
      role="region"
      aria-label={`${option.name || 'Gem conversion'} card: ${requiredGems} Gems to ${receiveVEs} VEs`}
    >
      {/* Top ambient glowing accent line */}
      <div className={styles.cardTopGlow} aria-hidden="true" />

      {/* Top Header Row: Badge & Multiplier Pill */}
      <div className={styles.cardTop}>
        {option.badge ? (
          <span className={`${styles.badge} ${option.badgeColor === 'amber' ? styles.badgeValue : ''}`}>
            <Sparkles size={11} aria-hidden="true" />
            {option.badge}
          </span>
        ) : (
          <span className={styles.statusReady}>
            <span className={styles.pulseDot} />
            Tier {index + 1}
          </span>
        )}
        <span className={styles.ratePill}>
          <Sparkles size={11} aria-hidden="true" />
          {multiplier} rate
        </span>
      </div>

      {/* Swap Visual: Gem -> Arrow -> VE Coin */}
      <div className={styles.conversionVisual} aria-hidden="true">
        <div className={styles.gemVisual}>
          <GemIcon color={option.color} size={44} />
        </div>
        <div className={styles.arrowVisual}>
          <ArrowRight size={20} />
          <span>SWAP</span>
        </div>
        <div className={styles.veVisual}>
          <VeCoinIcon size={44} />
        </div>
      </div>

      {/* Card Name */}
      <h3 className={styles.cardTypeName}>{option.name || 'Gem conversion'}</h3>

      {/* Status Pill */}
      <div className={styles.statusRow}>
        {isAvailable ? (
          <span className={styles.statusReady}>
            <span className={styles.pulseDot} />
            Ready to Swap
          </span>
        ) : (
          <span className={styles.statusLocked}>
            <LockKeyhole size={10} aria-hidden="true" />
            Need {missingGems.toLocaleString()} Gems
          </span>
        )}
      </div>

      {/* Conversion Amounts */}
      <div className={styles.conversionAmounts}>
        <div className={styles.amountValue}>
          {requiredGems.toLocaleString()} <span>Gems</span>
        </div>
        <ArrowRight className={styles.amountArrow} size={15} aria-hidden="true" />
        <div className={`${styles.amountValue} ${styles.receiveValue}`}>
          {receiveVEs.toLocaleString()} <span>VEs</span>
        </div>
      </div>

      {/* Description */}
      <p className={styles.cardDescription}>{option.description}</p>

      {/* Usability Progress Bar for Insufficient Balance */}
      {!isAvailable && (
        <div className={styles.progressWrapper} aria-label={`Progress: ${progressPercent}% to unlock`}>
          <div className={styles.progressLabelRow}>
            <span>Progress to unlock</span>
            <span className={styles.progressPercent}>{progressPercent}%</span>
          </div>
          <div className={styles.progressTrack}>
            <div
              className={styles.progressFill}
              style={{ width: `${progressPercent}%` }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      )}

      {/* Action Button Area */}
      <div className={styles.cardActionArea}>
        {isAvailable ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onConvert?.(option);
            }}
            className={`${styles.convertBtn} ${buttonClasses[option.color] || styles.convertBtnPurple}`}
            aria-label={`Convert ${requiredGems} Gems to ${receiveVEs} VEs`}
          >
            <Zap size={15} aria-hidden="true" />
            <span>Convert Rewards</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onEarnGems?.();
            }}
            className={`${styles.convertBtn} ${styles.convertBtnEarnMore}`}
            aria-label={`Earn ${missingGems} more Gems to unlock this conversion`}
          >
            <Plus size={15} aria-hidden="true" />
            <span>Get {missingGems.toLocaleString()} More Gems</span>
          </button>
        )}

        {!isAvailable && (
          <p className={styles.lockedWarning}>
            Balance: <span>{availableGems.toLocaleString()} Gems</span> / {requiredGems.toLocaleString()}
          </p>
        )}
      </div>
    </article>
  );
};

export default ExchangeCard;
