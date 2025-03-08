import React from 'react';
import { ShoppingBag, Brain, Code, Zap } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: ShoppingBag,
      title: 'Choose Your Agent',
      description: 'Browse our marketplace and select the AI agent that best fits your business needs.',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Brain,
      title: 'Train Your Agent',
      description: 'Upload your documents and add sample questions to train your agent with your specific knowledge.',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Code,
      title: 'Implement',
      description: 'Follow our simple implementation guide to integrate your agent into your website or application.',
      color: 'from-green-500 to-green-600',
    },
    {
      icon: Zap,
      title: 'Go Live',
      description: 'Launch your AI agent and watch as it enhances your customer experience and streamlines operations.',
      color: 'from-orange-500 to-orange-600',
    },
  ];

  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tech-gradient-text">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get started with TAI Agent Suite in four simple steps. Our platform makes it easy to integrate AI into your business.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/20 to-transparent" />
              )}
              
              {/* Step Card */}
              <div className="glass-card p-6 rounded-xl h-full">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${step.color} mb-4`}>
                  <step.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 