import React from "react";
import { motion } from "framer-motion";
import TranslucentNavbar from "@/components/TranslucentNavbar";
import { Link } from "react-router-dom";
import { BrainCircuit } from "lucide-react";
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
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide text-white">
          Introducing TAI Agent Force
        </h1>
        <p className="text-lg md:text-xl mt-4 text-gray-300">
          The next evolution in intelligent automation.
        </p>
      </header>

      {/* Features Section */}
      <section className="w-full max-w-5xl mt-12 grid gap-10 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-center">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="relative p-8 rounded-2xl shadow-lg bg-white/25 backdrop-blur-md sgroup transition-transform transform hover:scale-105"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
          >
            {/* Border Glow */}
            <div className="absolute inset-0 border-2 border-transparent rounded-2xl group-hover:border-gray-500 transition-all duration-500"></div>


            {/* Title */}
            <h3 className="text-2xl font-bold text-white group-hover:text-gray-300 transition-colors">
              {feature.title}
            </h3>

            {/* Description */}
            <p className="text-gray-400 mt-4 leading-relaxed group-hover:text-gray-300 transition-colors">
              {feature.description}
            </p>

            {/* Footer */}
            <p className="text-gray-400 italic text-sm mt-4">
              {feature.footer}
            </p>
          </motion.div>
        ))}
      </section>

      {/* Testimonials */}
      <section className="w-full max-w-5xl mt-12 text-center">
        <h2 className="text-3xl font-bold text-white">Who are we working with?</h2>
        <p className="text-gray-400 mt-4">Some of our Partners.</p>
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {partners.map((partner, index) => (
            <motion.div
              key={index}
              className="p-2 bg-white/10 rounded-xl shadow-md max-w-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
            >
              <img
              src={partner.image} className="w-[100px] justify-center"/>
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

const partners = [
  {
    image: "/partners/partner_1.avif"
  },
  {
    image: "/partners/partner_2.avif" 
  },
  {
    image: "/partners/partner_3.avif"
  },
  {
    image: "/partners/partner_4.avif"
  },
  {
    image: "/partners/partner_5.avif"
  },
  {
    image: "/partners/partner_6.avif"
  },
  {
    image: "/partners/partner_7.avif"
  },
];

export default LandingPage;
