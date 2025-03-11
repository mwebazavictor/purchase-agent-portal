import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Leaf } from "lucide-react";

const TranslucentNavbar = () => {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-5xl px-4">
      <div className="backdrop-blur-md bg-gradient-to-r from-sky-200/40 via-blue-100/30 to-indigo-200/40 border border-white/40 dark:border-white/10 shadow-lg rounded-full py-3 px-6 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Leaf className="text-sky-500 dark:text-sky-300 h-5 w-5" />
          <h2 className="text-lg md:text-xl font-bold text-sky-600 dark:text-sky-200">
            TAI AGENT SUITE
          </h2>
        </div>
        <div className="space-x-2">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-sky-500 dark:text-sky-300 hover:bg-sky-50/50 dark:hover:bg-sky-800/50 hover:text-sky-600 dark:hover:text-sky-200">Log in</Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="bg-sky-500 hover:bg-sky-600 text-white">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TranslucentNavbar;
