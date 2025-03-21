import React from "react";
import { motion } from "framer-motion";
import TranslucentNavbar from "@/components/TranslucentNavbar";
import { Link } from "react-router-dom";
import { BrainCircuit, Sparkles } from "lucide-react";
import GlowingBlob from "@/components/GlowingBlob";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-black/80 text-white flex flex-col items-center justify-center px-6 md:px-12 lg:px-20">
      <script 
        src="https://ai-customer-support-productio.up.railway.app/api/chat-script?companyId=67c55bd3cd3a1f19e7341979"
      ></script>
      {/* Header */}
      <motion.div className="pb-20">
        <TranslucentNavbar />
      </motion.div>
      <GlowingBlob />
      <header className="w-full max-w-4xl text-center py-8 pb-2">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center bg-red-950/50 border border-red-800/50 rounded-full px-4 py-1.5 mb-8">
            <Sparkles className="h-4 w-4 text-red-400 mr-2" />
            <span className="text-sm text-red-300">Introducing TAI Agents Force Suite</span>
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block">Tai Agent Force</span>
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-red-400 to-orange-400">Powering Your Business</span>
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl">
            Your all-in-one AI squad, built to tackle business complexity with intelligent automation and insights that transform operations.
          </p>
        </div>
      </header>

      {/* Features Section */}
      <section className="w-full max-w-5xl mt-12 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="relative p-8 rounded-2xl shadow-lg bg-white/25 backdrop-blur-md group transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
          >
            <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-gray-500 transition-all duration-500"></div>
            <h3 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">
              {feature.title}
            </h3>
            <p className="text-gray-400 mt-4 leading-relaxed group-hover:text-gray-300 transition-colors">
              {feature.description}
            </p>
            <p className="text-gray-400 italic text-sm mt-4">{feature.footer}</p>
          </motion.div>
        ))}
      </section>

      {/* Agents Section */}
      <section className="w-full max-w-5xl mt-12 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Meet Your TAI Agents</h2>
        <div className="grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent, index) => (
            <motion.div
              key={index}
              className="relative p-8 rounded-2xl shadow-lg bg-white/25 backdrop-blur-md group transition-transform transform hover:scale-105"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-gray-500 transition-all duration-500"></div>
              <h3 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">
                {agent.title}
              </h3>
              <p className="text-gray-400 mt-4 leading-relaxed group-hover:text-gray-300 transition-colors">
                {agent.description}
              </p>
              <p className="text-gray-400 italic text-sm mt-4">{agent.footer}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Partners */}
      <section className="w-full max-w-5xl mt-12 text-center">
        <h2 className="text-3xl font-bold text-white">Who are we working with?</h2>
        <p className="text-gray-400 mt-4">Some of our Partners.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="p-2 bg-white/80 rounded-xl shadow-md max-w-sm flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <img src={partner.image} className="w-[100px] justify-center" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <Link to="/register">
        <motion.button
          className="mt-12 px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg text-lg font-semibold transition duration-300 shadow-lg"
          whileHover={{ scale: 1.05 }}
        >
          Get Started
        </motion.button>
      </Link>

      {/* Footer */}
      <footer className="py-12 w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex gap-8">
              <Link to="/login" className="text-gray-400 hover:text-gray-300 transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-gray-400 hover:text-gray-300 transition-colors">
                Register
              </Link>
              <Link to="/sample-questions" className="text-gray-400 hover:text-gray-300 transition-colors">
                Demo
              </Link>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-700 text-center">
            <p className="text-gray-500">
              © {new Date().getFullYear()} TAI AgentsForce. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    title: "What is TAI AgentsForce?",
    description: "TAI AgentsForce (Tubayo AI) is your all-in-one AI squad...",
    footer: "Think of it as your digital workforce—always on, never complaining.",
  },
  {
    title: "Why Use TAI AgentsForce?",
    description: "Why slog through repetitive tasks? TAI AgentsForce saves time...",
    footer: "It’s like hiring a dream team that doesn’t need coffee breaks.",
  },
  {
    title: "How to Work with AI Agents?",
    description: "Automating with TAI agents is a breeze: pick a function...",
    footer: "From ticket triage to sales forecasts, your processes run like clockwork.",
  },
];

const agents = [
  {
    title: "ChatEase Customer Support Agent",
    description:
      "Meet Jamie, your 24/7 support superstar. Answers FAQs, troubleshoots issues, and escalates complex queries to human agents—all while keeping your customers happy.",
    footer: "Reduces wait times and boosts satisfaction with instant help.",
  },
  {
    title: "Sales & Marketing Agent",
    description:
      "Say hello to your revenue driver. Qualifies leads, recommends products, and crafts personalized campaigns to turn visitors into buyers, all in real-time.",
    footer: "Maximizes conversions without breaking a sweat.",
  },
  {
    title: "Create Your Own Agent",
    description:
      "With TAI’s no-code platform, build a custom agent tailored to your business. Train it with your data, set its goals, and watch it optimize your workflows.",
    footer: "Your business, your rules—AI made simple.",
  },
];

const partners = [
  { image: "/partners/partner_1.avif" },
  { image: "/partners/partner_2.avif" },
  { image: "/partners/partner_3.avif" },
  { image: "/partners/partner_4.avif" },
  { image: "/partners/partner_5.avif" },
  { image: "/partners/partner_6.avif" },
  { image: "/partners/partner_7.avif" },
];

export default LandingPage;