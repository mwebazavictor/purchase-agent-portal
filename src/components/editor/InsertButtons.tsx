
import React from "react";
import { Button } from "@/components/ui/button";
import { Image, Link as LinkIcon, File } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface InsertButtonsProps {
  execFormatCommand: (command: string, value?: string) => void;
  fileInputRef: React.RefObject<HTMLInputElement>;
  generalFileInputRef: React.RefObject<HTMLInputElement>;
  handleFileAttachment: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InsertButtons = ({
  execFormatCommand,
  fileInputRef,
  generalFileInputRef,
  handleFileAttachment
}: InsertButtonsProps) => {
  const [imageUrl, setImageUrl] = React.useState("");
  const [imageFile, setImageFile] = React.useState<File | null>(null);
  const [includeLink, setIncludeLink] = React.useState(false);
  const [imageLink, setImageLink] = React.useState("");

  const handleInsertImage = () => {
    let imgHtml = '';
    
    // Using URL
    if (imageUrl) {
      imgHtml = includeLink && imageLink
        ? `<a href="${imageLink}" target="_blank"><img src="${imageUrl}" style="max-width: 100%;" alt="Email image" /></a>`
        : `<img src="${imageUrl}" style="max-width: 100%;" alt="Email image" />`;
        
      // Insert at cursor position
      execFormatCommand('insertHTML', imgHtml);
    }
    // Using File
    else if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgSrc = e.target?.result as string;
        imgHtml = includeLink && imageLink
          ? `<a href="${imageLink}" target="_blank"><img src="${imgSrc}" style="max-width: 100%;" alt="Email image" /></a>`
          : `<img src="${imgSrc}" style="max-width: 100%;" alt="Email image" />`;
        
        // Insert at cursor position
        execFormatCommand('insertHTML', imgHtml);
      };
      reader.readAsDataURL(imageFile);
      return; // Early return for async operation
    }
    
    // Reset image dialog state
    setImageUrl("");
    setImageFile(null);
    setIncludeLink(false);
    setImageLink("");
  };

  return (
    <>
      {/* Image Dialog */}
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            type="button"
            className="h-8 px-2 rounded-md flex items-center gap-1"
            title="Insert Image"
          >
            <Image className="h-4 w-4" />
            <span className="text-xs">Image</span>
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Insert Image</DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="url">Image URL</TabsTrigger>
              <TabsTrigger value="upload">Upload Image</TabsTrigger>
            </TabsList>
            
            <TabsContent value="url" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="image-url">Image URL</Label>
                <Input
                  id="image-url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="border-emerald-200 dark:border-emerald-800"
                />
              </div>
            </TabsContent>
            
            <TabsContent value="upload" className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="image-file">Upload Image</Label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="border-emerald-200 dark:border-emerald-800"
                  >
                    Choose File
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    {imageFile ? imageFile.name : "No file chosen"}
                  </span>
                  <input
                    type="file"
                    id="image-file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImageFile(file);
                        setImageUrl("");
                      }
                    }}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="space-y-4 py-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="include-link"
                checked={includeLink}
                onCheckedChange={setIncludeLink}
              />
              <Label htmlFor="include-link">Include link on this image</Label>
            </div>
            
            {includeLink && (
              <div className="space-y-2">
                <Label htmlFor="image-link">Link URL</Label>
                <Input
                  id="image-link"
                  value={imageLink}
                  onChange={(e) => setImageLink(e.target.value)}
                  placeholder="https://example.com"
                  className="border-emerald-200 dark:border-emerald-800"
                />
              </div>
            )}
          </div>
          
          <div className="flex justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button onClick={handleInsertImage}>Insert Image</Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
      
      {/* Link Button */}
      <Button
        variant="ghost"
        size="sm"
        type="button"
        onClick={() => {
          const url = prompt("Enter URL:", "https://");
          if (url) {
            const selection = window.getSelection();
            if (selection && selection.toString()) {
              // If text is selected, wrap it with a link
              execFormatCommand('createLink', url);
            } else {
              // If no text is selected, insert a new link
              const linkText = prompt("Enter link text:", url);
              const linkHtml = `<a href="${url}" target="_blank">${linkText || url}</a>`;
              execFormatCommand('insertHTML', linkHtml);
            }
          }
        }}
        className="h-8 px-2 rounded-md flex items-center gap-1"
        title="Insert Link"
      >
        <LinkIcon className="h-4 w-4" />
        <span className="text-xs">Link</span>
      </Button>

      {/* File Attachment */}
      <Button
        variant="ghost"
        size="sm"
        type="button"
        className="h-8 px-2 rounded-md flex items-center gap-1"
        onClick={() => generalFileInputRef.current?.click()}
        title="Attach File"
      >
        <File className="h-4 w-4" />
        <span className="text-xs">File</span>
        <input
          type="file"
          ref={generalFileInputRef}
          className="hidden"
          onChange={handleFileAttachment}
        />
      </Button>
    </>
  );
};

export default InsertButtons;
