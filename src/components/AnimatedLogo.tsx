
import React from 'react';

const AnimatedLogo: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
        {/* Gradient Definitions */}
        <defs>
          <radialGradient id="swirlGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#6E59A5" stopOpacity="1">
              <animate attributeName="stop-color" values="#6E59A5;#7E69AB;#9b87f5;#6E59A5" dur="8s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" stopColor="#1A1F2C" stopOpacity="1">
              <animate attributeName="stop-color" values="#1A1F2C;#6E59A5;#D6BCFA;#1A1F2C" dur="8s" repeatCount="indefinite"/>
            </stop>
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Swirling Background */}
        <rect width="100%" height="100%" fill="url(#swirlGradient)" className="animate-[swirl_10s_infinite_linear]"/>

        {/* Orbiting Shapes */}
        <circle cx="300" cy="200" r="50" fill="#ffffff" opacity="0.8" filter="url(#glow)" className="animate-[orbit_6s_infinite_linear]"/>
        <rect x="250" y="150" width="100" height="100" fill="hsl(var(--primary))" opacity="0.6" rx="10" transform="rotate(45 300 200)" className="animate-[orbitReverse_4s_infinite_linear]"/>
        <path d="M280 180 L320 180 L300 150 Z" fill="hsl(var(--primary-foreground))" opacity="0.7" className="animate-[bounce_2s_infinite]"/>

        {/* Additional Decorative Elements */}
        <circle cx="100" cy="100" r="30" fill="none" stroke="#ffffff" strokeWidth="4" opacity="0.5" className="animate-[ripple_5s_infinite]"/>
        <circle cx="500" cy="300" r="20" fill="none" stroke="hsl(var(--primary))" strokeWidth="3" opacity="0.7" className="animate-[ripple_4s_infinite]"/>
      </svg>
    </div>
  );
};

export default AnimatedLogo;
