import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ChevronRight, ArrowRight, Settings, Target, Workflow } from "lucide-react";
import TranslucentNavbar from "@/components/TranslucentNavbar";

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
              Smart Agents, Big Wins
            </h1>
            <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-md">
              Your all-in-one AI squad, built to tackle business chaos with intelligent automation and insights.
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
        </div>
      </header>

      {/* Main Cards Section */}
      <section className="py-16 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <div className="rounded-full bg-gray-100 dark:bg-gray-700 w-12 h-12 flex items-center justify-center mb-6">
                <Target className="text-gray-600 dark:text-gray-300 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">What is TAI AgentsForce?</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                TAI AgentsForce (Tubayo AI) is your all-in-one AI squad, built to tackle business chaos. Part of the Tubayo Platform AI, it's a suite of clever agents that automate tasks, crunch data, and boost efficiency across finance, sales, and more.
              </p>
              <p className="text-gray-600 dark:text-gray-400 italic">
                Think of it as your digital workforce—always on, never complaining.
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <div className="rounded-full bg-gray-100 dark:bg-gray-700 w-12 h-12 flex items-center justify-center mb-6">
                <Settings className="text-gray-600 dark:text-gray-300 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">Why Use TAI AgentsForce?</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Why slog through repetitive tasks? TAI AgentsForce saves time, cuts costs, and supercharges your core functions—finance, marketing, operations, you name it. With the Mini TAI Agent Suite Dashboard, you get insights, automation, and recommendations in one shot.
              </p>
              <p className="text-gray-600 dark:text-gray-400 italic">
                It's like hiring a dream team that doesn't need coffee breaks.
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 border border-gray-200 dark:border-gray-700">
              <div className="rounded-full bg-gray-100 dark:bg-gray-700 w-12 h-12 flex items-center justify-center mb-6">
                <Workflow className="text-gray-600 dark:text-gray-300 w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">How to Work with Agents?</h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4">
                Automating with TAI agents is a breeze: pick a function (say, customer support), feed it company data—FAQs, customer lists, WhatsApp contacts—and let it rip. The Tubayo Admin Dashboard lets managers tweak agents, track KPIs, and train them smarter.
              </p>
              <p className="text-gray-600 dark:text-gray-400 italic">
                From ticket triage to sales forecasts, your processes run like clockwork.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-8 max-w-xl mx-auto text-gray-200">
            Join innovative businesses already using TAI AgentsForce to revolutionize their operations.
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
                TAI AGENTSFORCE
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Smart Agents, Big Wins</p>
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
            <p className="text-gray-700 dark:text-gray-500">© {new Date().getFullYear()} TAI AgentsForce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
