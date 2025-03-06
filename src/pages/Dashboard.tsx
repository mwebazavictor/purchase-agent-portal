
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { purchasedAgentApi } from "@/lib/api";
import { PurchasedAgent } from "@/lib/types";
import { Activity, ShoppingBag, BookOpen, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const [purchasedAgents, setPurchasedAgents] = useState<PurchasedAgent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.company_id) {
        try {
          const response = await purchasedAgentApi.getPurchasedAgents(user.company_id);
          const agents = Array.isArray(response) ? response : 
                        (response.purchasedAgents && Array.isArray(response.purchasedAgents)) ? 
                        response.purchasedAgents : [];
          
          setPurchasedAgents(agents);
        } catch (error) {
          console.error("Error fetching purchased agents:", error);
          setPurchasedAgents([]);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
        <Button asChild>
          <Link to="/agents?tab=marketplace">
            <ShoppingBag className="mr-2" size={16} />
            Purchase Agents
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-2 p-2 rounded-full bg-primary/10">
                <ShoppingBag size={16} className="text-primary" />
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">{purchasedAgents.length}</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-2 p-2 rounded-full bg-primary/10">
                <Activity size={16} className="text-primary" />
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">0</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Getting Started</CardTitle>
            <CardDescription>How to use the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/20">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <BookOpen size={16} className="text-primary" />
                  Step 1: Purchase an Agent
                </h3>
                <p className="text-sm text-muted-foreground">
                  Browse and purchase an AI agent that fits your business needs.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg bg-muted/20">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <BookOpen size={16} className="text-primary" />
                  Step 2: Train Your Agent
                </h3>
                <p className="text-sm text-muted-foreground">
                  Upload relevant documents and add sample questions to train your agent.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg bg-muted/20">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <BookOpen size={16} className="text-primary" />
                  Step 3: Implement
                </h3>
                <p className="text-sm text-muted-foreground">
                  Follow the implementation guide to integrate your agent onto your website.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Frequently Asked Questions</CardTitle>
            <CardDescription>Common questions about the platform</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="p-4 border rounded-lg bg-muted/20">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <HelpCircle size={16} className="text-primary" />
                  What are AI Agents?
                </h3>
                <p className="text-sm text-muted-foreground">
                  AI Agents are intelligent chatbots that can be trained to answer questions specific to your business.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg bg-muted/20">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <HelpCircle size={16} className="text-primary" />
                  How do I train my agent?
                </h3>
                <p className="text-sm text-muted-foreground">
                  You can train your agent by adding sample questions and uploading relevant documents in the Training section.
                </p>
              </div>
              
              <div className="p-4 border rounded-lg bg-muted/20">
                <h3 className="font-medium flex items-center gap-2 mb-2">
                  <HelpCircle size={16} className="text-primary" />
                  How do I implement the agent on my website?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Visit the Implementation page for step-by-step instructions on adding the agent to your website.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
