
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BrainCircuit } from "lucide-react";
import { useState, useEffect } from "react";

const TranslucentNavbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <BrainCircuit className="h-7 w-7 text-emerald-600 mr-2" />
          <span className="text-xl font-bold text-[#1A1F2C]">
            TAI AGENTSFORCE
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/sample-questions" className="text-[#8E9196] hover:text-emerald-600 transition-colors">
            Demo
          </Link>
          <Link to="/login" className="text-[#8E9196] hover:text-emerald-600 transition-colors">
            Login
          </Link>
          <Link to="/register">
            <Button variant="outline" size="sm" className="border-emerald-600 text-emerald-600 hover:bg-emerald-50">
              Get Started
            </Button>
          </Link>
        </div>
        <div className="md:hidden">
          <Button size="icon" variant="ghost">
            <BrainCircuit className="h-5 w-5 text-emerald-600" />
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default TranslucentNavbar;
