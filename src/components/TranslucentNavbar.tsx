
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
            <Button variant="outline" size="sm" className="border-indigo-500 text-indigo-400 hover:bg-indigo-950 hover:text-indigo-300">
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
  );
};

export default TranslucentNavbar;
