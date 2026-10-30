import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

// Core Navigation and Global Components
import Sidebar from '../../components/Sidebar';
import Header from '../../components/Header';
import RewardGrowthBanner from '../../components/RewardGrowthBanner';
import WhatAreThese from '../../components/WhatAreThese';

// Modular Exchange Components as per Requirement 36
import ExchangeHero from '../../components/exchange/ExchangeHero';
import ExchangeCard from '../../components/exchange/ExchangeCard';
import ExchangeModal from '../../components/exchange/ExchangeModal';
import ConversionSuccess from '../../components/exchange/ConversionSuccess';
import ExchangeHistory from '../../components/exchange/ExchangeHistory';
import ExchangeRules from '../../components/exchange/ExchangeRules';
import HowExchangeWorks from '../../components/exchange/HowExchangeWorks';
import ExchangeLoader from '../../components/exchange/ExchangeLoader';
import EmptyState from '../../components/exchange/EmptyState';
import ErrorState from '../../components/exchange/ErrorState';

// Ancillary Modals & Toast
import ProfileModal from '../../components/ProfileModal';
import EarnGemsModal from '../../components/EarnGemsModal';
import NotificationsModal from '../../components/NotificationsModal';
import FullHistoryModal from '../../components/FullHistoryModal';
import TransactionReceiptModal from '../../components/TransactionReceiptModal';
import CurrencyInfoModal from '../../components/CurrencyInfoModal';
import RulesModal from '../../components/RulesModal';
import TiersModal from '../../components/TiersModal';
import SidebarTabModal from '../../components/SidebarTabModal';
import Toast from '../../components/Toast';

// Structured Exchange Data Architecture (Requirement 35)
import {
  initialBalance,
  exchangeOptions,
  howExchangeWorksSteps,
  exchangeRulesList,
  recentConversionsList,
  initialNotifications,
  userProfile
} from '../../data/exchangeData';

// Modular CSS
import styles from '../../styles/ExchangeCenter.module.css';

function ExchangeCenter() {
  const [balance, setBalance] = useState(initialBalance);
  const [recentHistory, setRecentHistory] = useState(recentConversionsList);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [activeTab, setActiveTab] = useState('exchange');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Exchange Center Data State Simulation (for Review & Requirements 33, 34, 45)
  // modes: 'active' | 'loading' | 'empty' | 'error'
  const [viewState, setViewState] = useState('active');

  // Conversion Modals state
  const [selectedConversion, setSelectedConversion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [lastCompletedTx, setLastCompletedTx] = useState(null);
  const [isConverting, setIsConverting] = useState(false);

  // Auxiliary Modals state
  const [showProfile, setShowProfile] = useState(false);
  const [showEarnGems, setShowEarnGems] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [currencyInfoType, setCurrencyInfoType] = useState(null); // 'gems' | 'ves'
  const [showRulesModal, setShowRulesModal] = useState(false);
  const [showTiersModal, setShowTiersModal] = useState(false);
  const [activeSidebarModalTab, setActiveSidebarModalTab] = useState(null);

  // Toast notification
  const [toast, setToast] = useState(null);

  // Persistence
  useEffect(() => {
    try {
      const savedBalance = localStorage.getItem('veloop_balance');
      const savedHistory = localStorage.getItem('veloop_history');
      if (savedBalance) setBalance(JSON.parse(savedBalance));
      if (savedHistory) setRecentHistory(JSON.parse(savedHistory));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleSelectTab = (tabId) => {
    setIsSidebarOpen(false);
    if (tabId === 'exchange') {
      setActiveTab('exchange');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tabId === 'history') {
      setShowFullHistory(true);
    } else {
      setActiveSidebarModalTab(tabId);
    }
  };

  const handleOpenConversion = (conversion) => {
    setSelectedConversion(conversion);
    setShowModal(true);
  };

  const handleConfirmConversion = () => {
    if (!selectedConversion) return;
    setIsConverting(true);

    const requiredGems = selectedConversion.requiredGems ?? selectedConversion.gems;
    const receiveVEs = selectedConversion.receiveVEs ?? selectedConversion.ves;

    setTimeout(() => {
      const newGems = balance.gems - requiredGems;
      const newVes = balance.ves + receiveVEs;
      const updatedBalance = { gems: Math.max(0, newGems), ves: newVes };

      setBalance(updatedBalance);
      localStorage.setItem('veloop_balance', JSON.stringify(updatedBalance));

      const now = new Date();
      const dateStr = `${now.getDate()} ${now.toLocaleString('default', { month: 'short' })} ${now.getFullYear()} - ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

      const newHistoryItem = {
        id: Date.now(),
        gems: requiredGems,
        ves: receiveVEs,
        date: dateStr,
        status: 'Completed',
        color: selectedConversion.color || 'purple',
        txHash: `0x${Math.random().toString(16).substring(2, 6)}...${Math.random().toString(16).substring(2, 6)}`
      };

      const updatedHistory = [newHistoryItem, ...recentHistory];
      setRecentHistory(updatedHistory);
      localStorage.setItem('veloop_history', JSON.stringify(updatedHistory));

      // Notification
      const newNotif = {
        id: Date.now(),
        title: 'Conversion Completed',
        message: `${requiredGems} Gems converted to ${receiveVEs} VEs for ${userProfile.name}.`,
        time: 'Just now',
        read: false,
        type: 'success'
      };
      setNotifications(prev => [newNotif, ...prev]);

      setLastCompletedTx(newHistoryItem);
      setIsConverting(false);
      setShowModal(false);
      setShowSuccess(true);
      showToast(`Successfully converted ${requiredGems} Gems to ${receiveVEs} VEs!`, 'success');
    }, 1000);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setSelectedConversion(null);
  };

  const handleAddGems = (amount) => {
    const newGems = balance.gems + amount;
    const updated = { ...balance, gems: newGems };
    setBalance(updated);
    localStorage.setItem('veloop_balance', JSON.stringify(updated));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className={styles.exchangeCenterWrapper}>
      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-purple-600/6 rounded-full blur-[160px] animate-particle" />
        <div className="absolute top-1/3 right-10 w-[550px] h-[550px] bg-amber-500/5 rounded-full blur-[150px] animate-particle-delay" />
        <div className="absolute bottom-10 left-1/3 w-[700px] h-[700px] bg-indigo-600/5 rounded-full blur-[180px] animate-particle-slow" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(rgba(168, 85, 247, 0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />
      </div>

      <div className={styles.mainLayout}>
        {/* Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={handleSelectTab}
          onOpenProfile={() => setShowProfile(true)}
          onOpenEarnGems={() => setShowEarnGems(true)}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 min-w-0 md:ml-48 flex flex-col relative z-10">
          {/* Header */}
          <Header
            balance={balance}
            unreadNotificationsCount={unreadCount}
            onToggleSidebar={() => setIsSidebarOpen(true)}
            onToggleNotifications={() => setShowNotifications(true)}
            onOpenProfile={() => setShowProfile(true)}
            onOpenGemsInfo={() => setCurrencyInfoType('gems')}
            onOpenVesInfo={() => setCurrencyInfoType('ves')}
          />

          <main className={styles.contentArea}>
            {/* Exchange Hero */}
            <ExchangeHero
              balance={balance}
              onOpenGemsInfo={() => setCurrencyInfoType('gems')}
              onOpenVesInfo={() => setCurrencyInfoType('ves')}
              onExploreRules={() => setShowRulesModal(true)}
            />

            {/* Conversions Section */}
            <section className="mb-6" aria-labelledby="conversions-heading">
              <div className={styles.sectionHeader}>
                <div className={styles.sectionTitleGroup}>
                  <div className={styles.sectionBadge}>
                    <Sparkles size={12} aria-hidden="true" />
                    <span>💎</span>
                    <span>Reward options</span>
                  </div>
                  <h2 id="conversions-heading" className={styles.sectionHeading}>
                    Available Conversions
                  </h2>
                  <p className={styles.sectionSubheading}>
                    Choose a conversion package that best matches your Gems balance.
                  </p>
                </div>

                <div className={styles.sectionActions}>
                  <button
                    type="button"
                    onClick={() => setShowTiersModal(true)}
                    className={styles.rateInfoButton}
                  >
                    View Rate Multipliers
                  </button>
                </div>
              </div>

              {/* Dynamic View: Active | Loading | Empty | Error */}
              {viewState === 'loading' && (
                <ExchangeLoader count={4} />
              )}

              {viewState === 'empty' && (
                <EmptyState onRefresh={() => setViewState('active')} />
              )}

              {viewState === 'error' && (
                <ErrorState onRetry={() => setViewState('active')} />
              )}

              {viewState === 'active' && (
                <div className={styles.cardsGrid}>
                  {exchangeOptions.map((option, idx) => (
                    <ExchangeCard
                      key={option.id}
                      option={option}
                      balance={balance}
                      onConvert={handleOpenConversion}
                      onEarnGems={() => setShowEarnGems(true)}
                      index={idx}
                    />
                  ))}
                </div>
              )}

              {/* Reward Growth Banner */}
              <RewardGrowthBanner onOpenTiers={() => setShowTiersModal(true)} />
            </section>

            {/* How Exchange Works Section */}
            <div className="mb-8">
              <HowExchangeWorks
                steps={howExchangeWorksSteps}
                onSelectStep={() => setShowRulesModal(true)}
              />
            </div>

            {/* Bottom Grid: Rules & History */}
            <div className={styles.bottomGrid}>
              <ExchangeRules
                rules={exchangeRulesList}
                onViewFullRules={() => setShowRulesModal(true)}
              />
              <ExchangeHistory
                history={recentHistory}
                onSelectTransaction={(tx) => setSelectedTransaction(tx)}
                onViewAll={() => setShowFullHistory(true)}
              />
              <WhatAreThese
                onOpenRules={() => setShowRulesModal(true)}
                onOpenGemsInfo={() => setCurrencyInfoType('gems')}
                onOpenVesInfo={() => setCurrencyInfoType('ves')}
              />
            </div>
          </main>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ExchangeModal
        isOpen={showModal}
        conversion={selectedConversion}
        balance={balance}
        isConverting={isConverting}
        onConfirm={handleConfirmConversion}
        onClose={() => setShowModal(false)}
      />

      {/* Success Modal */}
      <ConversionSuccess
        isOpen={showSuccess}
        lastConversion={lastCompletedTx || selectedConversion}
        balance={balance}
        onClose={handleCloseSuccess}
        onViewHistory={() => setShowFullHistory(true)}
        onShowToast={showToast}
      />

      {/* User Profile Modal */}
      {showProfile && (
        <ProfileModal
          balance={balance}
          onClose={() => setShowProfile(false)}
          onShowToast={showToast}
        />
      )}

      {/* Earn More Gems Modal */}
      {showEarnGems && (
        <EarnGemsModal
          onClose={() => setShowEarnGems(false)}
          onAddGems={handleAddGems}
          onShowToast={showToast}
        />
      )}

      {/* Notifications Modal */}
      {showNotifications && (
        <NotificationsModal
          notifications={notifications}
          onClose={() => setShowNotifications(false)}
          onMarkAllRead={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
          onClearAll={() => setNotifications([])}
          onShowToast={showToast}
        />
      )}

      {/* Full History Modal */}
      {showFullHistory && (
        <FullHistoryModal
          conversions={recentHistory}
          onClose={() => setShowFullHistory(false)}
          onSelectTransaction={(tx) => setSelectedTransaction(tx)}
          onShowToast={showToast}
        />
      )}

      {/* Transaction Receipt Modal */}
      {selectedTransaction && (
        <TransactionReceiptModal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          onShowToast={showToast}
        />
      )}

      {/* Currency Info Modal */}
      {currencyInfoType && (
        <CurrencyInfoModal
          type={currencyInfoType}
          balance={balance}
          onClose={() => setCurrencyInfoType(null)}
          onOpenExchange={() => {
            setCurrencyInfoType(null);
            handleOpenConversion(exchangeOptions[0]);
          }}
          onOpenEarn={() => {
            setCurrencyInfoType(null);
            setShowEarnGems(true);
          }}
        />
      )}

      {/* Rules Modal */}
      {showRulesModal && (
        <RulesModal onClose={() => setShowRulesModal(false)} />
      )}

      {/* Tiers Multiplier Modal */}
      {showTiersModal && (
        <TiersModal onClose={() => setShowTiersModal(false)} />
      )}

      {/* Sidebar Navigation Sub-modals */}
      {activeSidebarModalTab && (
        <SidebarTabModal
          tab={activeSidebarModalTab}
          balance={balance}
          onClose={() => setActiveSidebarModalTab(null)}
          onShowToast={showToast}
          onSwitchToExchange={() => {
            setActiveSidebarModalTab(null);
            setActiveTab('exchange');
          }}
        />
      )}

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

export default ExchangeCenter;
