
import { useState, useRef } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import EmailContentEditor from "@/components/EmailContentEditor";
import RecipientList from "@/components/RecipientList";
import { toast } from "sonner";
import { Mail, Upload } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const Emails = () => {
  const { user } = useAuth();
  const [subject, setSubject] = useState("");
  const [recipients, setRecipients] = useState<string[]>([]);
  const [htmlContent, setHtmlContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  
  // Upload ref
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendEmail = async () => {
    if (!subject) {
      toast.error("Please add a subject");
      return;
    }

    if (recipients.length === 0) {
      toast.error("Please add at least one recipient");
      return;
    }

    if (!htmlContent) {
      toast.error("Please add email content");
      return;
    }

    // Set sending state
    setIsSending(true);

    try {
      // API call would go here
      // Example of data structure to send
      const emailData = {
        sender: user?.email,
        recipients,
        subject,
        htmlContent,
      };

      console.log("Email data to send:", emailData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Success feedback
      toast.success("Email sent successfully");
      
      // Reset form
      setSubject("");
      setRecipients([]);
      setHtmlContent("");
    } catch (error) {
      console.error("Error sending email:", error);
      toast.error("Failed to send email. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-emerald-800 dark:text-emerald-300">Email Campaign</h1>
        <p className="text-muted-foreground">Create and send emails to your customers</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="col-span-1 xl:col-span-2 glass-card p-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="sender">From</Label>
              <Input 
                id="sender" 
                value={user?.email || ""} 
                disabled 
                className="bg-emerald-50 dark:bg-emerald-900/30"
              />
            </div>
            
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input 
                id="subject" 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)} 
                placeholder="Enter email subject"
                className="border-emerald-200 dark:border-emerald-800 focus-visible:ring-emerald-500"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Email Content</Label>
              <EmailContentEditor 
                onChange={setHtmlContent}
                value={htmlContent}
              />
            </div>
            
            <div className="pt-4">
              <Button 
                onClick={handleSendEmail} 
                disabled={isSending}
                className="w-full sm:w-auto"
              >
                <Mail className="mr-2 h-4 w-4" />
                {isSending ? "Sending..." : "Send Email"}
              </Button>
            </div>
          </div>
        </Card>
        
        <Card className="glass-card p-4">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-emerald-800 dark:text-emerald-300">Recipients</h3>
            
            <div className="flex flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="mr-2 h-4 w-4" />
                Import CSV
              </Button>
              
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept=".csv,.xlsx,.xls"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    // Here you would handle the file parsing
                    // For demo purposes, we'll just show a toast
                    toast.success(`File "${file.name}" selected`);
                    
                    // In a real implementation, you would parse the file and set recipients
                    // Simulating adding some recipients
                    setRecipients(["example1@example.com", "example2@example.com"]);
                  }
                }}
              />
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm">Add Manually</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Add Recipients</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <p className="text-sm text-muted-foreground">
                      Enter email addresses separated by commas, spaces, or new lines.
                    </p>
                    <textarea 
                      className="w-full p-2 h-40 border rounded-md border-emerald-200 dark:border-emerald-800 focus-visible:ring-emerald-500"
                      placeholder="email1@example.com, email2@example.com"
                      onChange={(e) => {
                        // Split by common separators and filter empty entries
                        const emails = e.target.value
                          .split(/[,;\s\n]+/)
                          .map(email => email.trim())
                          .filter(email => email !== "");
                        
                        setRecipients(emails);
                      }}
                    />
                    <Button 
                      onClick={() => {
                        if (recipients.length) {
                          toast.success(`Added ${recipients.length} recipients`);
                        } else {
                          toast.error("Please add at least one valid email");
                        }
                      }}
                    >
                      Add Recipients
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
            
            <RecipientList 
              recipients={recipients}
              onRemove={(index) => {
                const newRecipients = [...recipients];
                newRecipients.splice(index, 1);
                setRecipients(newRecipients);
              }}
            />
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Emails;
