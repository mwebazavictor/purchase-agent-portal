import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
import PdfUploadDialog from "@/components/PdfUploadDialog";

const Agents = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [purchasedAgents, setPurchasedAgents] = useState<PurchasedAgent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string>("free");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);
  const [selectedPurchasedAgent, setSelectedPurchasedAgent] = useState<string>("");
  const [activeTab, setActiveTab] = useState<string>("my-agents");

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tabParam = searchParams.get('tab');
    
    if (tabParam === 'marketplace') {
      setActiveTab("marketplace");
    }
  }, [location]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const fetchedAgents = await agentApi.getAgents();
        const activeAgents = fetchedAgents.filter(agent => agent.status === "active");
        setAgents(activeAgents);
        
        if (user?.company_id) {
          const response = await purchasedAgentApi.getPurchasedAgents(user.company_id);
          const purchased = Array.isArray(response) ? response : 
                           (response.purchasedAgents && Array.isArray(response.purchasedAgents)) ? 
                           response.purchasedAgents : [];
          console.log("Purchased agents response:", response);
          console.log("Processed purchased agents:", purchased);
          setPurchasedAgents(purchased);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load agents. Please try again.");
        setPurchasedAgents([]);
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
      const amount = plan === "free" ? "0" : "500";
      
      await purchasedAgentApi.purchaseAgent({
        company_id: user.company_id,
        plan,
        amount,
        period: 30,
        agent_id: selectedAgent._id
      });
      
      toast.success(`Successfully subscribed to ${selectedAgent.name}`);
      setDialogOpen(false);
      
      if (user?.company_id) {
        const response = await purchasedAgentApi.getPurchasedAgents(user.company_id);
        const purchased = Array.isArray(response) ? response : 
                         (response.purchasedAgents && Array.isArray(response.purchasedAgents)) ? 
                         response.purchasedAgents : [];
        setPurchasedAgents(purchased);
      }
    } catch (error) {
      console.error("Error purchasing agent:", error);
      toast.error("Failed to subscribe to agent. Please try again.");
    }
  };

  const isPurchased = (agentId: string) => {
    return Array.isArray(purchasedAgents) && purchasedAgents.some(pa => pa.agent_id === agentId);
  };

  const navToMarketplace = () => {
    setActiveTab("marketplace");
  };

  const handleImplement = (agentId: string) => {
    navigate('/implementation', { state: { selectedAgent: agentId }});
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">AI Agents</h1>
        <p className="text-muted-foreground">Browse and manage your AI agents</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList>
          <TabsTrigger value="my-agents">My Agents</TabsTrigger>
          <TabsTrigger value="marketplace">Marketplace</TabsTrigger>
        </TabsList>
        
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
                const purchasedId = purchased.id || purchased._id;
                const agentDetails = agents.find(a => a._id === purchased.agent_id) || {
                  name: `Agent ${purchased.agent_id.slice(0, 5)}...`,
                  description: "AI agent",
                  title: "Custom Agent"
                };
                
                return (
                  <Card key={purchasedId} className="agent-card h-full flex flex-col">
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
                          {agentDetails.title}
                        </p>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button 
                        className="flex-1" 
                        variant="outline"
                        onClick={() => handleImplement(purchased.agent_id)}
                      >
                        Implement
                      </Button>
                      <Button 
                        className="flex-1"
                        onClick={() => {
                          setSelectedPurchasedAgent(purchasedId);
                          setUploadDialogOpen(true);
                        }}
                      >
                        Train
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })
            ) : (
              <div className="col-span-3 py-12 text-center">
                <h3 className="text-lg font-medium mb-2">No agents subscribed yet</h3>
                <p className="text-muted-foreground mb-4">Subscribe to your first agent from the marketplace</p>
                <Button onClick={navToMarketplace}>
                  Browse Marketplace
                </Button>
              </div>
            )}
          </div>
        </TabsContent>
        
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
                      <h3 className="text-sm font-medium mb-2">{agent.title}</h3>
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-medium mb-2">Available Plans:</h3>
                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="rounded-md border p-2">
                          <div className="font-medium">Free</div>
                          <div className="text-lg">$0</div>
                        </div>
                        <div className="rounded-md border p-2 bg-gray-100">
                          <div className="font-medium">Enterprise</div>
                          <div className="text-lg">$500</div>
                          <div className="text-xs mt-1 text-gray-500">Coming soon</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    {isPurchased(agent._id) ? (
                      <Button className="w-full" variant="outline" disabled>
                        <Check size={16} className="mr-2" />
                        Subscribed
                      </Button>
                    ) : (
                      <Button 
                        className="w-full" 
                        onClick={() => {
                          setSelectedAgent(agent);
                          setSelectedPlan("free");
                          setDialogOpen(true);
                        }}
                      >
                        <ShoppingCart size={16} className="mr-2" />
                        Subscribe
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="glass-card">
          <DialogHeader>
            <DialogTitle>Subscribe to Agent</DialogTitle>
            <DialogDescription>
              Select a plan for {selectedAgent?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Plan</label>
              <Select 
                defaultValue="free" 
                onValueChange={value => setSelectedPlan(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free ($0/month)</SelectItem>
                  <SelectItem value="enterprise" disabled>Enterprise ($500/month) - Coming Soon</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="rounded-md bg-muted p-4">
              <h4 className="text-sm font-medium mb-2">Your subscription includes:</h4>
              <ul className="space-y-2">
                <li className="text-sm flex items-start">
                  <Check size={14} className="mr-2 text-primary flex-shrink-0 mt-0.5" />
                  <span>30 days of access to the agent</span>
                </li>
                <li className="text-sm flex items-start">
                  <Check size={14} className="mr-2 text-primary flex-shrink-0 mt-0.5" />
                  <span>Implementation options (iframe/CDN)</span>
                </li>
                <li className="text-sm flex items-start">
                  <Check size={14} className="mr-2 text-primary flex-shrink-0 mt-0.5" />
                  <span>Basic support</span>
                </li>
              </ul>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handlePurchase}>
              Confirm Subscription
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <PdfUploadDialog
        open={uploadDialogOpen}
        onOpenChange={setUploadDialogOpen}
        purchasedAgentId={selectedPurchasedAgent}
      />
    </div>
  );
};

export default Agents;
