
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, Shield, Brain, Users, Rocket, ArrowRight, Zap } from "lucide-react";
import AnimatedLogo from "@/components/AnimatedLogo";
import TranslucentNavbar from "@/components/TranslucentNavbar";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
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
                <Button size="lg" className="w-full sm:w-auto bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                  Get Started <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/sample-questions">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-accent text-accent hover:bg-accent/10">
                  See Demo
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 glass-card rounded-xl overflow-hidden border-2 border-primary/20">
            <div className="bg-gradient-to-br from-primary/5 via-accent/5 to-yellow-400/5 p-6 md:p-10 h-64 md:h-80">
              <AnimatedLogo />
            </div>
          </div>
        </div>
      </header>

      {/* Features */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-accent/10 to-yellow-400/10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 tech-gradient-text">Why Choose TAI Agent Suite?</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white/80 dark:bg-secondary/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-primary/10 hover:border-primary/30">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 tech-gradient-text">Enhanced Efficiency</h3>
              <p className="text-muted-foreground">Automate routine tasks and workflows, saving valuable time and resources.</p>
            </div>
            
            <div className="bg-white/80 dark:bg-secondary/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-accent/10 hover:border-accent/30">
              <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center mb-4">
                <Brain className="text-accent w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 tech-gradient-text">Intelligent Insights</h3>
              <p className="text-muted-foreground">Leverage advanced AI to gain valuable data insights and make informed decisions.</p>
            </div>
            
            <div className="bg-white/80 dark:bg-secondary/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-yellow-400/10 hover:border-yellow-400/30">
              <div className="rounded-full bg-yellow-400/10 w-12 h-12 flex items-center justify-center mb-4">
                <Shield className="text-yellow-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 tech-gradient-text">Secure Integration</h3>
              <p className="text-muted-foreground">Enterprise-grade security with seamless integration into your existing systems.</p>
            </div>
            
            <div className="bg-white/80 dark:bg-secondary/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-primary/10 hover:border-primary/30">
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-4">
                <Users className="text-primary w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 tech-gradient-text">Customer Experience</h3>
              <p className="text-muted-foreground">Elevate customer satisfaction with personalized AI-driven interactions.</p>
            </div>
            
            <div className="bg-white/80 dark:bg-secondary/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-accent/10 hover:border-accent/30">
              <div className="rounded-full bg-accent/10 w-12 h-12 flex items-center justify-center mb-4">
                <Rocket className="text-accent w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 tech-gradient-text">Scalable Solutions</h3>
              <p className="text-muted-foreground">From startups to enterprises, our agents scale with your business needs.</p>
            </div>
            
            <div className="bg-white/80 dark:bg-secondary/50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-yellow-400/10 hover:border-yellow-400/30">
              <div className="rounded-full bg-yellow-400/10 w-12 h-12 flex items-center justify-center mb-4">
                <Zap className="text-yellow-400 w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold mb-2 tech-gradient-text">Quick Deployment</h3>
              <p className="text-muted-foreground">Get up and running in minutes with our intuitive implementation process.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary via-accent to-yellow-400 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-xl mx-auto">
            Join hundreds of businesses already using TAI Agent Suite to revolutionize their operations.
          </p>
          <Link to="/register">
            <Button size="lg" variant="secondary" className="font-semibold bg-white text-primary hover:bg-white/90">
              Get Started Today <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 bg-gradient-to-r from-primary/20 via-accent/20 to-yellow-400/20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-accent to-yellow-400 bg-clip-text text-transparent">
                TAI AGENT SUITE
              </h2>
              <p className="text-muted-foreground mt-2">Empowering businesses with intelligent AI solutions</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
              <Link to="/login" className="text-foreground hover:text-primary transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-foreground hover:text-accent transition-colors">
                Register
              </Link>
              <Link to="/sample-questions" className="text-foreground hover:text-yellow-400 transition-colors">
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
