import React from 'react';
import { ArrowRight, CheckCircle2, FileText, History, XCircle } from 'lucide-react';
import { GemIcon } from '../GemCoinIcons';
import styles from '../../styles/ExchangeHistory.module.css';

const ExchangeHistory = ({ history = [], onSelectTransaction, onViewAll }) => {
  return (
    <section className={styles.historySection} aria-labelledby="history-heading">
      <div className={styles.historyHeader}>
        <h2 id="history-heading" className={styles.headerTitle}>
          <History size={16} aria-hidden="true" />
          <span>Recent Conversions</span>
        </h2>
        {history.length > 0 && (
          <button
            type="button"
            className={styles.viewAllBtn}
            onClick={onViewAll}
            aria-label="View all conversions"
          >
            View All <ArrowRight size={12} aria-hidden="true" />
          </button>
        )}
      </div>

      {history.length ? (
        <ul className={styles.historyList}>
          {history.slice(0, 5).map((item) => {
            const [date, time] = item.date.split(' - ');
            const completed = item.status === 'Completed';

            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={styles.historyItem}
                  onClick={() => onSelectTransaction?.(item)}
                  aria-label={`View receipt for ${item.gems} Gems converted to ${item.ves} VEs on ${date}`}
                >
                  <span className={`${styles.historyGem} ${styles[`gem${item.color}`] || ''}`} aria-hidden="true">
                    <GemIcon color={item.color || 'purple'} size={17} />
                  </span>
                  <span className={styles.historyDetails}>
                    <span className={styles.conversionLine}>
                      <span>{item.gems} Gems</span>
                      <ArrowRight size={11} aria-hidden="true" />
                      <strong>{item.ves} VEs</strong>
                    </span>
                    <span className={styles.dateLine}>{date}{time ? ` · ${time}` : ''}</span>
                  </span>
                  <span className={`${styles.statusBadge} ${completed ? styles.statusCompleted : styles.statusFailed}`}>
                    {completed ? <CheckCircle2 size={11} aria-hidden="true" /> : <XCircle size={11} aria-hidden="true" />}
                    {completed ? 'Done' : 'Failed'}
                  </span>
                  <span className={styles.receiptIcon} aria-hidden="true">
                    <FileText size={14} />
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={styles.emptyHistory}>Your completed conversions will appear here.</p>
      )}
    </section>
  );
};

export default ExchangeHistory;
