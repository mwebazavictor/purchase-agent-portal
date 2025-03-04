
import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { purchasedAgentApi } from "@/lib/api";
import { PurchasedAgent } from "@/lib/types";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Activity, Users, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

const Dashboard = () => {
  const { user } = useAuth();
  const [purchasedAgents, setPurchasedAgents] = useState<PurchasedAgent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (user?.company_id) {
        try {
          const agents = await purchasedAgentApi.getPurchasedAgents(user.company_id);
          setPurchasedAgents(agents);
        } catch (error) {
          console.error("Error fetching purchased agents:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  // Prepare chart data
  const currentDate = new Date();
  const chartData = purchasedAgents.map(agent => {
    const expiryDate = new Date(agent.expiresAt);
    const daysLeft = Math.max(0, Math.ceil((expiryDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24)));
    
    return {
      name: agent.agent?.name || `Agent ${agent.agent_id.slice(0, 5)}...`,
      daysLeft,
      plan: agent.plan,
    };
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {user?.name}</p>
        </div>
        <Button>
          <ShoppingBag className="mr-2" size={16} />
          Purchase Agents
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-2 p-2 rounded-full bg-primary/10">
                <Users size={16} className="text-primary" />
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">5</div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Agent Usage</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <div className="mr-2 p-2 rounded-full bg-primary/10">
                <Activity size={16} className="text-primary" />
              </div>
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                <div className="text-2xl font-bold">247</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="glass-card lg:col-span-2">
          <CardHeader>
            <CardTitle>Agent Subscription Status</CardTitle>
            <CardDescription>Days remaining in your agent subscriptions</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex items-center justify-center h-64">
                <Skeleton className="h-64 w-full" />
              </div>
            ) : chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 15 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    contentStyle={{ background: "rgba(255, 255, 255, 0.8)", border: "none", borderRadius: "8px" }}
                  />
                  <Bar dataKey="daysLeft" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-muted-foreground mb-4">No agent subscriptions found.</p>
                <Button variant="outline" size="sm">
                  Purchase your first agent
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader>
            <CardTitle>Recent Agents</CardTitle>
            <CardDescription>Your active agents</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
              </div>
            ) : purchasedAgents.length > 0 ? (
              <div className="space-y-4">
                {purchasedAgents.slice(0, 4).map((agent) => (
                  <div 
                    key={agent.id}
                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                  >
                    <div>
                      <h3 className="font-medium">{agent.agent?.name || `Agent ${agent.agent_id.slice(0, 5)}...`}</h3>
                      <p className="text-xs text-muted-foreground capitalize">{agent.plan} Plan</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-64 text-center">
                <p className="text-muted-foreground mb-4">No agents purchased yet.</p>
                <Button variant="outline" size="sm">
                  Browse agents
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
