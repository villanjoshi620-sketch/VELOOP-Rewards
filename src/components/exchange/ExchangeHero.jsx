import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import BalanceOverview from './BalanceOverview';
import styles from '../../styles/ExchangeHero.module.css';
import heroPortalImg from '../../assets/images/hero_portal.jpg';

const ExchangeHero = ({ balance, onOpenGemsInfo, onOpenVesInfo, onExploreRules }) => {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroContent}>
        <div className={styles.heroLeft}>
          <div className={styles.platformBadge}>
            <Sparkles size={14} className="text-purple-400" aria-hidden="true" />
            <span className={styles.platformBadgeText}>VELOOP REWARDS</span>
          </div>

          <h1 className={styles.heroTitle}>Exchange Center</h1>
          <p className={styles.heroSubtitle}>Turn your earned Gems into VEs.</p>
          <p className={styles.heroDescription}>
            Convert your earned Gems into VEs and continue your reward journey with premium multipliers.
          </p>
          <BalanceOverview
            balance={balance}
            onOpenGemsInfo={onOpenGemsInfo}
            onOpenVesInfo={onOpenVesInfo}
          />
        </div>

        <div className={styles.heroRight}>
          <div className={styles.artworkFrame}>
            <img
              src={heroPortalImg}
              alt="A VE reward coin emerging from a glowing gem portal"
              className={styles.heroArtwork}
              loading="eager"
            />
            <div className={styles.artworkCaption}>
              <span>GEM</span>
              <ArrowRight size={15} aria-hidden="true" />
              <span>VE REWARDS</span>
            </div>
          </div>
        </div>
      </div>

      <button type="button" className={styles.rulesLink} onClick={onExploreRules}>
        <Sparkles size={13} aria-hidden="true" />
        Exchange guidelines
        <ArrowRight size={14} aria-hidden="true" />
      </button>
    </div>
  );
};

export default ExchangeHero;
