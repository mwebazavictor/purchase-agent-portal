import React from 'react';
import { Shield, Users, Zap, Globe } from 'lucide-react';

const SocialProof = () => {
  const stats = [
    { icon: Users, value: '100+', label: 'Active Users' },
    { icon: Globe, value: '50+', label: 'Countries' },
    { icon: Zap, value: '99.9%', label: 'Uptime' },
    { icon: Shield, value: 'Enterprise', label: 'Security' },
  ];

  return (
    <div className="w-full py-12 bg-background/50">
      <div className="container mx-auto px-4">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <stat.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SocialProof; 