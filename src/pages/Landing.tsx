
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Sparkles, Cpu, Braces, BrainCircuit } from "lucide-react";
import { useEffect, useState } from "react";

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'}`}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <BrainCircuit className="h-7 w-7 text-indigo-500 mr-2" />
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
              TAI AGENTSFORCE
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/sample-questions" className="text-gray-300 hover:text-white transition-colors">
              Demo
            </Link>
            <Link to="/login" className="text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link to="/register">
              <Button size="sm" variant="outline" className="border-indigo-500 text-indigo-400 hover:bg-indigo-950 hover:text-indigo-300">
                Get Started
              </Button>
            </Link>
          </div>
          <div className="md:hidden">
            <Button size="icon" variant="ghost">
              <BrainCircuit className="h-5 w-5 text-indigo-400" />
            </Button>
          </div>
        </div>
      </nav>
      
      {/* Hero Section with Animated Background */}
      <div className="relative">
        {/* Background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-full h-full bg-grid-pattern opacity-20"></div>
          <div className="absolute top-1/4 -left-20 w-72 h-72 bg-indigo-600 rounded-full blur-[100px] opacity-20 animate-pulse-gentle"></div>
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-purple-600 rounded-full blur-[100px] opacity-20 animate-pulse-gentle delay-1000"></div>
        </div>
        
        {/* Main hero content */}
        <div className="container mx-auto px-4 pt-36 pb-24 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center bg-indigo-950/50 border border-indigo-800/50 rounded-full px-4 py-1.5 mb-8">
              <Sparkles className="h-4 w-4 text-indigo-400 mr-2" />
              <span className="text-sm text-indigo-300">Introducing TAI AgentsForce Suite</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="block">Intelligent Agents</span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">Powering Your Business</span>
            </h1>
            
            <p className="text-xl text-gray-400 mb-10 max-w-2xl">
              Your all-in-one AI squad, built to tackle business complexity with intelligent automation and insights that transform operations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
              <Link to="/register" className="w-full">
                <Button size="lg" className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white border-0">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/sample-questions" className="w-full">
                <Button size="lg" variant="outline" className="w-full border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-white">
                  View Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Animated scroll indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center">
          <div className="w-[30px] h-[50px] border-2 border-gray-600 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
          </div>
          <span className="text-gray-500 text-sm mt-2">Scroll to explore</span>
        </div>
      </div>
      
      {/* Features Section */}
      <section className="py-24 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/20 to-black"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                Why Choose TAI AgentsForce?
              </span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Our intelligent agents transform how businesses operate, delivering powerful automation and insights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature Card 1 */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-8 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300 group">
              <div className="rounded-full bg-indigo-900/30 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-indigo-900/50 transition-colors">
                <BrainCircuit className="text-indigo-400 h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-indigo-300 transition-colors">What is TAI AgentsForce?</h3>
              <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                TAI AgentsForce is your all-in-one AI squad, built to tackle business chaos. Part of the Tubayo Platform AI, it's a suite of clever agents that automate tasks, crunch data, and boost efficiency across finance, sales, and more.
              </p>
              <p className="text-indigo-400 italic text-sm">
                Think of it as your digital workforce—always on, never complaining.
              </p>
            </div>
            
            {/* Feature Card 2 */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-8 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300 group">
              <div className="rounded-full bg-indigo-900/30 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-indigo-900/50 transition-colors">
                <Cpu className="text-indigo-400 h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-indigo-300 transition-colors">Why Use TAI AgentsForce?</h3>
              <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                Why slog through repetitive tasks? TAI AgentsForce saves time, cuts costs, and supercharges your core functions—finance, marketing, operations, you name it. With the Mini TAI Agent Suite Dashboard, you get insights, automation, and recommendations in one shot.
              </p>
              <p className="text-indigo-400 italic text-sm">
                It's like hiring a dream team that doesn't need coffee breaks.
              </p>
            </div>
            
            {/* Feature Card 3 */}
            <div className="bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-8 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] transition-all duration-300 group">
              <div className="rounded-full bg-indigo-900/30 w-14 h-14 flex items-center justify-center mb-6 group-hover:bg-indigo-900/50 transition-colors">
                <Braces className="text-indigo-400 h-7 w-7" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-indigo-300 transition-colors">How to Work with Agents?</h3>
              <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                Automating with TAI agents is a breeze: pick a function (say, customer support), feed it company data—FAQs, customer lists, WhatsApp contacts—and let it rip. The Tubayo Admin Dashboard lets managers tweak agents, track KPIs, and train them smarter.
              </p>
              <p className="text-indigo-400 italic text-sm">
                From ticket triage to sales forecasts, your processes run like clockwork.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-purple-900/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-3xl mx-auto bg-gradient-to-br from-gray-900 to-gray-950 border border-gray-800 rounded-xl p-12 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] transition-all duration-300">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl mb-8 text-gray-400">
              Join innovative businesses already using TAI AgentsForce to revolutionize their operations.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-6 text-lg h-auto">
                Get Started Today <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-6 md:mb-0">
              <BrainCircuit className="h-6 w-6 text-indigo-500 mr-2" />
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
                TAI AGENTSFORCE
              </h2>
            </div>
            
            <div className="flex gap-8">
              <Link to="/login" className="text-gray-400 hover:text-indigo-400 transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-gray-400 hover:text-indigo-400 transition-colors">
                Register
              </Link>
              <Link to="/sample-questions" className="text-gray-400 hover:text-indigo-400 transition-colors">
                Demo
              </Link>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-600">© {new Date().getFullYear()} TAI AgentsForce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
