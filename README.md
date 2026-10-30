# VELOOP Rewards — Exchange Center

> **Turn your earned Gems into VEs.** A reward-first conversion experience for the VELOOP Rewards Platform.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![React](https://img.shields.io/badge/React-18.3.1-blue.svg)]()
[![Vite](https://img.shields.io/badge/Vite-6.4.4-646CFF.svg)]()
[![Bootstrap](https://img.shields.io/badge/Bootstrap-5.3.3-purple.svg)]()
[![CSS Modules](https://img.shields.io/badge/CSS_Modules-supported-blueviolet.svg)]()
[![License](https://img.shields.io/badge/license-MIT-green.svg)]()

---

## 1. Project Overview
The **VELOOP Rewards Exchange Center** enables members to convert their hard-earned reward **Gems** into platform-native **VEs** (Value Energies). It is intentionally crafted as a **reward conversion experience** rather than a speculative cryptocurrency exchange, reinforcing feelings of accomplishment, trust, transparency, and delight.

---

## 2. Exchange Center Concept
- **Rewards-First Mindset**: Unlike financial trading platforms with volatile tickers, VELOOP Exchange Center feels like a celebration of achievements.
- **Predetermined & Transparent Conversion Tiers**: Conversion values are defined by VELOOP Rewards.
- **Instant Settlement**: All conversions immediately credit the member's VE balance and register a verifiable receipt.
- **Accessibility & Gamification**: Tier multipliers and visual level progress motivate users to complete quests and convert milestones.

---

## 3. Features
- **Live Balances**: Real-time display of available Gems and VEs with instant reflection upon conversion.
- **4 Predetermined Conversion Tiers**:
  1. **Daily Gem Conversion**: 28 Gems → 151 VEs (5.4x multiplier, Popular badge)
  2. **Reward Conversion**: 39 Gems → 168 VEs (4.3x multiplier, Popular badge)
  3. **Value Conversion**: 57 Gems → 255 VEs (4.5x multiplier)
  4. **Premium Conversion**: 100 Gems → 455 VEs (4.6x multiplier, Best Value badge)
- **Insufficient Balance Guidance**: Shows the exact Gem shortfall and links to the earn-rewards flow instead of opening a conversion.
- **Two-Step Confirmation Modal (`ExchangeModal`)**:
  - Displays rate, deduction amount, received amount, and projected balances.
  - Fully accessible (supports Escape key, auto-focus, keyboard navigation).
- **Celebration Success Modal (`ConversionSuccess`)**:
  - Animated celebration icon and transaction breakdown.
  - Shows a receipt reference with copy-to-clipboard functionality.
- **Empty State (`EmptyState`)**:
  - Displays a reward-themed illustration with:
    > *"No conversions available right now. New reward conversion opportunities will appear here when available."*
- **Error State (`ErrorState`)**:
  - User-friendly message without technical jargon:
    > *"Unable to load exchange options. Please try again. [ Retry ]"*
- **Realistic Skeleton Loader (`ExchangeLoader`)**:
  - Shimmering pulse skeletons while fetching live conversion opportunities.
- **Preview States**:
  - A collapsed preview menu allows switching between:
    - **Active Conversions**
    - **Loading State**
    - **Empty State**
    - **Error State**
    - **Low Balance (10 Gems)**
    - **Reset Balance (420 Gems & 3,850 VEs)**
- **Recent Activity Ledger (`ExchangeHistory`)**:
  - Chronological transaction log with date, summary, status pills, and clickable receipts.
- **Exchange Guidelines (`ExchangeRules`) & Step Walkthrough (`HowExchangeWorks`)**:
  - Built-in educational guidelines and interactive step-by-step tour.

---

## 4. Exchange Logic
The exchange logic enforces the following invariants:
1. **Deduction & Addition**:
   $$\text{Balance}_{\text{Gems, new}} = \text{Balance}_{\text{Gems, old}} - \text{RequiredGems}$$
   $$\text{Balance}_{\text{VEs, new}} = \text{Balance}_{\text{VEs, old}} + \text{ReceiveVEs}$$
2. **Eligibility Condition**: Conversion is only permitted if $\text{Balance}_{\text{Gems}} \ge \text{RequiredGems}$.
3. **Immutability & Persistence**: Successful conversions generate a unique transaction ID (`0x...`) and persist immediately to browser `localStorage`.

---

## 5. User Flow
```
User navigates to Exchange Center
        │
        ▼
Review Hero & Balances (Gems: 420 | VEs: 3,850)
        │
        ▼
Select Conversion Package (e.g., 28 Gems → 151 VEs)
        │
        ├── [If Gems < Required] ──► Shows the Gem shortfall and "Earn more Gems"
        │
        └── [If Gems >= Required] ─► Opens Confirmation Modal (ExchangeModal)
                                           │
                                           ▼
                                    User clicks "Confirm & Convert"
                                           │
                                           ▼
                                    Simulated processing (1000ms)
                                           │
                                           ▼
                                    Balances update in real-time
                                    Transaction registered in History
                                    Toast notification appears
                                           │
                                           ▼
                                    ConversionSuccess dialog displayed
                                    (Options: "View in History" or "Done")
```

---

## 6. Component Architecture
```
src/
├── components/
│   ├── exchange/
│   │   ├── ExchangeHero.jsx        # Conversion introduction with supplied reward artwork
│   │   ├── BalanceOverview.jsx     # Responsive Gems & VEs balance cards
│   │   ├── ExchangeCard.jsx        # Illustrated reward option with eligibility-aware actions
│   │   ├── ExchangeModal.jsx       # Accessible confirmation dialog (ESC, ARIA, focus)
│   │   ├── ConversionSuccess.jsx   # Congratulatory receipt modal with txHash copying
│   │   ├── ExchangeHistory.jsx     # Ledger table with status badges and receipts
│   │   ├── ExchangeRules.jsx       # Platform rules and eligibility policies
│   │   ├── HowExchangeWorks.jsx    # 5-step interactive conversion guide
│   │   ├── ExchangeLoader.jsx      # Skeleton shimmer loading state
│   │   ├── EmptyState.jsx          # Empty conversion state
│   │   └── ErrorState.jsx          # Requirement 34: Friendly retry error state
│   ├── GemCoinIcons.jsx            # Custom SVG vector assets for Gems and VE coins
│   ├── Header.jsx                  # Navigation header with balance pills & notifications
│   ├── Sidebar.jsx                 # Collapsible rewards navigation bar
│   └── Toast.jsx                   # Non-blocking feedback toast
│
├── pages/
│   └── ExchangeCenter/
│       └── ExchangeCenter.jsx      # Master page orchestrator & state manager
│
├── data/
│   └── exchangeData.js             # Structured frontend data (Requirement 35)
│
└── styles/
    ├── ExchangeCenter.module.css
    ├── ExchangeHero.module.css
    ├── BalanceOverview.module.css
    ├── ExchangeCard.module.css
    ├── ExchangeModal.module.css
    ├── ConversionSuccess.module.css
    ├── ExchangeHistory.module.css
    ├── ExchangeRules.module.css
    ├── HowExchangeWorks.module.css
    ├── ExchangeLoader.module.css
    ├── EmptyState.module.css
    └── ErrorState.module.css
```

---

## 7. Technology Stack
- **Core Framework**: React 18 (Hooks, StrictMode)
- **Build Tool**: Vite 6 (Fast HMR & Optimized production bundle)
- **Styling Architecture**:
  - **CSS Modules** (`.module.css`) for encapsulated, component-scoped styling
  - **Bootstrap 5.3** for responsive layout & grid foundation
  - **Tailwind CSS** for atmospheric utilities and animations
- **Iconography**: `lucide-react` & `react-icons`
- **Typography**: Plus Jakarta Sans & Inter (Google Fonts)

---

## 8. Installation & Local Development

### Prerequisites
- Node.js (v18.0.0 or higher recommended)
- npm or yarn

### Steps
1. **Navigate to the project folder**:
   ```bash
   cd veexchange
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Start local development server**:
   ```bash
   npm run dev
   ```
4. **Open in browser**:
   Navigate to `http://localhost:3000/` or the port displayed in your terminal.

---

## 9. Build Instructions
To build the optimized production distribution:
```bash
npm run build
```
The output files will be compiled into the `dist/` directory.

To preview the production build locally:
```bash
npm run preview
```

---

## 10. Responsive Design
The application is fully responsive from **320px** mobile viewports up to **1920px+** ultra-wide displays:
- **Mobile (< 640px)**: 1-column conversion stack, collapsible drawer sidebar, touch-friendly tap targets (minimum 44px).
- **Tablet (640px - 1023px)**: 2-column cards grid, optimized balance display.
- **Desktop (1024px - 1440px)**: 4-column cards grid, persistent left navigation sidebar.
- **Ultra-Wide (1920px+)**: Constrained maximum container width (`1600px`) preventing horizontal stretching or overflow.

---

## 11. Animation System
- **Particle & Glow Pulses**: Layered ambient radial gradients drifting smoothly across the background.
- **Hover Transitions**: `scale(1.02)`, card elevation translateY, and shimmer highlights.
- **Card Entrance Animations**: Staggered fade-up entrances for cards upon mount.
- **Modal Transitions**: Backdrop blur fades with smooth pop-in scaling.

---

## 12. Future Backend Integration (Requirement 35)
The data layer is isolated in `src/data/exchangeData.js`:
```javascript
export const exchangeOptions = [
  {
    id: "exchange-01",
    type: "gem-to-ve",
    name: "Daily Gem Conversion",
    requiredGems: 28,
    receiveVEs: 151,
    multiplier: "5.4x",
    color: "purple",
    description: "Convert your earned Gems into VEs instantly.",
    available: true,
  },
  ...
];
```
To connect a live REST or GraphQL backend:
1. Replace static imports with a `fetchExchangeOptions()` API call inside a `useEffect` hook in `ExchangeCenter.jsx`.
2. The `viewState` transitions (`loading` → `active` or `error`) are already wired to handle API responses, empty payloads (`empty`), and network failures (`error` with `Retry`).

---

## 13. Deployment
The project is configured for one-click deployment on **Vercel** or **Netlify**:
- `vercel.json` is configured for single-page routing:
  ```json
  {
    "rewrites": [
      { "source": "/(.*)", "destination": "/index.html" }
    ]
  }
  ```
- To deploy using Vercel CLI:
  ```bash
  vercel --prod
  ```
- Or link the GitHub repository to the Vercel / Netlify dashboard and specify:
  - **Build Command**: `npm run build`
  - **Output Directory**: `dist`

---

## 14. License
Developed with ❤️ for the **VELOOP Rewards Platform**. All rights reserved.
