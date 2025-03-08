import React from 'react';
import './MeshBackground.css';

const MeshBackground: React.FC = () => {
  // Generate grid points for the mesh
  const gridSize = { x: 8, y: 6 };
  const points = [];
  
  for (let i = 0; i < gridSize.x; i++) {
    for (let j = 0; j < gridSize.y; j++) {
      points.push({
        x: (i * 100) + Math.random() * 20,
        y: (j * 100) + Math.random() * 20,
        delay: Math.random() * 4
      });
    }
  }

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <svg
        className="w-full h-full opacity-20"
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="meshGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.2" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
          </linearGradient>
          
          <radialGradient id="dotGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Mesh Lines */}
        <g className="mesh-lines">
          {points.map((point, i) => (
            points.map((target, j) => {
              if (i !== j && 
                  Math.abs(point.x - target.x) < 150 && 
                  Math.abs(point.y - target.y) < 150) {
                return (
                  <line
                    key={`line-${i}-${j}`}
                    x1={point.x}
                    y1={point.y}
                    x2={target.x}
                    y2={target.y}
                    stroke="url(#meshGradient)"
                    strokeWidth="0.5"
                    className="mesh-line"
                  />
                );
              }
              return null;
            })
          ))}
        </g>

        {/* Animated Dots */}
        <g className="mesh-points">
          {points.map((point, i) => (
            <g key={`point-${i}`} className="mesh-point" style={{ animationDelay: `${point.delay}s` }}>
              <circle
                cx={point.x}
                cy={point.y}
                r="4"
                fill="url(#dotGradient)"
              />
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default MeshBackground; 