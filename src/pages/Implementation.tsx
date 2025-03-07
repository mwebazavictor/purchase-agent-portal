import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { purchasedAgentApi } from "@/lib/api";
import { PurchasedAgent } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { CopyIcon, CheckIcon, Code, Layout, Loader2 } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const Implementation = () => {
  const { user } = useAuth();
  const location = useLocation();
  const [userAgents, setUserAgents] = useState<PurchasedAgent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const initialSelectedAgent = location.state?.selectedAgent || "";
  const [selectedAgent, setSelectedAgent] = useState<string>(initialSelectedAgent);
  const [copied, setCopied] = useState<{ iframe: boolean; cdn: boolean }>({
    iframe: false,
    cdn: false,
  });

  // Fetch purchased agents
  useEffect(() => {
    const fetchPurchasedAgents = async () => {
      if (!user?.company_id) return;

      try {
        setIsLoading(true);
        const response = await purchasedAgentApi.getPurchasedAgents(user.company_id);
        const purchasedAgents = response.purchasedAgents || [];
        
        setUserAgents(purchasedAgents);
        
        // Set first agent as selected if none is selected
        if (purchasedAgents.length > 0 && !selectedAgent) {
          setSelectedAgent(purchasedAgents[0]._id);
        }
      } catch (error) {
        console.error("Error fetching purchased agents:", error);
        toast.error("Failed to load agents");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchasedAgents();
  }, [user?.company_id]);

  // Set the selected agent based on navigation state
  useEffect(() => {
    if (location.state?.selectedAgent) {
      setSelectedAgent(location.state.selectedAgent);
    }
  }, [location.state]);

  const handleCopy = (type: "iframe" | "cdn") => {
    const codeElement = document.getElementById(`${type}-code`);
    if (codeElement) {
      navigator.clipboard.writeText(codeElement.textContent || "");
      
      setCopied(prev => ({ ...prev, [type]: true }));
      
      setTimeout(() => {
        setCopied(prev => ({ ...prev, [type]: false }));
      }, 2000);
    }
  };

  const iframeCode = `<iframe
  src="https://ai-customer-support-production-e6c0.up.railway.app/${user?.company_id}"
  width="100%"
  height="600px"
  frameborder="0"
  allow="microphone"
></iframe>`;

  const cdnCode = `<!-- Add this code to your website -->
 <script 
src="https://ai-customer-support-production.up.railway.app/api/chat-script?companyId=${user?.company_id}"
strategy="afterInteractive"
></script>`;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Implementation</h1>
        <p className="text-muted-foreground">Add an agent to your website</p>
      </div>

      <Card className="glass-card">
        <CardHeader>
          <CardTitle>Select an Agent</CardTitle>
          <CardDescription>Choose which agent you want to implement</CardDescription>
        </CardHeader>
        <CardContent>
          <Select 
            value={selectedAgent} 
            onValueChange={setSelectedAgent}
            disabled={userAgents.length === 0}
          >
            <SelectTrigger className="w-full md:w-[300px]">
              <SelectValue placeholder={userAgents.length === 0 ? "No agents available" : "Select an agent"} />
            </SelectTrigger>
            <SelectContent>
              {userAgents.map((agent) => (
                <SelectItem key={agent._id} value={agent._id}>
                  {agent.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {userAgents.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg bg-gray-50">
          <p className="text-gray-600 mb-4">You haven't purchased any agents yet.</p>
          <Button variant="outline">Purchase an Agent</Button>
        </div>
      ) : (
        <Tabs defaultValue="iframe" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="iframe" className="flex items-center">
              <Layout className="w-4 h-4 mr-2" />
              iFrame
            </TabsTrigger>
            <TabsTrigger value="cdn" className="flex items-center">
              <Code className="w-4 h-4 mr-2" />
              CDN Script
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="iframe">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>iFrame Implementation</CardTitle>
                <CardDescription>
                  Add this code to your website to embed the agent directly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <pre className="p-4 rounded-lg bg-muted/50 overflow-x-auto text-sm">
                    <code id="iframe-code" className="text-xs md:text-sm">
                      {iframeCode}
                    </code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleCopy("iframe")}
                  >
                    {copied.iframe ? (
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Implementation Notes:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-4 list-disc">
                    <li>The iFrame method is the simplest way to add an agent to your site</li>
                    <li>Adjust the width and height parameters to fit your design</li>
                    <li>Make sure to use the correct agent ID and company ID</li>
                    <li>The agent will inherit styles from the iFrame, not your website</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="cdn">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle>CDN Script Implementation</CardTitle>
                <CardDescription>
                  Add this script to your website for a customizable agent experience.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <pre className="p-4 rounded-lg bg-muted/50 overflow-x-auto text-sm">
                    <code id="cdn-code" className="text-xs md:text-sm">
                      {cdnCode}
                    </code>
                  </pre>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleCopy("cdn")}
                  >
                    {copied.cdn ? (
                      <CheckIcon className="h-4 w-4 text-green-500" />
                    ) : (
                      <CopyIcon className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                
                <div className="p-4 bg-muted/30 rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Implementation Notes:</h3>
                  <ul className="space-y-1 text-sm text-muted-foreground ml-4 list-disc">
                    <li>The CDN method provides more flexibility and customization</li>
                    <li>Add the script to your page just before the closing body tag</li>
                    <li>The agent container can be placed anywhere on your page</li>
                    <li>You can customize appearance by adding CSS for #agent-container</li>
                    <li>Advanced configuration options are available in the documentation</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
};

export default Implementation;