import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Shield, Brain, Users, Rocket, ArrowRight, Zap, Leaf } from "lucide-react";
import TranslucentNavbar from "@/components/TranslucentNavbar";
import ImageCarousel from "@/components/ImageCarousel";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white bg-fixed dark:from-gray-950 dark:to-black">
      {/* Translucent Navbar */}
      <TranslucentNavbar />
      
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-10 md:py-20">
        <div className="pt-16 mb-16">
          {/* This empty div creates space for the fixed navbar */}
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100 leading-tight">
              AI-Powered Agents for Your Business
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-md">
              Integrate intelligent AI agents to streamline operations, enhance customer experience, and boost productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto bg-gray-900 hover:bg-gray-800 text-white">
                  Get Started <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/sample-questions">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-gray-600 text-gray-700 hover:bg-gray-50 dark:border-gray-400 dark:text-gray-300 dark:hover:bg-gray-900">
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
      <section className="py-16 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-3 text-gray-800 dark:text-gray-200">Why Choose TAI Agent Suite?</h2>
          <div className="flex justify-center mb-12">
            <div className="h-1 w-24 bg-gradient-to-r from-gray-400 to-gray-600 rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 dark:bg-gray-800/40 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
              <div className="rounded-full bg-gray-100 dark:bg-gray-700 w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="text-gray-600 dark:text-gray-300 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Enhanced Efficiency</h3>
              <p className="text-gray-700 dark:text-gray-300">Automate routine tasks and workflows, saving valuable time and resources.</p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/40 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
              <div className="rounded-full bg-gray-100 dark:bg-gray-700 w-12 h-12 flex items-center justify-center mb-4">
                <Brain className="text-gray-600 dark:text-gray-300 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Intelligent Insights</h3>
              <p className="text-gray-700 dark:text-gray-300">Leverage advanced AI to gain valuable data insights and make informed decisions.</p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/40 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
              <div className="rounded-full bg-gray-100 dark:bg-gray-700 w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="text-gray-600 dark:text-gray-300 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Secure Integration</h3>
              <p className="text-gray-700 dark:text-gray-300">Enterprise-grade security with seamless integration into your existing systems.</p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/40 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
              <div className="rounded-full bg-gray-100 dark:bg-gray-700 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="text-gray-600 dark:text-gray-300 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Customer Experience</h3>
              <p className="text-gray-700 dark:text-gray-300">Elevate customer satisfaction with personalized AI-driven interactions.</p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/40 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
              <div className="rounded-full bg-gray-100 dark:bg-gray-700 w-12 h-12 flex items-center justify-center mb-4">
                <Rocket className="text-gray-600 dark:text-gray-300 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Scalable Solutions</h3>
              <p className="text-gray-700 dark:text-gray-300">From startups to enterprises, our agents scale with your business needs.</p>
            </div>
            
            <div className="bg-white/80 dark:bg-gray-800/40 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600">
              <div className="rounded-full bg-gray-100 dark:bg-gray-700 w-12 h-12 flex items-center justify-center mb-4">
                <Leaf className="text-gray-600 dark:text-gray-300 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">Environmentally Conscious</h3>
              <p className="text-gray-700 dark:text-gray-300">Our AI solutions are designed to minimize environmental impact while maximizing efficiency.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-xl mx-auto text-gray-200">
            Join hundreds of businesses already using TAI Agent Suite to revolutionize their operations.
          </p>
          <Button size="lg" variant="secondary" className="font-semibold bg-white text-gray-900 hover:bg-gray-100">
            Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-gray-100/20 dark:bg-gray-800/20 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                TAI AGENT SUITE
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Empowering businesses with intelligent AI solutions</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <Link to="/login" className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                Register
              </Link>
              <Link to="/sample-questions" className="text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 transition-colors">
                Demo
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-700 dark:text-gray-500">© {new Date().getFullYear()} TAI Agent Suite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
