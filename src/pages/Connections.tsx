
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Link as LinkIcon, Copy, ExternalLink, ArrowRight } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { googleConnectionApi } from "@/lib/api";

const Connections = () => {
  const { user } = useAuth();
  const [showConnectDialog, setShowConnectDialog] = useState(false);
  const [showInstructionsDialog, setShowInstructionsDialog] = useState(false);
  const [clientId, setClientId] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  const redirectURI = "https://purchase-agent-portal-production.up.railway.app/dashboard";
  
  const handleCopyRedirectURI = () => {
    navigator.clipboard.writeText(redirectURI);
    toast.success("Redirect URI copied to clipboard");
  };
  
  const handleConnect = async () => {
    if (!clientId || !clientSecret) {
      toast.error("Please enter both Client ID and Client Secret");
      return;
    }
  
    setIsConnecting(true);
    try {
      const companyId = user?.company_id || user?.Company_id;
      if (!companyId) {
        throw new Error("Company ID not found");
      }
  
      await googleConnectionApi.connectGoogleAccount({
        company_id: companyId,
        client_id: clientId,
        client_secret: clientSecret,
      });
  
      toast.success("Successfully connected to Google");
      setShowConnectDialog(false);
      setClientId("");
      setClientSecret("");
  
      // Redirect to Google's OAuth 2.0 Authorization URL
      const authUrl = `https://accounts.google.com/o/oauth2/auth?client_id=${clientId}&redirect_uri=https://purchase-agent-portal-production.up.railway.app/connections&response_type=code&scope=https://mail.google.com/&access_type=online`;
  
      window.location.href = authUrl;
    } catch (error) {
      console.error("Google connection error:", error);
      toast.error("Failed to connect to Google. Please try again.");
    } finally {
      setIsConnecting(false);
    }
  };
  

  const handleStartProcess = () => {
    setShowInstructionsDialog(true);
  };
  
  const steps = [
    {
      title: "Access Google Cloud Console",
      content: (
        <div className="space-y-3">
          <p>Go to <a href="https://console.cloud.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline flex items-center">
            console.cloud.google.com <ExternalLink className="h-3.5 w-3.5 ml-1" />
          </a> and login with your Google account. Navigate to <strong>API's & Services</strong> in the side menu.</p>
          <img src="/Instructions/2.png" alt="Google Cloud Console" className="rounded-md border border-gray-200 my-3 max-w-full" />
        </div>
      )
    },
    {
      title: "Navigate to Credentials",
      content: (
        <div className="space-y-3">
          <p>Under <strong>API's & Services</strong>, select <strong>Credentials</strong> from the sidebar.</p>
          <img src="/Instructions/3.png" alt="Credentials Section" className="rounded-md border border-gray-200 my-3 max-w-full" />
        </div>
      )
    },
    {
      title: "Create OAuth Client ID",
      content: (
        <div className="space-y-3">
          <p>Click <strong>Create Credentials</strong> and select <strong>OAuth client ID</strong>.</p>
          <img src="/Instructions/4.png" alt="Create OAuth Client ID" className="rounded-md border border-gray-200 my-3 max-w-full" />
          <p>Complete the required fields for your OAuth client.</p>
          <img src="/Instructions/5.png" alt="OAuth Client Settings" className="rounded-md border border-gray-200 my-3 max-w-full" />
        </div>
      )
    },
    {
      title: "Add Redirect URI",
      content: (
        <div className="space-y-3">
          <p>Under <strong>Authorized redirect URIs</strong>, click <strong>ADD URI</strong> and paste the following:</p>
          <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-md">
            <code className="text-sm break-all flex-1">{redirectURI}</code>
            <Button 
              size="sm" 
              variant="ghost" 
              onClick={handleCopyRedirectURI}
              className="shrink-0"
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <p>Click <strong>Create</strong> to generate your credentials.</p>
        </div>
      )
    },
    {
      title: "Save Your Credentials",
      content: (
        <div className="space-y-3">
          <p>A modal will show containing your <strong>Client ID</strong> and <strong>Client Secret</strong>.</p>
          <p>Store these credentials safely. You can also download the JSON file for future reference.</p>
          <p>Once you have your credentials, click the Connect button below to proceed to the next step.</p>
        </div>
      )
    }
  ];
  
  return (
    <div className="container max-w-5xl mx-auto py-8 px-4 sm:px-6">
      <h1 className="text-3xl font-bold mb-6">Connections</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Google Account</CardTitle>
            <CardDescription>
              Connect your Google account to send and receive emails
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <LinkIcon className="h-8 w-8 mr-4 text-emerald-600" />
              <div>
                <p>Enable email capabilities by connecting your Google account</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleStartProcess}>
              Connect
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Instructions Dialog */}
      <Dialog open={showInstructionsDialog} onOpenChange={setShowInstructionsDialog}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Connect to Google - Step {currentStep} of {steps.length}</DialogTitle>
            <DialogDescription>
              Follow these steps to connect your Google account
            </DialogDescription>
          </DialogHeader>
          
          {/* Steps */}
          <div className="py-4">
            {steps[currentStep - 1].content}
          </div>
          
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 mt-4 sticky bottom-0 bg-white dark:bg-gray-950 py-4 border-t">
            <Button
              variant="outline"
              onClick={() => currentStep > 1 && setCurrentStep(currentStep - 1)}
              disabled={currentStep === 1}
            >
              Previous
            </Button>
            
            {currentStep < steps.length ? (
              <Button onClick={() => setCurrentStep(currentStep + 1)}>
                Next
              </Button>
            ) : (
              <Button onClick={() => {
                setShowInstructionsDialog(false);
                setShowConnectDialog(true);
              }}>
                Connect Now
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Connect Dialog */}
      <Dialog open={showConnectDialog} onOpenChange={setShowConnectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Enter Google Credentials</DialogTitle>
            <DialogDescription>
              Enter the Client ID and Client Secret you obtained from Google
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label htmlFor="clientId" className="text-sm font-medium">
                Client ID
              </label>
              <Input
                id="clientId"
                value={clientId}
                onChange={(e) => setClientId(e.target.value)}
                placeholder="Your Google Client ID"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="clientSecret" className="text-sm font-medium">
                Client Secret
              </label>
              <Input
                id="clientSecret"
                value={clientSecret}
                onChange={(e) => setClientSecret(e.target.value)}
                placeholder="Your Google Client Secret"
                type="password"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConnectDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleConnect} disabled={isConnecting}>
              {isConnecting ? "Connecting..." : "Connect"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Connections;
