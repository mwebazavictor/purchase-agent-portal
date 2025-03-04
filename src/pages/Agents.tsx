
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { agentApi, purchasedAgentApi } from "@/lib/api";
import { Agent, PurchasedAgent } from "@/lib/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Check, ShoppingCart } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

// Default pricing options for agents that don't have pricing defined
const DEFAULT_PRICING = {
  basic: 29,
  professional: 79,
  enterprise: 199
};

// Default features for agents that don't have features defined
const DEFAULT_FEATURES = [
  "24/7 AI assistance",
  "Customizable responses",
  "Analytics dashboard",
  "Customer support"
];

const Agents = () => {
  const { user } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [purchasedAgents, setPurchasedAgents] = useState<PurchasedAgent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>("basic");
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Get actual agents from API
        const fetchedAgents = await agentApi.getAgents();
        
        // Filter to only show active agents
        const activeAgents = fetchedAgents.filter(agent => agent.status === "active");
        
        // Add default pricing and features if not provided
        const agentsWithDefaults = activeAgents.map(agent => ({
          ...agent,
          pricing: agent.pricing || DEFAULT_PRICING,
          features: agent.features || DEFAULT_FEATURES
        }));
        
        setAgents(agentsWithDefaults);
        
        if (user?.company_id) {
          const purchased = await purchasedAgentApi.getPurchasedAgents(user.company_id);
          setPurchasedAgents(purchased);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handlePurchase = async () => {
    if (!selectedAgent || !user?.company_id) return;
    
    try {
      const plan = selectedPlan;
      const pricing = selectedAgent.pricing || DEFAULT_PRICING;
      const amount = pricing[plan as keyof typeof pricing].toString();
      
      await purchasedAgentApi.purchaseAgent({
        company_id: user.company_id,
        plan,
        amount,
        period: 30, // 30 days subscription
        agent_id: selectedAgent._id // Using _id instead of id
      });
      
      toast.success(`Successfully purchased ${selectedAgent.name}`);
      setDialogOpen(false);
      
      // Refresh purchased agents
      const purchased = await purchasedAgentApi.getPurchasedAgents(user.company_id);
      setPurchasedAgents(purchased);
    } catch (error) {
      console.error("Error purchasing agent:", error);
      toast.error("Failed to purchase agent. Please try again.");
    }
  };

  const isPurchased = (agentId: string) => {
    return purchasedAgents.some(pa => pa.agent_id === agentId);
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">AI Agents</h1>
        <p className="text-muted-foreground">Browse and manage your AI agents</p>
      </div>

      <Tabs defaultValue="marketplace" className="w-full">
        <TabsList>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger value="my-agents">My Agents</TabsTrigger>
        </TabsList>
        
        <TabsContent value="marketplace" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <Card key={i} className="glass-card h-96">
                  <CardHeader>
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Skeleton className="h-24 w-full" />
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-2/3" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))
            ) : (
              agents.map((agent) => (
                <Card key={agent._id} className="agent-card h-full flex flex-col">
                  <CardHeader>
                    <CardTitle>{agent.name}</CardTitle>
                    <CardDescription>{agent.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="mb-4">
                      <h3 className="text-sm font-medium mb-2">Features:</h3>
                      <ul className="space-y-2">
                        {(agent.features || DEFAULT_FEATURES).map((feature, index) => (
                          <li key={index} className="flex items-start text-sm">
                            <Check size={16} className="mr-2 text-primary flex-shrink-0 mt-0.5" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-medium mb-2">Pricing:</h3>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="rounded-md border p-2">
                          <div className="font-medium">Basic</div>
                          <div className="text-lg">${(agent.pricing || DEFAULT_PRICING).basic}</div>
                        </div>
                        <div className="rounded-md border p-2">
                          <div className="font-medium">Pro</div>
                          <div className="text-lg">${(agent.pricing || DEFAULT_PRICING).professional}</div>
                        </div>
                        <div className="rounded-md border p-2">
                          <div className="font-medium">Enterprise</div>
                          <div className="text-lg">${(agent.pricing || DEFAULT_PRICING).enterprise}</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {isPurchased(agent._id) ? (
                      <Button className="w-full" variant="outline" disabled>
                        <Check size={16} className="mr-2" />
                        Purchased
                      </Button>
                    ) : (
                      <Button 
                        className="w-full" 
                        onClick={() => {
                          setSelectedAgent(agent);
                          setDialogOpen(true);
                        }}
                      >
                        <ShoppingCart size={16} className="mr-2" />
                        Purchase
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="my-agents" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(2).fill(0).map((_, i) => (
                <Card key={i} className="glass-card h-64">
                  <CardHeader>
                    <Skeleton className="h-8 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-16 w-full" />
                  </CardContent>
                  <CardFooter>
                    <Skeleton className="h-10 w-full" />
                  </CardFooter>
                </Card>
              ))
            ) : purchasedAgents.length > 0 ? (
              purchasedAgents.map((purchased) => {
                // Find the agent details
                const agentDetails = agents.find(a => a._id === purchased.agent_id) || {
                  name: `Agent ${purchased.agent_id.slice(0, 5)}...`,
                  description: "Custom agent",
                };
                
                return (
                  <Card key={purchased.id} className="agent-card h-full flex flex-col">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle>{agentDetails.name}</CardTitle>
                        <Badge className="capitalize">{purchased.plan}</Badge>
                      </div>
                      <CardDescription>
                        {agentDetails.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          Purchased on: {new Date(purchased.createdAt).toLocaleDateString()}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Expires on: {new Date(purchased.expiresAt).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button className="flex-1" variant="outline">
                        Implement
                      </Button>
                      <Button className="flex-1">
                        Manage
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-3 py-12 text-center">
                <h3 className="text-lg font-medium mb-2">No agents purchased yet</h3>
                <p className="text-muted-foreground mb-4">Purchase your first agent from the marketplace</p>
                <Button onClick={() => document.querySelector('[value="marketplace"]')?.click()}>
                  Browse Marketplace
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Purchase dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle>Purchase Agent</DialogTitle>
            <DialogDescription>
              Select a plan for {selectedAgent?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Plan</label>
              <Select 
                defaultValue="basic" 
                onValueChange={value => setSelectedPlan(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">Basic (${(selectedAgent?.pricing || DEFAULT_PRICING).basic}/month)</SelectItem>
                  <SelectItem value="professional">Professional (${(selectedAgent?.pricing || DEFAULT_PRICING).professional}/month)</SelectItem>
                  <SelectItem value="enterprise">Enterprise (${(selectedAgent?.pricing || DEFAULT_PRICING).enterprise}/month)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="rounded-md bg-muted p-4">
              <h4 className="text-sm font-medium mb-2">Your purchase includes:</h4>
              <ul className="space-y-2">
                <li className="text-sm flex items-start">
                  <Check size={14} className="mr-2 text-primary flex-shrink-0 mt-0.5" />
                  <span>30 days of access to the agent</span>
                </li>
                <li className="text-sm flex items-start">
                  <Check size={14} className="mr-2 text-primary flex-shrink-0 mt-0.5" />
                  <span>Implementation support</span>
                </li>
                <li className="text-sm flex items-start">
                  <Check size={14} className="mr-2 text-primary flex-shrink-0 mt-0.5" />
                  <span>Access to analytics</span>
                </li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePurchase}>
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Agents;
