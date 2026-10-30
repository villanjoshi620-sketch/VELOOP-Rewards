import React from 'react';
import { Gem, RotateCw } from 'lucide-react';
import styles from '../../styles/EmptyState.module.css';

/**
 * EmptyState - Displayed when no exchange opportunities exist (Requirement 33)
 */
const EmptyState = ({ onRefresh }) => {
  return (
    <div className={styles.emptyContainer} role="status" aria-live="polite">
      <div className={styles.emojiIcon} aria-hidden="true">
        <Gem size={34} />
      </div>

      <h3 className={styles.emptyTitle}>
        No conversions available right now.
      </h3>

      <p className={styles.emptyText}>
        New reward conversion opportunities will appear here when available.
      </p>

      {onRefresh && (
        <button
          type="button"
          className={styles.refreshBtn}
          onClick={onRefresh}
          aria-label="Check for new conversion opportunities"
        >
          <RotateCw size={14} aria-hidden="true" />
          <span>Check Again</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;
