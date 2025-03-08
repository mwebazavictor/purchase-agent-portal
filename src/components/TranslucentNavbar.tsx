
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const TranslucentNavbar = () => {
  return (
    <nav className="fixed top-4 left-0 right-0 z-50 mx-auto max-w-5xl px-4">
      <div className="backdrop-blur-md bg-gradient-to-r from-primary/20 via-accent/20 to-yellow-400/20 border border-white/30 dark:border-white/10 shadow-lg rounded-full py-3 px-6 flex justify-between items-center">
        <h2 className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary via-accent to-yellow-400 bg-clip-text text-transparent">
          TAI AGENT SUITE
        </h2>
        <div className="space-x-2">
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-primary hover:bg-primary/10 hover:text-accent">Log in</Button>
          </Link>
          <Link to="/register">
            <Button size="sm" className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default TranslucentNavbar;
