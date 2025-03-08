
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const TranslucentNavbar = () => {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-5xl px-4">
      <div className="backdrop-blur-md bg-gradient-to-r from-emerald-600/30 via-amber-500/20 to-teal-500/30 border border-white/30 dark:border-white/10 shadow-lg rounded-full py-3 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Leaf className="text-emerald-700 dark:text-emerald-400 h-5 w-5" />
          <h2 className="text-lg md:text-xl font-bold text-emerald-800 dark:text-emerald-300">
            TAI AGENT SUITE
          </h2>
        </div>
        <div className="space-x-2">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50/50 dark:hover:bg-emerald-900/50 hover:text-emerald-800 dark:hover:text-emerald-200">Log in</Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="bg-emerald-700 hover:bg-emerald-800 text-white">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TranslucentNavbar;
