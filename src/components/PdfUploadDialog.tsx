import { useState, ChangeEvent } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { FileUp, CheckCircle, FileText } from "lucide-react";

interface PdfUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  purchasedAgentId: string;
}

const PdfUploadDialog = ({ open, onOpenChange, purchasedAgentId }: PdfUploadDialogProps) => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>("");
  const [preview, setPreview] = useState(false);
  const [consent, setConsent] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      
      if (!selectedFile.type.includes('pdf')) {
        toast.error("Please select a PDF file");
        return;
      }
      
      setFile(selectedFile);
      
      // Read file content
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const content = event.target.result as string;
          setFileContent(content);
        }
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async () => {
    console.log(user);
    if (!file || !user?.Company_id) {
      toast.error("Missing file or user information");
      return;
    }

    if (!consent) {
      toast.error("Please provide consent before uploading");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      toast.error("Authentication required");
      return;
    }

    setIsUploading(true);

    try {
      // Encode file content to base64 if needed
      /* const payload = {
        document: fileContent,
        user_id: user.id,
        company_id: user.Company_id,
      }; */

      const formData = new FormData();
      formData.append('document', file);
      formData.append('user_id', user.id);
      formData.append('company_id', user.Company_id);
      formData.append('purchased_agent_id', purchasedAgentId);

      const response = await fetch('https://multi-agents-production-aace.up.railway.app/api/v1/upload', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      toast.success("PDF uploaded successfully");
      onOpenChange(false);
      setFile(null);
      setFileContent("");
      setPreview(false);
      setConsent(false);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload PDF. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload PDF Document</DialogTitle>
          <DialogDescription>
            Upload a PDF file to train the AI agent with your content.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {!preview ? (
            <div className="space-y-4">
              <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition-colors">
                {file ? (
                  <div className="text-center">
                    <FileText className="w-10 h-10 text-primary mx-auto mb-2" />
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <Button 
                      variant="link" 
                      size="sm" 
                      onClick={() => setPreview(true)}
                      className="mt-2"
                    >
                      Preview & Confirm
                    </Button>
                  </div>
                ) : (
                  <Label 
                    htmlFor="pdf-upload" 
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <FileUp className="w-10 h-10 text-gray-400 mb-2" />
                    <span className="text-sm font-medium">Click to upload PDF</span>
                    <span className="text-xs text-muted-foreground mt-1">
                      PDF file up to 10MB
                    </span>
                  </Label>
                )}
                <Input
                  id="pdf-upload"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-muted rounded-lg p-4">
                <h3 className="text-sm font-medium mb-2">Document Preview</h3>
                <div className="border rounded bg-card p-2 text-sm max-h-40 overflow-auto">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-primary mr-2" />
                    <p>{file?.name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    {file ? `Size: ${(file.size / 1024 / 1024).toFixed(2)} MB` : ''}
                  </p>
                </div>
                
                <div className="flex items-start space-x-2 mt-4">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(checked) => {
                      setConsent(checked as boolean);
                    }}
                  />
                  <Label
                    htmlFor="consent"
                    className="text-sm leading-tight"
                  >
                    I confirm this document contains information I want to share with the AI agent, and I have permission to upload this content.
                  </Label>
                </div>
              </div>
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => setPreview(false)}
                >
                  Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  disabled={!consent || isUploading}
                  className="gap-2"
                >
                  {isUploading ? (
                    <>Uploading...</>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Upload Document
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PdfUploadDialog;
