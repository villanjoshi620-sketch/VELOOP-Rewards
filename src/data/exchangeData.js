// Structured Data Architecture for VELOOP Rewards Exchange Center
// Easy backend integration ready (Requirement 35)

export const initialBalance = {
  gems: 420,
  ves: 3850
};

export const userProfile = {
  name: 'Pallav',
  greeting: 'Hello,',
  level: 'Level 7',
  id: '78459',
  avatarChar: 'P',
  walletAddress: '0x71a4f89d38c19920bf824c39a25b172a818c39a2',
  joinedDate: 'March 2025',
  totalGemsEarned: 3420,
  totalVesReceived: 14850,
};

// Structured Exchange Options as per Requirement 35
export const exchangeOptions = [
  {
    id: 'exchange-01',
    type: 'gem-to-ve',
    name: 'Daily Gem Conversion',
    badge: 'Popular',
    badgeColor: 'purple',
    requiredGems: 28,
    receiveVEs: 151,
    gems: 28, // alias for backwards compatibility
    ves: 151,  // alias for backwards compatibility
    multiplier: '5.4x',
    color: 'purple',
    description: 'Convert your earned Gems into VEs instantly.',
    btnColor: 'from-purple-600 to-purple-700',
    available: true,
    accentHex: '#a855f7'
  },
  {
    id: 'exchange-02',
    type: 'gem-to-ve',
    name: 'Reward Conversion',
    badge: 'Popular',
    badgeColor: 'blue',
    requiredGems: 39,
    receiveVEs: 168,
    gems: 39,
    ves: 168,
    multiplier: '4.3x',
    color: 'blue',
    description: 'Higher conversion for better rewards.',
    btnColor: 'from-blue-600 to-cyan-600',
    available: true,
    accentHex: '#3b82f6'
  },
  {
    id: 'exchange-03',
    type: 'gem-to-ve',
    name: 'Value Conversion',
    badge: null,
    badgeColor: 'green',
    requiredGems: 57,
    receiveVEs: 255,
    gems: 57,
    ves: 255,
    multiplier: '4.5x',
    color: 'green',
    description: 'Unlock greater value with more Gems.',
    btnColor: 'from-emerald-600 to-teal-700',
    available: true,
    accentHex: '#10b981'
  },
  {
    id: 'exchange-04',
    type: 'gem-to-ve',
    name: 'Premium Conversion',
    badge: 'Best Value',
    badgeColor: 'amber',
    requiredGems: 100,
    receiveVEs: 455,
    gems: 100,
    ves: 455,
    multiplier: '4.6x',
    color: 'amber',
    description: 'Premium conversion for premium rewards.',
    btnColor: 'from-amber-500 to-orange-600',
    available: true,
    accentHex: '#f59e0b'
  }
];

// Alias for backwards compatibility
export const conversionRates = exchangeOptions;

export const howExchangeWorksSteps = [
  {
    number: '01',
    title: 'Earn Gems',
    description: 'Complete eligible activities and earn Gems.',
    color: 'purple',
    iconType: 'gem',
    details: 'Participate in daily login quests, refer new members, and complete platform challenges to earn reward Gems directly in your wallet balance.'
  },
  {
    number: '02',
    title: 'Choose Conversion',
    description: 'Select a conversion that suits your Gems balance.',
    color: 'blue',
    iconType: 'list',
    details: 'Browse available tiers from Daily Gem Conversion to Premium Conversion. Tiers with higher Gems unlock higher VE multiplier bonuses.'
  },
  {
    number: '03',
    title: 'Review Exchange',
    description: 'Review the details before confirming the conversion.',
    color: 'teal',
    iconType: 'search',
    details: 'Verify the required Gems, calculated VEs, and live exchange rate before final confirmation. All conversions are transparent and instant.'
  },
  {
    number: '04',
    title: 'Confirm',
    description: 'Confirm the exchange to convert your Gems.',
    color: 'amber',
    iconType: 'shield',
    details: 'Authorize the conversion securely. The selected Gems are deducted permanently and the conversion is registered on the VELOOP Rewards ledger.'
  },
  {
    number: '05',
    title: 'Receive VEs',
    description: 'Receive VEs are added to your balance instantly.',
    color: 'green',
    iconType: 've',
    details: 'Your new VE balance reflects immediately in your wallet. Use your VEs for tier upgrades, marketplace redemptions, and exclusive benefits.'
  }
];

export const exchangeRulesList = [
  'Only eligible Gems can be exchanged.',
  'Exchange rates are predetermined by VELOOP Rewards.',
  'Available conversions may vary.',
  'A successful conversion cannot be duplicated.',
  'Your balance is updated after successful conversion.',
  'Platform rules apply.'
];

export const recentConversionsList = [
  {
    id: 1,
    gems: 28,
    ves: 151,
    date: '26 Aug 2026 - 04:32 PM',
    status: 'Completed',
    color: 'purple',
    txHash: '0x8f2c...41e9'
  },
  {
    id: 2,
    gems: 39,
    ves: 168,
    date: '25 Aug 2026 - 11:15 AM',
    status: 'Completed',
    color: 'blue',
    txHash: '0x3a7d...99b2'
  },
  {
    id: 3,
    gems: 57,
    ves: 255,
    date: '23 Aug 2026 - 06:40 PM',
    status: 'Completed',
    color: 'green',
    txHash: '0x1e4f...77d3'
  },
  {
    id: 4,
    gems: 28,
    ves: 112,
    date: '20 Aug 2026 - 09:15 AM',
    status: 'Completed',
    color: 'purple',
    txHash: '0x7b1c...22a8'
  },
  {
    id: 5,
    gems: 28,
    ves: 151,
    date: '19 Aug 2026 - 03:22 PM',
    status: 'Failed',
    color: 'purple',
    txHash: '0x4f9b...11c4'
  }
];

// Tasks for 'Earn More Gems' Modal
export const initialGemsTasks = [
  {
    id: 'daily_login',
    title: 'Daily Check-in Bonus',
    desc: 'Log in to VELOOP Rewards today',
    reward: 15,
    claimed: false,
    icon: 'calendar'
  },
  {
    id: 'twitter_follow',
    title: 'Follow VELOOP on X',
    desc: 'Stay updated with reward announcements',
    reward: 25,
    claimed: false,
    icon: 'share'
  },
  {
    id: 'discord_join',
    title: 'Join Discord Community',
    desc: 'Chat with 50,000+ reward collectors',
    reward: 35,
    claimed: false,
    icon: 'message'
  },
  {
    id: 'referral_quest',
    title: 'Invite First Friend',
    desc: 'Share your referral link with a friend',
    reward: 50,
    claimed: false,
    icon: 'users'
  }
];

// Notifications
export const initialNotifications = [
  {
    id: 1,
    title: 'Conversion Completed',
    message: '28 Gems successfully converted to 151 VEs.',
    time: '2 hours ago',
    read: false,
    type: 'success'
  },
  {
    id: 2,
    title: 'Level 7 Bonus Activated',
    message: 'Congratulations Pallav! You unlocked a +10% VE bonus multiplier.',
    time: 'Yesterday',
    read: false,
    type: 'reward'
  },
  {
    id: 3,
    title: 'Security Update',
    message: 'Your wallet 0x71a4...39a2 has 2FA enabled.',
    time: '3 days ago',
    read: false,
    type: 'info'
  }
];
