import React, { useEffect } from 'react';
import { CheckCircle2, Copy, Sparkles, ArrowRight } from 'lucide-react';
import { GemIcon, VeCoinIcon } from '../GemCoinIcons';
import styles from '../../styles/ConversionSuccess.module.css';

/**
 * ConversionSuccess - Displays congratulatory success state after conversion.
 * Features clean transaction summary and receipt information.
 */
const ConversionSuccess = ({
  isOpen,
  lastConversion,
  balance,
  onClose,
  onViewHistory,
  onShowToast
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose?.();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !lastConversion) return null;

  const copyTxHash = () => {
    if (lastConversion.txHash) {
      navigator.clipboard?.writeText(lastConversion.txHash);
      onShowToast?.('Receipt ID copied to clipboard!', 'info');
    }
  };

  const gemsDeducted = lastConversion.requiredGems ?? lastConversion.gems;
  const vesReceived = lastConversion.receiveVEs ?? lastConversion.ves;

  return (
    <div
      className={styles.successBackdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose?.();
      }}
    >
      <div className={styles.successCard}>
        {/* Celebration Icon */}
        <div className={styles.confettiHeader}>
          <CheckCircle2 size={40} aria-hidden="true" />
        </div>

        <h2 id="success-modal-title" className={styles.successTitle}>
          Conversion Successful!
        </h2>
        <p className={styles.successSubtitle}>
          Your Gems were successfully converted into VEs.
        </p>

        {/* Breakdown Summary */}
        <div className={styles.resultBreakdown}>
          <div className={styles.resultItem}>
            <span className={styles.resultItemLabel}>Deducted</span>
            <div className={`${styles.resultItemValue} text-purple-300`}>
              <GemIcon size={18} />
              <span>-{gemsDeducted}</span>
            </div>
          </div>

          <ArrowRight size={18} className="text-slate-500" aria-hidden="true" />

          <div className={styles.resultItem}>
            <span className={styles.resultItemLabel}>Received</span>
            <div className={`${styles.resultItemValue} text-amber-300`}>
              <VeCoinIcon size={18} />
              <span>+{vesReceived}</span>
            </div>
          </div>
        </div>

        {/* Transaction Reference */}
        <div className={styles.txDetails}>
          <span>Receipt ID</span>
          <div
            className={styles.txHashRow}
            onClick={copyTxHash}
            role="button"
            tabIndex={0}
            title="Click to copy transaction hash"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copyTxHash();
              }
            }}
          >
            <span>{lastConversion.txHash || '0x7b1c...99a2'}</span>
            <Copy size={13} className="cursor-pointer hover:text-white" aria-hidden="true" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className={styles.actionButtons}>
          <button
            type="button"
            className={styles.viewHistoryBtn}
            onClick={() => {
              onClose?.();
              onViewHistory?.();
            }}
          >
            View in History
          </button>

          <button
            type="button"
            className={styles.doneBtn}
            onClick={onClose}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversionSuccess;
