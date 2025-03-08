import React from 'react';
import './AnimatedLogo.css';

const AnimatedLogo: React.FC = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg className="w-full h-full" viewBox="0 0 800 600" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="galaxyGradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#ff00cc" stopOpacity={1}>
              <animate attributeName="stopColor" values="#ff00cc;#00ffcc;#ffcc00;#ff00cc" dur="10s" repeatCount="indefinite"/>
            </stop>
            <stop offset="50%" stopColor="#6600ff" stopOpacity={1}>
              <animate attributeName="stopColor" values="#6600ff;#ff0066;#00ccff;#6600ff" dur="12s" repeatCount="indefinite"/>
            </stop>
            <stop offset="100%" stopColor="#000000" stopOpacity={1}/>
          </radialGradient>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="8" result="blur"/>
            <feMerge>
              <feMergeNode in="blur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <filter id="shadow">
            <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#ff00cc" floodOpacity="0.8"/>
          </filter>
        </defs>

        {/* Background */}
        <rect width="100%" height="100%" fill="url(#galaxyGradient)"/>

        {/* Static Rectangle Above Text */}
        <rect x="300" y="240" width="200" height="20" fill="#ffcc00" opacity="0.7" rx="10"/>

        {/* Orbiting Particles */}
        <circle cx="400" cy="300" r="20" fill="#ffffff" opacity="0.9" filter="url(#neonGlow)" className="orbit-fast"/>

        {/* Dynamic Decorative Elements */}
        <circle cx="150" cy="150" r="40" fill="none" stroke="#ff00cc" strokeWidth="6" opacity="0.6" className="ripple"/>
        <circle cx="650" cy="450" r="30" fill="none" stroke="#00ffcc" strokeWidth="5" opacity="0.7" className="ripple"/>
        <path d="M200 100 Q400 50 600 100" fill="none" stroke="#ffcc00" strokeWidth="4" opacity="0.5" className="wave"/>
        <polygon points="300,500 350,550 400,500 450,550 500,500" fill="#6600ff" opacity="0.4" className="float"/>

        {/* Explosive Particle Effects */}
        <circle cx="300" cy="200" r="10" fill="#ff0066" opacity="0.8" className="explode"/>
        <circle cx="500" cy="400" r="15" fill="#00ccff" opacity="0.8" className="explode"/>

        {/* Text Group with Background */}
        <g>
          <rect x="250" y="280" width="300" height="120" fill="#000000" opacity="0.3" rx="15"/>
          <text x="400" y="320" fontFamily="Arial, sans-serif" fontSize="80" fontWeight="bold" fill="#ffffff" textAnchor="middle" filter="url(#neonGlow)" className="pulse-text">
            <tspan dy="-20">TAI AGENT</tspan>
            <tspan x="400" dy="70">SUITE</tspan>
          </text>
        </g>
      </svg>
    </div>
  );
};

export default AnimatedLogo;
