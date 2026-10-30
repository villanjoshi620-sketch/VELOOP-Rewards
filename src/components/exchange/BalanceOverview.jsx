import React from 'react';
import { Info } from 'lucide-react';
import { GemIcon, VeCoinIcon } from '../GemCoinIcons';
import styles from '../../styles/BalanceOverview.module.css';

const BalanceOverview = ({ balance, onOpenGemsInfo, onOpenVesInfo }) => {
  return (
    <section className={styles.balanceContainer} aria-label="Your reward balances">
      <button
        type="button"
        className={styles.balanceCard}
        onClick={onOpenGemsInfo}
        aria-label={`Available Gems: ${balance?.gems?.toLocaleString() || 0}. Click for details`}
      >
        <span className={styles.balanceIcon} aria-hidden="true">
          <GemIcon size={34} />
        </span>
        <div className={styles.balanceInfo}>
          <div className={styles.labelRow}>
            <span>Available Gems</span>
            <Info size={14} aria-hidden="true" />
          </div>
          <div className={styles.balanceValue} aria-hidden="true">
            {balance?.gems?.toLocaleString() || 0}
          </div>
          <div className={styles.subText}>Earned through your activities</div>
        </div>
        <span className={styles.balanceAction} aria-hidden="true">Details</span>
      </button>
      <button
        type="button"
        className={`${styles.balanceCard} ${styles.balanceCardVe}`}
        onClick={onOpenVesInfo}
        aria-label={`Available VEs: ${balance?.ves?.toLocaleString() || 0}. Click for details`}
      >
        <span className={styles.balanceIcon} aria-hidden="true">
          <VeCoinIcon size={34} />
        </span>
        <div className={styles.balanceInfo}>
          <div className={styles.labelRow}>
            <span>Available VEs</span>
            <Info size={14} aria-hidden="true" />
          </div>
          <div className={styles.balanceValue} aria-hidden="true">
            {balance?.ves?.toLocaleString() || 0}
          </div>
          <div className={styles.subText}>Ready for eligible rewards</div>
        </div>
        <span className={styles.balanceAction} aria-hidden="true">Details</span>
      </button>
    </section>
  );
};

export default BalanceOverview;
