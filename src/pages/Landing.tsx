
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, BrainCircuit } from "lucide-react";
import { useEffect, useState } from "react";
import TranslucentNavbar from "@/components/TranslucentNavbar";

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-[#1A1F2C] overflow-x-hidden">
      <TranslucentNavbar />
      
      {/* Hero Section with Cards at the Top */}
      <div className="relative pt-32 pb-20">
        <div className="container mx-auto px-4">
          {/* Three Cards Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* Card 1 */}
            <div className="bg-white border-2 border-blue-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <BrainCircuit className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1A1F2C]">Customer Support</h3>
              <p className="text-[#8E9196]">
                24/7 AI-powered support to handle customer inquiries and resolve issues efficiently.
              </p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white border-2 border-blue-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <BrainCircuit className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1A1F2C]">Data Analysis</h3>
              <p className="text-[#8E9196]">
                Process and analyze large datasets to extract valuable insights for your business.
              </p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white border-2 border-blue-100 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                <BrainCircuit className="text-blue-600 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-[#1A1F2C]">Content Creation</h3>
              <p className="text-[#8E9196]">
                Generate high-quality content for marketing, social media, and more with AI assistance.
              </p>
            </div>
          </div>
          
          {/* Main Heading */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="block text-[#1A1F2C]">Intelligent Agents</span>
              <span className="text-blue-600">Powering Your Business</span>
            </h1>
            <p className="text-lg text-[#8E9196] mb-8">
              Your all-in-one AI squad, built to tackle business complexity with intelligent automation.
            </p>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <Link to="/register" className="w-full">
              <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Get Started <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link to="/sample-questions" className="w-full">
              <Button size="lg" variant="outline" className="w-full border-blue-600 text-blue-600 hover:bg-blue-50">
                View Demo
              </Button>
            </Link>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-[#1A1F2C]">
              Why Choose TAI AgentsForce?
            </h2>
            <p className="text-[#8E9196] max-w-2xl mx-auto">
              Our intelligent agents transform how businesses operate, delivering powerful automation and insights.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Feature 1 */}
            <div className="border-l-2 border-blue-200 pl-6">
              <h3 className="text-xl font-semibold mb-3 text-[#1A1F2C]">Streamlined Workflows</h3>
              <p className="text-[#8E9196]">
                Automate repetitive tasks and workflows to free up your team's time for more strategic work.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="border-l-2 border-blue-200 pl-6">
              <h3 className="text-xl font-semibold mb-3 text-[#1A1F2C]">Enhanced Decision Making</h3>
              <p className="text-[#8E9196]">
                Leverage data-driven insights to make better decisions faster and with more confidence.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="border-l-2 border-blue-200 pl-6">
              <h3 className="text-xl font-semibold mb-3 text-[#1A1F2C]">24/7 Availability</h3>
              <p className="text-[#8E9196]">
                AI agents never sleep, ensuring round-the-clock service for your customers and operations.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="border-l-2 border-blue-200 pl-6">
              <h3 className="text-xl font-semibold mb-3 text-[#1A1F2C]">Scalable Solutions</h3>
              <p className="text-[#8E9196]">
                Easily scale your AI workforce up or down based on your business needs without hiring challenges.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-[#1A1F2C]">
              Ready to Transform Your Business?
            </h2>
            <p className="text-lg mb-8 text-[#8E9196]">
              Join innovative businesses already using TAI AgentsForce to revolutionize their operations.
            </p>
            <Link to="/register">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg h-auto">
                Get Started Today <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-12 border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center mb-6 md:mb-0">
              <BrainCircuit className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-bold text-[#1A1F2C]">
                TAI AGENTSFORCE
              </h2>
            </div>
            
            <div className="flex gap-8">
              <Link to="/login" className="text-[#8E9196] hover:text-blue-600 transition-colors">
                Login
              </Link>
              <Link to="/register" className="text-[#8E9196] hover:text-blue-600 transition-colors">
                Register
              </Link>
              <Link to="/sample-questions" className="text-[#8E9196] hover:text-blue-600 transition-colors">
                Demo
              </Link>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-100 text-center">
            <p className="text-[#8E9196]">© {new Date().getFullYear()} TAI AgentsForce. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
