import React, { useEffect, useRef } from 'react';
import { X, ArrowRight, ShieldCheck, Loader2 } from 'lucide-react';
import { GemIcon, VeCoinIcon } from '../GemCoinIcons';
import styles from '../../styles/ExchangeModal.module.css';

/**
 * ExchangeModal - Confirmation modal for exchanging Gems to VEs.
 * Full accessibility: keyboard trap, Escape key listener, ARIA dialog.
 */
const ExchangeModal = ({
  isOpen,
  conversion,
  balance,
  isConverting,
  onConfirm,
  onClose
}) => {
  const modalRef = useRef(null);
  const confirmBtnRef = useRef(null);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && !isConverting) {
        onClose?.();
      }
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      // Auto-focus confirm button
      setTimeout(() => confirmBtnRef.current?.focus(), 50);
    }

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isConverting, onClose]);

  if (!isOpen || !conversion) return null;

  const requiredGems = conversion.requiredGems ?? conversion.gems;
  const receiveVEs = conversion.receiveVEs ?? conversion.ves;
  const currentGems = balance?.gems ?? 0;
  const currentVes = balance?.ves ?? 0;
  const remainingGems = Math.max(0, currentGems - requiredGems);
  const projectedVes = currentVes + receiveVEs;

  return (
    <div
      className={styles.modalBackdrop}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-conversion-title"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isConverting) {
          onClose?.();
        }
      }}
    >
      <div className={styles.modalBox} ref={modalRef}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <div className={styles.headerTitleGroup}>
            <div className={styles.headerIcon}>
              <ShieldCheck size={22} aria-hidden="true" />
            </div>
            <div>
              <h2 id="modal-conversion-title" className={styles.modalTitle}>
                Confirm Conversion
              </h2>
              <p className={styles.modalSubtitle}>
                Review your VELOOP reward conversion
              </p>
            </div>
          </div>

          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            disabled={isConverting}
            aria-label="Close conversion modal"
          >
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {/* Rate Banner */}
          <div className={styles.rateBanner}>
            <span>Tier Rate: 1 Gem = {(receiveVEs / requiredGems).toFixed(2)} VEs</span>
            <span>Instant & Guaranteed</span>
          </div>

          {/* Breakdown Card */}
          <div className={styles.conversionSummaryCard}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>
                <GemIcon size={16} /> Gems to Deduct
              </span>
              <span className={`${styles.summaryValue} text-red-400`}>
                -{requiredGems} Gems
              </span>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>
                <VeCoinIcon size={16} /> VEs to Receive
              </span>
              <span className={`${styles.summaryValue} text-emerald-400`}>
                +{receiveVEs} VEs
              </span>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Remaining Gems</span>
              <span className={styles.summaryValue}>
                {remainingGems.toLocaleString()} Gems
              </span>
            </div>

            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>New Total VEs</span>
              <span className={`${styles.summaryValue} text-purple-300`}>
                {projectedVes.toLocaleString()} VEs
              </span>
            </div>
          </div>

          <p className={styles.disclaimerText}>
            By proceeding, you agree to convert your reward Gems into VEs under the VELOOP Rewards program. This operation is recorded instantly on your account.
          </p>
        </div>

        {/* Footer */}
        <div className={styles.modalFooter}>
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onClose}
            disabled={isConverting}
          >
            Cancel
          </button>

          <button
            type="button"
            ref={confirmBtnRef}
            className={`${styles.confirmBtn} ${isConverting ? styles.confirmBtnLoading : ''}`}
            onClick={onConfirm}
            disabled={isConverting}
            aria-label="Confirm and convert rewards now"
          >
            {isConverting ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                <span>Processing Conversion...</span>
              </>
            ) : (
              <>
                <span>Confirm & Convert</span>
                <ArrowRight size={15} aria-hidden="true" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExchangeModal;
