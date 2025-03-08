import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Shield, Brain, Users, Rocket, ArrowRight, Zap } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";
import TranslucentNavbar from "@/components/TranslucentNavbar";
import SocialProof from "@/components/SocialProof";
import HowItWorks from "@/components/HowItWorks";
import MeshBackground from "@/components/MeshBackground";
import { useEffect } from "react";

const Landing = () => {
  // Add parallax effect on mouse move
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const meshPoints = document.querySelector('.mesh-points');
      const meshLines = document.querySelector('.mesh-lines');
      
      if (meshPoints && meshLines) {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;
        
        meshPoints.setAttribute('style', `transform: translate(${moveX}px, ${moveY}px)`);
        meshLines.setAttribute('style', `transform: translate(${moveX * 0.5}px, ${moveY * 0.5}px)`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-background relative">
      <MeshBackground />
      
      {/* Translucent Navbar */}
      <TranslucentNavbar />
      
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-10 md:py-20">
        <div className="pt-16 mb-16">
          {/* This empty div creates space for the fixed navbar */}
        </div>
        
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tech-gradient-text leading-tight">
              AI-Powered Agents for Your Business
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-md">
              Integrate intelligent AI agents to streamline operations, enhance customer experience, and boost productivity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/sample-questions">
                <Button size="lg" variant="outline" className="w-full sm:w-auto">
                  See Demo
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 glass-card rounded-xl overflow-hidden">
            <div className="bg-primary/5 p-6 md:p-10 h-64 md:h-80">
              <AnimatedLogo />
            </div>
          </div>
        </div>
      </header>

      {/* Social Proof Section */}
      <SocialProof />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Features */}
      <section className="py-16 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 tech-gradient-text">Why Choose TAI Agent Suite?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="glass-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Enhanced Efficiency</h3>
              <p className="text-muted-foreground">Automate routine tasks and workflows, saving valuable time and resources.</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Brain className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Intelligent Insights</h3>
              <p className="text-muted-foreground">Leverage advanced AI to gain valuable data insights and make informed decisions.</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Secure Integration</h3>
              <p className="text-muted-foreground">Enterprise-grade security with seamless integration into your existing systems.</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Customer Experience</h3>
              <p className="text-muted-foreground">Elevate customer satisfaction with personalized AI-driven interactions.</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Rocket className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Scalable Solutions</h3>
              <p className="text-muted-foreground">From startups to enterprises, our agents scale with your business needs.</p>
            </div>
            
            <div className="glass-card p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quick Deployment</h3>
              <p className="text-muted-foreground">Get up and running in minutes with our intuitive implementation process.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 tech-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-xl mx-auto">
            Join hundreds of businesses already using TAI Agent Suite to revolutionize their operations.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="font-semibold">
              Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                TAI AGENT SUITE
              </h2>
              <p className="text-muted-foreground mt-2">Empowering businesses with intelligent AI solutions</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <Link to="/login" className="text-foreground hover:text-primary transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-foreground hover:text-primary transition-colors">
                Register
              </Link>
              <Link to="/sample-questions" className="text-foreground hover:text-primary transition-colors">
                Demo
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-border text-center">
            <p className="text-muted-foreground">© {new Date().getFullYear()} TAI Agent Suite. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
