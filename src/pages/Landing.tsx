
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Shield, Brain, Users, Rocket, ArrowRight, Zap, Leaf } from "lucide-react";
import TranslucentNavbar from "@/components/TranslucentNavbar";
import ImageCarousel from "@/components/ImageCarousel";

const Landing = () => {
  return (
    <div className="min-h-screen bg-nature-gradient bg-fixed">
      {/* Translucent Navbar */}
      <TranslucentNavbar />
      
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-10 md:py-20">
        <div className="pt-16 mb-16">
          {/* This empty div creates space for the fixed navbar */}
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-emerald-900 dark:text-emerald-400 leading-tight">
              AI-Powered Agents for Your Business
            </h1>
            <p className="text-lg md:text-xl text-emerald-800 dark:text-emerald-300 mb-8 max-w-md">
              Integrate intelligent AI agents to streamline operations, enhance customer experience, and boost productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto bg-emerald-700 hover:bg-emerald-800 text-white">
                  Get Started <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/sample-questions">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-emerald-600 text-emerald-700 hover:bg-emerald-50 dark:border-emerald-500 dark:text-emerald-400 dark:hover:bg-emerald-950/50">
                  See Demo
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 glass-card rounded-xl overflow-hidden border-2 border-emerald-600/20 shadow-xl">
            <div className="h-64 md:h-80">
              <ImageCarousel />
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-16 bg-gradient-to-r from-emerald-50/80 via-amber-50/80 to-teal-50/80 dark:from-emerald-950/80 dark:via-amber-950/80 dark:to-teal-950/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3 text-emerald-800 dark:text-emerald-300">Why Choose TAI Agent Suite?</h2>
          <div className="flex justify-center mb-12">
            <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-amber-400 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 dark:bg-emerald-900/40 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700">
              <div className="rounded-full bg-emerald-100 dark:bg-emerald-800/50 w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="text-emerald-600 dark:text-emerald-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-emerald-800 dark:text-emerald-300">Enhanced Efficiency</h3>
              <p className="text-emerald-700 dark:text-emerald-400">Automate routine tasks and workflows, saving valuable time and resources.</p>
            </div>
            
            <div className="bg-white/80 dark:bg-emerald-900/40 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-700">
              <div className="rounded-full bg-amber-100 dark:bg-amber-800/50 w-12 h-12 flex items-center justify-center mb-4">
                <Brain className="text-amber-600 dark:text-amber-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-amber-800 dark:text-amber-300">Intelligent Insights</h3>
              <p className="text-amber-700 dark:text-amber-400">Leverage advanced AI to gain valuable data insights and make informed decisions.</p>
            </div>
            
            <div className="bg-white/80 dark:bg-emerald-900/40 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-teal-200 dark:border-teal-800 hover:border-teal-300 dark:hover:border-teal-700">
              <div className="rounded-full bg-teal-100 dark:bg-teal-800/50 w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="text-teal-600 dark:text-teal-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-teal-800 dark:text-teal-300">Secure Integration</h3>
              <p className="text-teal-700 dark:text-teal-400">Enterprise-grade security with seamless integration into your existing systems.</p>
            </div>
            
            <div className="bg-white/80 dark:bg-emerald-900/40 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-emerald-200 dark:border-emerald-800 hover:border-emerald-300 dark:hover:border-emerald-700">
              <div className="rounded-full bg-emerald-100 dark:bg-emerald-800/50 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="text-emerald-600 dark:text-emerald-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-emerald-800 dark:text-emerald-300">Customer Experience</h3>
              <p className="text-emerald-700 dark:text-emerald-400">Elevate customer satisfaction with personalized AI-driven interactions.</p>
            </div>
            
            <div className="bg-white/80 dark:bg-emerald-900/40 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-amber-200 dark:border-amber-800 hover:border-amber-300 dark:hover:border-amber-700">
              <div className="rounded-full bg-amber-100 dark:bg-amber-800/50 w-12 h-12 flex items-center justify-center mb-4">
                <Rocket className="text-amber-600 dark:text-amber-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-amber-800 dark:text-amber-300">Scalable Solutions</h3>
              <p className="text-amber-700 dark:text-amber-400">From startups to enterprises, our agents scale with your business needs.</p>
            </div>
            
            <div className="bg-white/80 dark:bg-emerald-900/40 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-teal-200 dark:border-teal-800 hover:border-teal-300 dark:hover:border-teal-700">
              <div className="rounded-full bg-teal-100 dark:bg-teal-800/50 w-12 h-12 flex items-center justify-center mb-4">
                <Leaf className="text-teal-600 dark:text-teal-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-teal-800 dark:text-teal-300">Environmentally Conscious</h3>
              <p className="text-teal-700 dark:text-teal-400">Our AI solutions are designed to minimize environmental impact while maximizing efficiency.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-700 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-xl mx-auto">
            Join hundreds of businesses already using TAI Agent Suite to revolutionize their operations.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="font-semibold bg-white text-emerald-700 hover:bg-white/90">
              Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-gradient-to-r from-emerald-800/20 via-amber-800/20 to-teal-800/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-emerald-800 dark:text-emerald-400">
                TAI AGENT SUITE
              </h2>
              <p className="text-emerald-700 dark:text-emerald-500 mt-2">Empowering businesses with intelligent AI solutions</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <Link to="/login" className="text-emerald-700 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-emerald-700 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors">
                Register
              </Link>
              <Link to="/sample-questions" className="text-emerald-700 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300 transition-colors">
                Demo
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-emerald-200 dark:border-emerald-800 text-center">
            <p className="text-emerald-700 dark:text-emerald-500">© {new Date().getFullYear()} TAI Agent Suite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
