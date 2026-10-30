import React from 'react';
import { AlertCircle, RotateCcw } from 'lucide-react';
import styles from '../../styles/ErrorState.module.css';

/**
 * ErrorState - Displayed when loading exchange options fails (Requirement 34)
 * Does NOT display technical errors, only user-friendly retry prompt.
 */
const ErrorState = ({ onRetry }) => {
  return (
    <div className={styles.errorContainer} role="alert" aria-live="assertive">
      <div className={styles.errorIconCircle} aria-hidden="true">
        <AlertCircle size={32} />
      </div>

      <h3 className={styles.errorTitle}>
        Unable to load exchange options.
      </h3>

      <p className={styles.errorText}>
        Please try again.
      </p>

      <button
        type="button"
        className={styles.retryBtn}
        onClick={onRetry}
        aria-label="Retry loading exchange options"
      >
        <RotateCcw size={15} aria-hidden="true" />
        <span>Retry</span>
      </button>
    </div>
  );
};

export default ErrorState;
