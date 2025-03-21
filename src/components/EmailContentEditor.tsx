import { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import EditorToolbar from "./editor/EditorToolbar";
import TableDialog from "./TableDialog";
import CodeDialog from "./editor/CodeDialog";
import ColumnsDialog from "./editor/ColumnsDialog";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Subscript,
  Superscript,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Indent,
  Outdent,
  Quote,
  Image as ImageIcon,
  Link as LinkIcon,
  FileIcon,
  Type,
  Table as TableIcon,
  FileCode,
  Code,
  Divide,
  SplitSquareVertical,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { ColorPicker } from "@/components/editor/ColorPicker";
import { EmojiPicker } from "./editor/EmojiPicker";

interface EmailContentEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const EmailContentEditor = ({ value, onChange }: EmailContentEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [editorState, setEditorState] = useState("");
  
  // File input refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const generalFileInputRef = useRef<HTMLInputElement>(null);
  
  // Dialog states
  const [isTableDialogOpen, setIsTableDialogOpen] = useState(false);
  const [isCodeDialogOpen, setIsCodeDialogOpen] = useState(false);
  const [codeContent, setCodeContent] = useState("");
  const [codeLanguage, setCodeLanguage] = useState("javascript");
  const [isColumnsDialogOpen, setIsColumnsDialogOpen] = useState(false);
  const [columnCount, setColumnCount] = useState(2);

  // Image dialog states
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [includeLink, setIncludeLink] = useState(false);
  const [imageLink, setImageLink] = useState("");

  // Handle formatting commands
  const execFormatCommand = useCallback((command: string, value?: string) => {
    document.execCommand(command, false, value);
    
    if (editorRef.current) {
      // Update state with HTML content
      const newContent = editorRef.current.innerHTML;
      setEditorState(newContent);
      onChange(newContent);
    }
    
    // Refocus the editor
    editorRef.current?.focus();
  }, [onChange]);

  // Handle toolbar button clicks
  const handleFormat = (format: string, value?: string) => {
    execFormatCommand(format, value);
  };

  // Handle alignment changes
  const handleAlignment = (alignment: string) => {
    const alignmentCommands = {
      'left': 'justifyLeft',
      'center': 'justifyCenter',
      'right': 'justifyRight',
      'justify': 'justifyFull'
    };
    
    if (alignment in alignmentCommands) {
      execFormatCommand(alignmentCommands[alignment as keyof typeof alignmentCommands]);
    }
  };

  // Handle content change
  const handleContentChange = () => {
    if (editorRef.current) {
      const newContent = editorRef.current.innerHTML;
      setEditorState(newContent);
      onChange(newContent);
    }
  };

  // Handle file attachment
  const handleFileAttachment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real implementation, you would upload the file to a server
      // and then insert a link or placeholder
      const fileIcon = getFileIcon(file.name);
      const fileHtml = `<div class="file-attachment" style="display: flex; align-items: center; padding: 8px; margin: 8px 0; border: 1px solid #ccc; border-radius: 4px; background-color: #f9f9f9;">
        <span style="margin-right: 8px;">${fileIcon}</span>
        <span style="flex-grow: 1;">${file.name} (${formatFileSize(file.size)})</span>
      </div>`;
      
      execFormatCommand('insertHTML', fileHtml);
      toast.success(`File "${file.name}" attached`);
    }
  };

  // Handle table insertion
  const handleInsertTable = (rows: number, cols: number) => {
    let tableHtml = '<table style="width: 100%; border-collapse: collapse; margin: 10px 0;">';
    
    // Create header row
    tableHtml += '<thead><tr>';
    for (let j = 0; j < cols; j++) {
      tableHtml += '<th style="border: 1px solid #ccc; padding: 8px; text-align: left; background-color: #f2f2f2;">Header ' + (j + 1) + '</th>';
    }
    tableHtml += '</tr></thead><tbody>';
    
    // Create data rows
    for (let i = 0; i < rows - 1; i++) {
      tableHtml += '<tr>';
      for (let j = 0; j < cols; j++) {
        tableHtml += '<td style="border: 1px solid #ccc; padding: 8px;">Cell ' + (i + 1) + '-' + (j + 1) + '</td>';
      }
      tableHtml += '</tr>';
    }
    
    tableHtml += '</tbody></table>';
    execFormatCommand('insertHTML', tableHtml);
  };

  // Handle code block insertion
  const handleInsertCode = () => {
    const formattedCode = codeContent
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br>');
    
    const codeHtml = `<pre style="background-color: #f5f5f5; border: 1px solid #ccc; border-radius: 4px; padding: 12px; font-family: monospace; overflow-x: auto; margin: 10px 0;"><code class="language-${codeLanguage}">${formattedCode}</code></pre>`;
    execFormatCommand('insertHTML', codeHtml);
    setCodeContent("");
    setIsCodeDialogOpen(false);
  };

  // Handle inline code insertion
  const handleInsertInlineCode = () => {
    const selection = window.getSelection();
    if (selection && selection.toString()) {
      const selectionText = selection.toString();
      const inlineCodeHtml = `<code style="background-color: #f5f5f5; border: 1px solid #ccc; border-radius: 3px; padding: 2px 4px; font-family: monospace;">${selectionText}</code>`;
      execFormatCommand('insertHTML', inlineCodeHtml);
    } else {
      toast.info("Please select some text to format as inline code");
    }
  };

  // Handle horizontal line insertion
  const handleInsertHorizontalLine = () => {
    execFormatCommand('insertHTML', '<hr style="border: 0; border-top: 1px solid #ccc; margin: 20px 0;">');
  };

  // Handle multi-column layout insertion
  const handleInsertColumns = () => {
    let columnsHtml = `<div style="display: flex; gap: 20px; margin: 15px 0;">`;
    
    for (let i = 0; i < columnCount; i++) {
      columnsHtml += `<div style="flex: 1;">
        <p>Column ${i + 1} content. Replace this with your content.</p>
      </div>`;
    }
    
    columnsHtml += `</div>`;
    execFormatCommand('insertHTML', columnsHtml);
    setIsColumnsDialogOpen(false);
  };

  // Handle color selection
  const handleTextColor = (color: string) => {
    execFormatCommand('foreColor', color);
  };

  // Handle background color
  const handleBackgroundColor = (color: string) => {
    execFormatCommand('hiliteColor', color);
  };

  // Handle emoji insertion
  const handleEmojiSelect = (emoji: string) => {
    execFormatCommand('insertText', emoji);
  };

  // Handle image insertion
  const handleInsertImage = () => {
    let imageHtml = '';
    const imgSrc = imageFile ? URL.createObjectURL(imageFile) : imageUrl;
    
    if (imgSrc) {
      imageHtml = `<img src="${imgSrc}" alt="Inserted image" style="max-width: 100%; height: auto;">`;
      
      if (includeLink && imageLink) {
        imageHtml = `<a href="${imageLink}" target="_blank">${imageHtml}</a>`;
      }
      
      execFormatCommand('insertHTML', imageHtml);
      
      // Clean up object URL if it was created
      if (imageFile) {
        URL.revokeObjectURL(imgSrc);
      }
      
      // Reset form
      setImageUrl('');
      setImageFile(null);
      setImageLink('');
      setIncludeLink(false);
    }
  };

  // Helper functions
  const getFileIcon = (fileName: string) => {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'pdf': return '📄';
      case 'doc': case 'docx': return '📝';
      case 'xls': case 'xlsx': return '📊';
      case 'ppt': case 'pptx': return '📋';
      case 'zip': case 'rar': return '🗜️';
      case 'jpg': case 'jpeg': case 'png': case 'gif': return '🖼️';
      default: return '📎';
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    else if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    else return (bytes / 1048576).toFixed(1) + ' MB';
  };

  return (
    <div className="border border-emerald-200 dark:border-emerald-800 rounded-md overflow-hidden">
      {/* Main Toolbar */}
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
          onClick={() => handleFormat('underline')}
          className="h-8 w-8 p-0 rounded-md"
          title="Underline"
        >
          <Underline className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => handleFormat('strikeThrough')}
          className="h-8 w-8 p-0 rounded-md"
          title="Strikethrough"
        >
          <Strikethrough className="h-4 w-4" />
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

        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => handleFormat('superscript')}
          className="h-8 w-8 p-0 rounded-md"
          title="Superscript"
        >
          <Superscript className="h-4 w-4" />
        </Button>
        
        <div className="h-6 w-px bg-emerald-200 dark:bg-emerald-700 mx-1"></div>
        
        {/* Color Pickers */}
        <ColorPicker onSelectColor={handleTextColor} />
        <ColorPicker onSelectColor={handleBackgroundColor} isBackgroundColor={true} />
        
        <div className="h-6 w-px bg-emerald-200 dark:bg-emerald-700 mx-1"></div>
        
        {/* Alignment Buttons */}
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

        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => handleAlignment('justify')}
          className="h-8 w-8 p-0 rounded-md"
          title="Justify"
        >
          <AlignJustify className="h-4 w-4" />
        </Button>
        
        <div className="h-6 w-px bg-emerald-200 dark:bg-emerald-700 mx-1"></div>
        
        {/* List Buttons */}
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => handleFormat('insertUnorderedList')}
          className="h-8 w-8 p-0 rounded-md"
          title="Bullet List"
        >
          <List className="h-4 w-4" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => handleFormat('insertOrderedList')}
          className="h-8 w-8 p-0 rounded-md"
          title="Numbered List"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        {/* Indentation Buttons */}
        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => handleFormat('indent')}
          className="h-8 w-8 p-0 rounded-md"
          title="Increase Indent"
        >
          <Indent className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => handleFormat('outdent')}
          className="h-8 w-8 p-0 rounded-md"
          title="Decrease Indent"
        >
          <Outdent className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="sm"
          type="button"
          onClick={() => {
            execFormatCommand('formatBlock', '<blockquote>');
          }}
          className="h-8 w-8 p-0 rounded-md"
          title="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </Button>
        
        <div className="h-6 w-px bg-emerald-200 dark:bg-emerald-700 mx-1"></div>
        
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
              <ImageIcon className="h-4 w-4" />
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
          <FileIcon className="h-4 w-4" />
          <span className="text-xs">File</span>
          <input
            type="file"
            ref={generalFileInputRef}
            className="hidden"
            onChange={handleFileAttachment}
          />
        </Button>

        {/* Additional formatting options in a dropdown */}
        <Menubar className="h-8 border-0 bg-transparent p-0">
          <MenubarMenu>
            <MenubarTrigger className="h-8 px-2 rounded-md flex items-center gap-1 focus:bg-emerald-100 dark:focus:bg-emerald-800/40">
              <Type className="h-4 w-4" />
              <span className="text-xs">More</span>
            </MenubarTrigger>
            <MenubarContent className="min-w-[180px]">
              {/* Table */}
              <MenubarItem
                onClick={() => setIsTableDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <TableIcon className="h-4 w-4" />
                <span>Insert Table</span>
              </MenubarItem>
              
              {/* Code Block */}
              <MenubarItem
                onClick={() => setIsCodeDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <FileCode className="h-4 w-4" />
                <span>Code Block</span>
              </MenubarItem>
              
              {/* Inline Code */}
              <MenubarItem
                onClick={handleInsertInlineCode}
                className="flex items-center gap-2"
              >
                <Code className="h-4 w-4" />
                <span>Inline Code</span>
              </MenubarItem>
              
              {/* Horizontal Line */}
              <MenubarItem
                onClick={handleInsertHorizontalLine}
                className="flex items-center gap-2"
              >
                <Divide className="h-4 w-4" />
                <span>Horizontal Line</span>
              </MenubarItem>
              
              {/* Columns */}
              <MenubarItem
                onClick={() => setIsColumnsDialogOpen(true)}
                className="flex items-center gap-2"
              >
                <SplitSquareVertical className="h-4 w-4" />
                <span>Columns Layout</span>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>

        {/* Emoji Picker */}
        <EmojiPicker onEmojiSelect={handleEmojiSelect} />
      </div>
      
      {/* Editor Content Area */}
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
        style={{ direction: "ltr", unicodeBidi: "bidi-override" }}
        dir="ltr"
        spellCheck="true"
      ></div>

      {/* Table Dialog */}
      <TableDialog
        isOpen={isTableDialogOpen}
        onClose={() => setIsTableDialogOpen(false)}
        onInsertTable={handleInsertTable}
      />

      {/* Code Block Dialog */}
      <CodeDialog
        isOpen={isCodeDialogOpen}
        setIsOpen={setIsCodeDialogOpen}
        codeContent={codeContent}
        setCodeContent={setCodeContent}
        codeLanguage={codeLanguage}
        setCodeLanguage={setCodeLanguage}
        handleInsertCode={handleInsertCode}
      />

      {/* Columns Dialog */}
      <ColumnsDialog
        isOpen={isColumnsDialogOpen}
        setIsOpen={setIsColumnsDialogOpen}
        columnCount={columnCount}
        setColumnCount={setColumnCount}
        handleInsertColumns={handleInsertColumns}
      />
    </div>
  );
};

export default EmailContentEditor;
