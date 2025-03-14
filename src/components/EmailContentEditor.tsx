
import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Image,
  Subscript,
  Link as LinkIcon
} from "lucide-react";
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
import { cn } from "@/lib/utils";

interface EmailContentEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const EmailContentEditor = ({ value, onChange }: EmailContentEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorState, setEditorState] = useState("");
  
  // Image attachment states
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [includeLink, setIncludeLink] = useState(false);
  const [imageLink, setImageLink] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle formatting commands
  const execFormatCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    
    if (editorRef.current) {
      // Update state with HTML content
      const newContent = editorRef.current.innerHTML;
      setEditorState(newContent);
      onChange(newContent);
    }
    
    // Refocus the editor
    editorRef.current?.focus();
  };

  // Handle toolbar button clicks
  const handleFormat = (format: string) => {
    execFormatCommand(format);
  };

  // Handle alignment changes
  const handleAlignment = (alignment: string) => {
    execFormatCommand('justifyLeft', '');
    execFormatCommand('justifyCenter', '');
    execFormatCommand('justifyRight', '');
    
    switch (alignment) {
      case 'left':
        execFormatCommand('justifyLeft');
        break;
      case 'center':
        execFormatCommand('justifyCenter');
        break;
      case 'right':
        execFormatCommand('justifyRight');
        break;
      default:
        break;
    }
  };

  // Handle image insertion
  const handleInsertImage = () => {
    let imgHtml = '';
    
    // Using URL
    if (imageUrl) {
      imgHtml = includeLink && imageLink
        ? `<a href="${imageLink}" target="_blank"><img src="${imageUrl}" style="max-width: 100%;" alt="Email image" /></a>`
        : `<img src="${imageUrl}" style="max-width: 100%;" alt="Email image" />`;
    }
    // Using File
    else if (imageFile) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imgSrc = e.target?.result as string;
        imgHtml = includeLink && imageLink
          ? `<a href="${imageLink}" target="_blank"><img src="${imgSrc}" style="max-width: 100%;" alt="Email image" /></a>`
          : `<img src="${imgSrc}" style="max-width: 100%;" alt="Email image" />`;
        
        // Insert at cursor position or append to end
        execFormatCommand('insertHTML', imgHtml);
      };
      reader.readAsDataURL(imageFile);
      return; // Early return for async operation
    }
    
    if (imgHtml) {
      execFormatCommand('insertHTML', imgHtml);
    }
    
    // Reset image dialog state
    setImageUrl("");
    setImageFile(null);
    setIncludeLink(false);
    setImageLink("");
  };

  // Handle content change
  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setEditorState(newContent);
      onChange(newContent);
    }
  };

  return (
    <div className="border border-emerald-200 dark:border-emerald-800 rounded-md overflow-hidden">
      <div className="bg-emerald-50 dark:bg-emerald-900/30 p-2 border-b border-emerald-200 dark:border-emerald-800 flex flex-wrap gap-2">
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => handleFormat('bold')}
          className="h-8 w-8 p-0 rounded-md"
          title="Bold"
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => handleFormat('italic')}
          className="h-8 w-8 p-0 rounded-md"
          title="Italic"
        >
          <Italic className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => handleFormat('subscript')}
          className="h-8 w-8 p-0 rounded-md"
          title="Subscript"
        >
          <Subscript className="h-4 w-4" />
        </Button>
        
        <div className="h-6 w-px bg-emerald-200 dark:bg-emerald-700 mx-1"></div>
        
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => handleAlignment('left')}
          className="h-8 w-8 p-0 rounded-md"
          title="Align Left"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => handleAlignment('center')}
          className="h-8 w-8 p-0 rounded-md"
          title="Align Center"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => handleAlignment('right')}
          className="h-8 w-8 p-0 rounded-md"
          title="Align Right"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        
        <div className="h-6 w-px bg-emerald-200 dark:bg-emerald-700 mx-1"></div>
        
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
      </div>
      
      <div
        ref={editorRef}
        contentEditable
        dangerouslySetInnerHTML={{ __html: value }}
        onInput={handleContentChange}
        className={cn(
          "min-h-[200px] p-4 focus:outline-none prose prose-emerald max-w-none",
          "prose-headings:text-emerald-800 dark:prose-headings:text-emerald-300",
          "prose-p:text-gray-700 dark:prose-p:text-gray-300"
        )}
      ></div>
    </div>
  );
};

export default EmailContentEditor;
