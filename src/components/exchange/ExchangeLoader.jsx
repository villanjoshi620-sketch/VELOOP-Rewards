import React from 'react';
import styles from '../../styles/ExchangeLoader.module.css';

const ExchangeLoader = ({ count = 4 }) => {
  return (
    <div className={styles.loaderContainer} role="status" aria-label="Preparing your reward conversions">
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.skeletonCard} aria-hidden="true">
          <div className={styles.skeletonShimmer} />
          <div className={styles.skeletonArtwork} />
          <div className={styles.skeletonDetails}>
            <div className={styles.skeletonBadge} />
            <div className={styles.skeletonLineTitle} />
            <div className={styles.skeletonLineDesc} />
          </div>
          <div className={styles.skeletonButton} />
        </div>
      ))}
      <span className={styles.loadingLabel}>Preparing your reward conversions…</span>
    </div>
  );
};

export default ExchangeLoader;
