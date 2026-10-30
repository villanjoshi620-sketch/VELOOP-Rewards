import React from 'react';
import conversionGem from '../assets/images/conversion_gem.png';
import veCoin from '../assets/images/ve_coin_icon.png';

export const GemIcon = ({ color = 'purple', size = 32, className = '' }) => {
  const hueRotation = {
    purple: '0deg',
    blue: '-60deg',
    green: '210deg',
    amber: '130deg',
  }[color] || '0deg';

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={conversionGem}
        alt=""
        aria-hidden="true"
        draggable="false"
        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
        style={{ filter: `hue-rotate(${hueRotation})` }}
      />
    </div>
  );
};

export const VeCoinIcon = ({ size = 32, className = '' }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={veCoin}
        alt=""
        aria-hidden="true"
        draggable="false"
        width={size}
        height={size}
        className="h-full w-full object-contain filter drop-shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-transform duration-300 group-hover:scale-110"
      />
    </div>
  );
};

// Conversion Arrow Icon with glowing gold dash
export const ConversionArrow = () => {
  return (
    <div className="flex items-center justify-center px-1">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M5 12H19M19 12L13 6M19 12L13 18"
          stroke="#f59e0b"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="filter drop-shadow-[0_0_4px_rgba(245,158,11,0.8)]"
        />
      </svg>
    </div>
  );
};
